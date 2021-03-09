/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
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

export function ChatComponent({navigation,usuario, props}) {
    const user = React.useContext(UserContext);
    const [nombre, setNombre] = React.useState(null);

    React.useEffect(  ()=>{
        setNombre(usuario.usuario.Nombre);
      //  console.log(usuario.usuario.estado);
        },[usuario.usuario.Nombre]);


        if (usuario.usuario.estado)
  return (
    <TouchableWithoutFeedback
        onPress={() => {
            navigation.navigate('mensajes', {
                from: user,
                to: usuario,
              });    }}>  
    <View style={styles.container}>
      <View style={styles.lefContainer}>
      <Image style={styles.avatar} source={{uri: `${BASE_URL}${usuario.profilepic.url}`}}/>
        <View style={styles.midContainer}>
        <Text style={styles.username}>{nombre}</Text>
        <Text style={styles.status}>En línea</Text>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
      else
      return( <TouchableWithoutFeedback
        onPress={() => {
            navigation.navigate('mensajes', {
                from: user,
                to: usuario,
              });    }}>  
    <View style={styles.container}>
      <View style={styles.lefContainer}>
      <Image style={styles.avatar} source={{uri: `${BASE_URL}${usuario.profilepic.url}`}}/>
        <View style={styles.midContainer}>
        <Text style={styles.username}>{nombre}</Text>
        <Text style={styles.status}>Fuera de línea</Text>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
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
  export default styles;