/* eslint-disable prettier/prettier */
import React ,{useCallback,useState, useEffect} from 'react';
import { StyleSheet, Alert, Modal, View, Text, ImageBackground,TouchableOpacity ,Button, TextInput,ScrollView} from 'react-native';
import {BASE_URL} from '../config';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import { MensajesComponent } from '../components/Mensajes';
import {map} from 'lodash';
import Colors from '../utils/Color';
import {IconButton} from '../components/IconButton';
import FormData from 'form-data';
import {useGet}    from '../hooks/useGet';
import AutoScroll from 'react-native-auto-scroll'
import {useTheme} from '@react-navigation/native';

export default function Mensajes({navigation, route,style}) {

    const {colors} = useTheme();
    const { from, to } = route.params;
    const user = React.useContext(UserContext);
    const {logout} = React.useContext(AuthContext);
    const [mensajes, setMensajes] = React.useState(null);
    const [contenido, setContenido] = React.useState(null);
    const [idroom, setIdroom] = React.useState(null);
    const url = `${BASE_URL}/rooms?_where[0][miembros.id]=${user.id}&_where[1][miembros.id]=${to.usuario.id}`;
    const [modalVisible, setModalVisible] = useState(false);

  //const url = `${BASE_URL}/rooms?_where[0][miembros.id]=604452a57e70a41ef48ce204&_where[1][miembros.id]=604547876188b149e840d9a0`;
  const fetchData = useCallback (async  () => {
      const result = await axios.get(url,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        }},
      )
      .then(({data})=>{
          setIdroom(data[0].id);

      })
      .catch((error)=>{
        console.log(error.message);
      });
    },
    [url, user.token],
  );


  const fetchMensajes = useCallback ( async () => {
    const result = await axios.get(`${BASE_URL}/mensajes?_where[room.id]=${idroom}`,{
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`,
      }},
    )
    .then(({data})=>{
          setMensajes(data);
    })
    .catch((error)=>{
      console.log(error.message);
    });
  },
  [idroom, user.token],
);

    const crearMensaje = useCallback ( async ()=>{
     try{ const data = new FormData();
      const formulario={
          texto: contenido,
          from: user.id,
          to: to.usuario.id,
          room: idroom,
      }
      data.append('data', JSON.stringify(formulario));
      await axios({
          method: 'POST',
          url: `${BASE_URL}/mensajes`,
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
            },
        })
      } catch(error){
          console.log(error.message);
      }  
      fetchMensajes();
      
    },[contenido, fetchMensajes, idroom, to.usuario.id, user.id, user.token])


  const crearSesion = useCallback ( async () => {
      const data = new FormData();
      const datos = {miembros: [`${user.id}`, `${to.usuario.id}`]};
      data.append("data",  JSON.stringify(datos));
      try {
          const result =await axios.post(`${BASE_URL}/rooms`,data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${user.token}`,
            },
          })
          setIdroom(result.data.id); 
      }
      catch(error){
        console.log(error.message);
      }
  },
  [to.usuario.id, user.id, user.token],
);

  useEffect(()=>{ 
            fetchData();
            fetchMensajes();
            return()=>{ };
    },[fetchData, fetchMensajes, idroom]);

if (idroom!=null || idroom!=undefined){
    return (
<View style={styles.container} >
<AutoScroll  showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}  style={styles.scrollview}  >
        {map(mensajes,(data)=>(<MensajesComponent key={data.id}  item={data} />))}
        </AutoScroll>

      <View style={styles.mainContainer}>
        <TextInput
          placeholder={'Escribir un mensaje...'}
          style={styles.textInput}
          multiline
          value={contenido}
          onChangeText={setContenido}
        />
        <View style={[styles.buttonContainer, style, {color: colors.text}]}>
        <IconButton name={'send'}  onPress={()=>{
                try{
                      crearMensaje();
                      setContenido(null);
                }
                catch(error){
                    console.log(error.message);
                }; fetchMensajes();
                }}/>
        <IconButton name={'refresh'}  onPress={()=>{
                try{
                  
                    fetchMensajes();
                }
                catch(error){
                    console.log(error.message);
                }}}/>
             </View>
        </View>
    </View>
      );    }
    else
    return(
      <>
      <Button title={'Crear una conversacion'} onPress={()=>crearSesion()}/>
      </>
    )


    }

    const styles = StyleSheet.create({
        container: {
          flexDirection: 'column',
          flex: 1,
        },
        mainContainer: {
          flexDirection: 'row',
          padding: 10,
          borderRadius: 25,
          alignItems: 'flex-end',
        },
        textInput: {
          flex: 1,
          marginHorizontal: 10
        },
        icon: {
          marginHorizontal: 5,
        },
        buttonContainer: {
         
          borderRadius: 25,
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        },
        scrollview:{
          flex: 1,
          width: '100%',
        }
      })