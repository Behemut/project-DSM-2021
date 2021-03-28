/* eslint-disable prettier/prettier */
import React,{useState,useCallback} from 'react';
import { StyleSheet, View, Text, TextInput ,Modal, Image , Pressable} from 'react-native';
import { UserContext } from '../contexts/UserContext';
import Colors from '../utils/Color';
import moment from 'moment';
import es from 'moment/locale/es';
import FormData from 'form-data';
import axios from 'axios';
import {BASE_URL} from '../config/index';


export function MensajesComponent({item, fetchMensajes, imagento}) {
    const user = React.useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const isMyMessage = () => {
        return user.id === item.from.id;
      }

      const eliminarMensaje =  async (identidad) =>{
        try{
        await axios({
          method: 'DELETE',
          url: `${BASE_URL}/mensajes/${identidad}`,
          headers: {
            Authorization: `Bearer ${user.token}`,
            },
        })
        .then(
           fetchMensajes()
        )
          }
      catch(error){
        console.log(error.message);
      }


      }

      return (
        <>
        <Pressable  delayLongPress={1500}  onLongPress={()=>{
      if (item.from.id==user.id){
          setModalVisible(true)
      }
        
        }}  
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : 'white'
          },
          styles.wrapperCustom
        ]}>
        <View style={styles.container}>
  <View style={[
    styles.messageBox, {
      backgroundColor: isMyMessage() ? '#DCF8C5' : '#9EDFDF',
      marginLeft: isMyMessage() ? 50 : 0,
      marginRight: isMyMessage() ? 0 : 50,
    },
    styles.user,{
      alignItems: isMyMessage()?  'flex-end': 'flex-start',
    }
  ]}>
    <View style={styles.to}>
  {!isMyMessage()?   <Image style={styles.avatar} source={{uri: `${imagento}`}}/>: <></> }  
    <Text  style={styles.user}>{item.from.Nombre}</Text>
    </View>
    <Text style={styles.message}>{item.texto}</Text>
    <Text style={styles.time}>{moment (item.createdAt).local(es).startOf().fromNow()}</Text>
  </View>
        </View>
        </Pressable>

<Modal
animationType="slide"
transparent={true}
visible={modalVisible}
onRequestClose={() => {
  setModalVisible(!modalVisible);
}}
>
<View style={modal.centeredView}>
  <View style={modal.modalView}>
    <Text style={modal.modalText}>¿Esta seguro que desea eliminar este mensaje?</Text>
    <View style={modal.flexContainer}>
    <Pressable
      style={[modal.button, modal.confirmar]}
      onPress={() => eliminarMensaje(item.id)}>
      <Text style={modal.textStyle}>Si, estoy seguro</Text>
    </Pressable>
    <Pressable
      style={[modal.button, modal.buttonClose]}
      onPress={() => setModalVisible(!modalVisible)}>
      <Text style={modal.textStyle}>Cancelar</Text>
    </Pressable>
    </View>
  </View>
</View>
</Modal>

</>

      )
}


const modal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  confirmar:{
    backgroundColor: "red",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
    flex: 1,
    
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

  flexContainer:{
    flexDirection: 'row', 
    alignContent: 'center',
   justifyContent: 'center',
  },


});


const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    messageBox: {
      borderRadius: 5,
      padding: 10,
    },
    user:{
      color: 'black',
      fontWeight: "bold",
      fontSize: 15,
      
    },
    name: {
      color: Colors.light.tint,
      fontWeight: "bold",
      marginBottom: 5,
    },
    message: {
  
    },
    time: {
      alignSelf: "flex-end",
      color: 'grey'
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 40/ 2,
      marginRight: 5,
    },
    to:{
      flex: 1,
      flexDirection: 'row',
      alignContent: 'center',
     justifyContent: 'center',
     marginBottom: 5,
    }
  });
  