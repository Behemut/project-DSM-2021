/* eslint-disable prettier/prettier */
import React,{useState} from 'react'
import { View, Text, SafeAreaView, StyleSheet, Button, TouchableOpacity} from 'react-native'
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import {useTheme} from '@react-navigation/native';
import {Loading} from '../components/Loading';
import { UserContext } from '../contexts/UserContext';
import { Input } from '../components/Input';
import {BASE_URL} from '../config/';
import * as ImagePicker from "react-native-image-picker"
import FormData from 'form-data';
import {usePost} from '../hooks/usePost';



export  function Doctor({navigation}) {
    const user = React.useContext(UserContext);
    const [formDatos, setFormDatos] = useState(null);
    const [files, setFiles] = useState(null);
    const {colors} = useTheme();
    const {logout} = React.useContext(AuthContext);


React.useEffect( ()=>{
    navigation.setOptions({
        headerRight: ()=> <HeaderIconButton  name={'log-out'} onPress={async  ()=>{await logout()}}/>,
        headerLeft: () => <HeaderIconButton name={'menu'} onPress={()=>{navigation.openDrawer()}} />,
      
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
        
      setFiles(res);

      console.log(res);
      }
    });
  }  

const onSubmit =  () => { 
  const data = new FormData();


    data.append('data', JSON.stringify(formDatos));
    data.append('files.Images', {
        uri: files.uri,
        name: files.fileName,
        type: files.type,
    });
      
      //const  formularioResponse = usePost(`${BASE_URL}/noticias`,data,);
     // console.log(formularioResponse.data);
    }

    return (
        
        <SafeAreaView style={[styles.container]}>
            <Text>BIENVENIDO A DOCTORES</Text>
            <Text>{user.username}</Text>
            <TouchableOpacity onPress={()=>{imageGalleryLaunch() }} style={styles.button}  >
              <Text style={styles.buttonText}>Select File</Text>
            </TouchableOpacity> 

            <Button title="Extraer datos" onPress={ ()=>{console.log(JSON.stringify('usuario','contrasñea','rol'))} } />
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


