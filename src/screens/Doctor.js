/* eslint-disable prettier/prettier */
import React,{useState} from 'react'
import { View, Text, SafeAreaView, StyleSheet, Button} from 'react-native'
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import {useTheme} from '@react-navigation/native';
import {Loading} from '../components/Loading';
import { UserContext } from '../contexts/UserContext';
import axios from "axios"
import { Input } from '../components/Input';
import {BASE_URL} from '../config/';


export  function Doctor({navigation}) {
    const user = React.useContext(UserContext);

    const [question, setQuestion] = useState({
        title: 'Desde doc RN',
        enlaces: 'www.jewgle.com',
        user: user.id,
    });
    const [files, setFiles] = useState([]);
  
    


    const {colors} = useTheme();

const {logout} = React.useContext(AuthContext);

React.useEffect( ()=>{
    navigation.setOptions({
        headerRight: ()=> <HeaderIconButton  name={'log-out'} onPress={async  ()=>{

           await logout()}}/>,
    });
}, [navigation, logout] );

const onSubmit = async () => {

    const data = new FormData()
    files.map(file => {
      data.append("files.media", file)
    })
    data.append("data", JSON.stringify(question));
    const token = user.token;
    const upload_res = await axios({
      method: "POST",
      url: BASE_URL + "/noticias",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
 
  }

    return (
        
        <SafeAreaView style={[styles.container]}>
            <Text>BIENVENIDO A DOCTORES</Text>
            <Text>{user.id}</Text>
            <Button title="Subir imagen" onPress={ ()=> onSubmit()} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1 ,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


