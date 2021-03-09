/* eslint-disable prettier/prettier */
import React ,{useCallback} from 'react';
import {FlatList ,StyleSheet, Text, Pressable} from 'react-native';
import {BASE_URL} from '../config';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import {ChatComponent} from '../components/ChatComponent'

export default function Chat({navigation}) {
    const user = React.useContext(UserContext);
    const {logout} = React.useContext(AuthContext);
    const [usuarios, setUsuarios] = React.useState(null);
//Usando CallBack se crea una funcion para llamar los datos del axios, sin romper la primera ley de React Hooks
    const fetchData = useCallback( async () => {
        await axios.get(`${BASE_URL}/avatars?usuario.id_ne=${user.id}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          }},
        )
        .then(res => {
          setUsuarios(res.data);
        });
      },
      [user.id, user.token],
    );

    React.useEffect( ()=>{
            fetchData();
    }, [fetchData] );
 

  function renderProduct({item: usuarios}) {
    return <ChatComponent usuario={usuarios}  navigation={navigation}/>;
  }


  return (
    <>
      <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => fetchData()}>
              <Text style={styles.textStyle}>Actualizar lista de usuarios</Text>
            </Pressable>
    <FlatList
      contentContainerStyle={styles.productsListContainer}
      data={usuarios}
      renderItem={renderProduct}
      keyExtractor={usuarios => `${usuarios.id}`}
    />
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
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
  });