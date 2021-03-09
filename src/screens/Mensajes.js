/* eslint-disable prettier/prettier */
import React ,{useCallback,useState, useEffect} from 'react';
import { StyleSheet, Alert, Modal, View, Text, Button, TextInput,ScrollView} from 'react-native';
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



export default function Mensajes({navigation, route}) {


   


    const [trigger, setTrigger] = React.useState(false);
    const { from, to } = route.params;
    const user = React.useContext(UserContext);
    const {logout} = React.useContext(AuthContext);
    const [mensajes, setMensajes] = React.useState(null);
    const [mensaje, setMensaje] = React.useState(null);
    const [idroom, setIdroom] = React.useState(null);
    const url = `${BASE_URL}/rooms?_where[0][miembros.id]=${user.id}&_where[1][miembros.id]=${to.usuario.id}`;
    const [modalVisible, setModalVisible] = useState(false);

  //const url = `${BASE_URL}/rooms?_where[0][miembros.id]=604452a57e70a41ef48ce204&_where[1][miembros.id]=604547876188b149e840d9a0`;
  const fetchData = useCallback ( async () => {
      const result =  axios.get(url,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        }},
      )
      .then((res)=>(setMensajes(res.data)))
      .catch((error)=>{
        console.log(error.message);
      });
      map(mensajes,(data)=>(setIdroom(data.id)));
    },
    [mensajes, url, user.token],
  );


    const crearMensaje = useCallback ( async ()=>{
     try{ const data = new FormData();
      const formulario={
          texto: mensaje,
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
    },[idroom, mensaje, to.usuario.id, user.id, user.token])


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
          console.log(idroom);
      }
      catch(error){
        console.log(error.message);
      }
  },
  [idroom, to.usuario.id, user.id, user.token],
);

  useEffect(()=>{ 
            fetchData();
    },[fetchData,trigger]);

    if (idroom!=null)
    return (
<View style={styles.container} >
<ScrollView style={styles.scrollview}>
{map(mensajes,(data)=>(map(data.chats, (item)=>(<MensajesComponent key={item.id} item={item}  />))))}
      <View style={styles.mainContainer}>
        <TextInput
          placeholder={'Escribir un mensaje...'}
          style={styles.textInput}
          multiline
          value={mensaje}
          onChangeText={setMensaje}
        />
        <IconButton name={'send'} style={styles.icons} onPress={()=>{
                try{
                      crearMensaje();
                      setMensaje(null);
                      setTrigger(!trigger);
                      fetchData();
                }
                catch(error){
                    console.log(error.message);
                }

        }}  />
        </View>
</ScrollView>
</View>
      );
else 
return(
  <View style={styles.centeredView}>
 <Button title={'iniciar conversacion'}  onPress={()=>crearSesion()}/>
    </View>
)
    }


    const styles = StyleSheet.create({
        container: {
          flexDirection: 'row',
          flex: 1,
          margin: 10,
          alignItems: 'flex-end',
        },
        mainContainer: {
          flexDirection: 'row',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 25,
          marginRight: 10,
          flex: 1,
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
          backgroundColor: Colors.light.tint,
          borderRadius: 25,
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }
      })