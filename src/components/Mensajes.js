/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text, TextInput ,TouchableWithoutFeedback} from 'react-native';
import { UserContext } from '../contexts/UserContext';
import Colors from '../utils/Color';
import moment from 'moment';
import es from 'moment/locale/es';
import { from } from 'form-data';


export function MensajesComponent({item}) {
    const user = React.useContext(UserContext);
    const isMyMessage = () => {
        return user.id === item.from.id;
      }

      return (
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
  
    <Text  style={styles.user}>{item.from.Nombre}</Text>
    <Text style={styles.message}>{item.texto}</Text>
    <Text style={styles.time}>{moment (item.createdAt).local(es).startOf().fromNow()}</Text>
  </View>
        </View>
        
      )
}


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
 
  });
  