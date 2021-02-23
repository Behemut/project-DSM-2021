/* eslint-disable prettier/prettier */
import React from 'react'
import {StyleSheet} from 'react-native';
import {Heading}  from '../components/Heading';
import { Input}  from '../components/Input';
import { FilledButton}  from '../components/FilledButton';
import {Error} from '../components/Error';
import {IconButton } from '../components/IconButton';
import {AuthContainer} from '../components/AuthContainer';
import { AuthContext } from '../contexts/AuthContext';
import {Loading} from '../components/Loading';
import Toast from 'react-native-toast-message';


export function Register({navigation}){
 
  const {register} = React.useContext(AuthContext);


  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  
return(
  <AuthContainer>
  <IconButton name={'close-circle-outline'} style={styles.closeIcon} onPress={() => {navigation.pop();}}  />
  <Heading style={styles.title}>REGISTRATION</Heading>
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
        title={'Create account'}
        style={styles.loginButton}
        onPress={async()=>{
         try {
          setLoading(true);
          await register(email,password);
          navigation.pop();
         } catch (error) {
          setLoading(false);
          setError(error.message);
          
         }
        }}/>
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
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 16,
  },
});