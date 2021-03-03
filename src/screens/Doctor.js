/* eslint-disable prettier/prettier */
import React,{useState} from 'react'
import { View, Text, SafeAreaView, StyleSheet, Button, TouchableOpacity} from 'react-native'
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import {useTheme} from '@react-navigation/native';
import {Loading} from '../components/Loading';
import { UserContext } from '../contexts/UserContext';
import axios from "axios"
import { Input } from '../components/Input';
import {BASE_URL} from '../config/';
import * as ImagePicker from "react-native-image-picker"
import FormData from 'form-data';


export  function Doctor({navigation}) {
    const user = React.useContext(UserContext);
    const [formDatos, setFormDatos] = useState(null);
    const [identidad, setIdentidad] = useState(null);
    const [files, setFiles] = useState(null);
    const {colors} = useTheme();
    const {logout} = React.useContext(AuthContext);
    const[resourcePath, setResourcePath] = useState(null);



React.useEffect( ()=>{
    navigation.setOptions({
        headerRight: ()=> <HeaderIconButton  name={'log-out'} onPress={async  ()=>{

           await logout()}}/>,
    });
}, [navigation, logout] );

const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    setFormDatos({
      title: 'ultima prueba',
      enlaces: 'wwwasdaa',
      user: user.id,
    })
  
    ImagePicker.launchImageLibrary(options, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        
      setResourcePath(res );
      }
    });
  }  

const onSubmit = async () => { 
  const data = new FormData();


    data.append('data', JSON.stringify(formDatos));
    data.append('files.Images', {
        uri: resourcePath.uri,
        name: resourcePath.fileName,
        type: 'image/jpeg',       
    });
    const token = user.token;
 /*   let  imageResponse = await axios.post(`${BASE_URL}/upload`, data, {
        headers: {
            'Content-Type': 'multipart/form-data;',
          Authorization: `Bearer ${token}`,
        },
      });
*/
    let  formularioResponse = await axios.post(`${BASE_URL}/noticias`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(formularioResponse.data);
    }

    return (
        
        <SafeAreaView style={[styles.container]}>
            <Text>BIENVENIDO A DOCTORES</Text>
            <Text>{user.username}</Text>
            <TouchableOpacity onPress={()=>{imageGalleryLaunch() }} style={styles.button}  >
              <Text style={styles.buttonText}>Select File</Text>
            </TouchableOpacity> 

            <Button title="Extraer datos" onPress={ ()=>{ console.log(formDatos)} } />
            <Button title="Subir imagen" onPress={ ()=> onSubmit()} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1 ,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 250,
        height: 60,
        backgroundColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom:12    
      },
})


