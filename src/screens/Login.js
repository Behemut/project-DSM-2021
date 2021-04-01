/* eslint-disable prettier/prettier */
import React from 'react'
import {StyleSheet, Linking} from 'react-native';
import {Heading}  from '../components/Heading';
import { Input}  from '../components/Input';
import { FilledButton}  from '../components/FilledButton';
import {TextButton}  from '../components/TextButton';
import {Error} from '../components/Error';

import {AuthContainer} from '../components/AuthContainer';
import {Loading} from '../components/Loading'
import { AuthContext } from '../contexts/AuthContext';
import {sleep} from '../utils/sleep'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { BASE_URL } from '../config';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton
} from '@react-native-community/google-signin';


export function Login({navigation}){
 const {login, loginGoogle} = React.useContext(AuthContext);

  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const {auth, state} = useAuth();


return(
 <AuthContainer>
  <Heading style={styles.title}>Inicio de sesión</Heading>
      <Error error={error} />
   <Input
        style={styles.input}
        placeholder={'Email'}
        keyboardType={'email-address'}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder={'Password'}
        secureTextEntry
        onChangeText={setPassword}
      />

<FilledButton
        title={'Iniciar sesión'}
        style={styles.loginButton}
        onPress={async()=>{
          try {
           setLoading(true);
           await login(email,password);
  
          } catch (error) {
           setError(error.message);
           sleep(1500);
           setError(null);
           setLoading(false);
           
          }
         }}/>

<GoogleSigninButton
    style={{ width: 312, height: 60 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Light}
    onPress={ async ()=>{

      try {
        GoogleSignin.configure({
          webClientId: '347417400145-r2l5eg6uiiu94tntus7ckeuslu548dd5.apps.googleusercontent.com', // Remember you need to setup a Web project in addition to the Android project in Google developer console, this bit took me a while to figure - read the @react-native-community/google-signin for more info
          offlineAccess: false,
        });
        await GoogleSignin.hasPlayServices();
   
      const {idToken, user } = await GoogleSignin.signIn();
      setLoading(true);
      await loginGoogle(idToken, user);
  } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
         console.log(error);
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log(error);
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log(error);
        } else {
          console.log(error);
        }
  }
    }}
     />



<TextButton title={'¿No tienes cuenta? Crea una ahora'}   onPress={()=>{navigation.navigate('Register')}}  />

<Loading loading={loading} />
</AuthContainer>
        );
}



const styles = StyleSheet.create({
  title: {
    marginBottom: 48,

  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
});