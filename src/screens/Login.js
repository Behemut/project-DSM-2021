/* eslint-disable prettier/prettier */
import React from 'react'
import {StyleSheet} from 'react-native';
import {Heading}  from '../components/Heading';
import { Input}  from '../components/Input';
import { FilledButton}  from '../components/FilledButton';
import {TextButton}  from '../components/TextButton';
import {Error} from '../components/Error';

import {AuthContainer} from '../components/AuthContainer';
import {Loading} from '../components/Loading'
import Toast from 'react-native-toast-message';
import { AuthContext } from '../contexts/AuthContext';


export function Login({navigation}){
 const {login} = React.useContext(AuthContext);

  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);


  
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
           setLoading(false);
           
          }
         }}/>

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