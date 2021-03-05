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
import * as ImagePicker from "react-native-image-picker"
import FormData from 'form-data';
import RNPickerSelect from 'react-native-picker-select';

export function Register({navigation}){
 
  const {register} = React.useContext(AuthContext);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [rol, setRol] = React.useState(null);
  const [files, setFiles] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const data = new FormData();

  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else { 
      setFiles(res );
      }
    });
  }  
return(
  <AuthContainer>
  <IconButton name={'close-circle-outline'} style={styles.closeIcon} onPress={() => {navigation.pop();}}  />
  <Heading style={styles.title}>REGISTRAR USUARIO</Heading>
   <Error error={error} /> 
   <Input
        style={styles.input}
        placeholder={'Email'}
        keyboardType={'email-address'}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder={'Contraseña'}
        secureTextEntry
        onChangeText={setPassword}
      />
  <RNPickerSelect
   style={styles.input}
        placeholder={{
          label: 'Seleccione su Rol',
          value: null,
        }}
            onValueChange={(value) => setRol(value)}
            items={[
                { label: 'Doctor', value: 'Doctor' },
                { label: 'Paciente', value: 'Paciente' },
            ]}

        />

<FilledButton
        title={'Seleccionar imagen'}
        style={styles.loginButton}
        onPress={()=>{imageGalleryLaunch()}}/>
<FilledButton
        title={'Crear cuenta'}
        style={styles.loginButton}
        onPress={async()=>{
         try {
         setLoading(true);
          await register(email,password, rol, files);
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
    marginVertical: 15,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 16,
  },
});

const picketSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#e8e8e8',
    marginLeft: -5,
    marginRight: -5,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#e8e8e8',
  },
});
