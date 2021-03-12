/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
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

export function PerfilComponent({usuario, onPress, props}) {
    const [nombre, setNombre] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [file, setFile] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const user = React.useContext(UserContext);



    React.useEffect(  ()=>{
        setNombre(usuario.usuario.Nombre);
        setEmail(usuario.usuario.username);
        },[usuario.usuario.Nombre, usuario.usuario.username]);

    const imageGalleryLaunch = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, (res) => {
            if (res.didCancel) {
              setFile(null);
            } else if (res.error) {
              setError(error);
            } else {
            setFile(res );
            }
          });
      };
    const CameraLaunch = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchCamera(options, (res) => {
            if (res.didCancel) {
                setFile(null);
              } else if (res.error) {
                setError(error);
              } else {
              setFile(res );
              }
        });
      };
  return (

      <View style={styles.infoContainer}>
        <Image style={styles.thumb} source={{uri: `${BASE_URL}${usuario.profilepic.url}`}}/>
        <Input style={styles.infoContainer}   placeholder={'Nombre completo'} value={nombre}  onChangeText={setNombre} />
        <Input style={styles.infoContainer}   placeholder={'Correo electronico'} keyboardType={'email-address'} value={email}  onChangeText={setEmail}/>
        <Input style={styles.infoContainer}   placeholder={'Contraseña'} secureTextEntry  onChangeText={setPassword}/>
        <View style={styles.flexContainer}>
        <IconButton name={'camera'} style={styles.icons} onPress={()=>{CameraLaunch()}}  />
        <IconButton name={'image'} style={styles.icons} onPress={()=>{imageGalleryLaunch()}}  />
        </View>
        <Error error={error}/>
        <FilledButton title={'Actualizar datos'} style={styles.loginButton}  onPress={ async()=>{
         try {
            setLoading(true);
            await sleep(1500);
            const data = new FormData();
            const avatar = new FormData();
            data.append('Nombre', nombre);
            data.append('username', email);
            data.append('email', email);
            if (password!=null){
            data.append('password',password);
            }      
            if (file != null){
                avatar.append('data', JSON.stringify(usuario.usuario.id));
                avatar.append('files.profilepic', {
                  uri: file.uri,
                  name: file.fileName,
                  type: 'image/jpeg',
                    });
                await axios({
                    method: 'put',
                    url: `${BASE_URL}/avatars/${usuario.id}`,
                    data: avatar,
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${user.token}`,
                      },
                  });
              

                await axios({
                    method: 'put',
                    url: `${BASE_URL}/users/${usuario.usuario.id}`,
                    data: data,
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${user.token}`,
                      },
                  })
                  .then(setLoading(false));
        }
        else {
            await axios({
                method: 'put',
                url: `${BASE_URL}/users/${usuario.usuario.id}`,
                data: data,
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${user.token}`,
                  },
              })
              .then(setLoading(false));
        }
         } catch (error) {
          setLoading(false);
          setError(error.message);
         }
        }}/> 
  
      <Loading loading={loading} />
      </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  thumb: {
    height: 260,
    width: 260,
    borderRadius: 260/2,
  backgroundColor: 'gray',
    marginLeft: 50,
  },
  infoContainer: {
     marginTop: 5,
     marginBottom: 5,
    padding: 16,
    alignContent: 'center',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  loginButton: {
    marginVertical: 15,
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