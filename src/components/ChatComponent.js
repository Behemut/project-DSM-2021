/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, View, Text, Modal,Pressable , TouchableWithoutFeedback} from 'react-native';
import {Input} from './Input';
import {FilledButton} from './FilledButton';
import {IconButton} from './IconButton';
import {Error} from './Error';
import {BASE_URL} from '../config';
import {Card} from './Card';
import {Loading} from './Loading';
import * as ImagePicker from 'react-native-image-picker';
import FormData from 'form-data';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import {sleep} from '../utils/sleep';



export function ChatComponent({navigation,usuario}) {
    const user = React.useContext(UserContext);
    const [nombre, setNombre] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useEffect(  ()=>{
        setNombre(usuario.usuario.Nombre);
        },[usuario.usuario.Nombre]);



  return (
    <>
    <Pressable  delayLongPress={500} onLongPress={()=>{setModalVisible(true)}}
        onPress={() => {
            navigation.navigate('mensajes', {
                from: user,
                to: usuario,
              });}}
              
              >  
    <View style={styles.container}>
      <View style={styles.lefContainer}>
      <Image style={styles.avatar} source={{uri: `${BASE_URL}${usuario.profilepic.url}`}}/>
        <View style={styles.midContainer}>
        <Text style={styles.username}>{nombre}</Text>
        <Text style={styles.status}>{(usuario.usuario.estado)? 'En linea': 'Fuera de linea' }</Text>
        </View>
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
<View style={modal.infoContainer}>
<Text style={modal.username}>{nombre}</Text>
        <Image style={modal.thumb} source={{uri: `${BASE_URL}${usuario.profilepic.url}`}}/>
        <Text style={modal.username}>{usuario.usuario.rol}</Text>
        <Text style={modal.texto}>Cargo: Psiquitria</Text>
        <Text style={modal.texto}>Número telefonico: 2222-4445</Text>
        <FilledButton title={'Cerrar'} style={styles.loginButton} onPress={()=>{setModalVisible(!modalVisible)}}  />
      </View>
</Modal>


</>
  );



}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      padding: 10,
    },
    lefContainer: {
      flexDirection: 'row',
    },
    midContainer: {
      justifyContent: 'space-around',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 50,
      marginRight: 15,
    },
    username: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    status: {
      fontSize: 16,
      color: 'grey',
    },
  });
 
  const modal = StyleSheet.create({
    thumb: {
      height: 260,
      width: 260,
      borderRadius: 260/2,
    backgroundColor: 'gray',
    marginBottom: 20,
    },
    infoContainer: {
       marginTop: 5,
      marginBottom: 5,
      padding: 16,
      alignContent: 'center',
      alignItems: 'center',
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',

    },
    username: {
      fontWeight: 'bold',
      fontSize: 25,
    },
    texto: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 10,
      marginTop: 10,
    },
    loginButton: {
      marginVertical: 15,
      width: '50%'

    },
    flexContainer:{
      flex: 1,
      flexDirection: 'row',
      alignContent: 'center',
     justifyContent: 'center',
    },
    icons:{
      marginTop: 10,
      flex: 1,
      marginLeft: 40,
      fontSize: 40,
    },

  });