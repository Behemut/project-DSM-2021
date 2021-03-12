/* eslint-disable prettier/prettier */
import React from 'react';
import {Pressable, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Heading}  from '../components/Heading';
import { Input}  from '../components/Input';
import { FilledButton}  from '../components/FilledButton';
import {Error} from '../components/Error';
import {IconButton } from '../components/IconButton';
import {AuthContainer} from '../components/AuthContainer';
import { AuthContext } from '../contexts/AuthContext';
import {Loading} from '../components/Loading';
import * as ImagePicker from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';

export function Register({navigation}){
 
  const {register} = React.useContext(AuthContext);
  const [nombre, setNombre] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [rol, setRol] = React.useState(null);
  const [files, setFiles] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (res) => {
      setFiles(res);
    });
  }

  return(
  <ScrollView  showsVerticalScrollIndicator={false}   showsHorizontalScrollIndicator={false}>
  <AuthContainer>
  <TouchableOpacity  style={styles.closeIcon}>
  <IconButton name={'close'} onPress={()=>navigation.pop()}/>
  </TouchableOpacity>
  <Heading style={styles.title}>Crear un usuario</Heading>
   <Error error={error} />
   <Input
        style={styles.input}
        placeholder={'Nombre completo'}
        onChangeText={setNombre}
      />
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
        placeholder={{
          label: 'Seleccione su Rol',
          value: null,
        }}
        useNativeAndroidPickerStyle={false}
        style={picketSelectStyles}
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
          await register(nombre,email,password, rol, files);
         navigation.pop();
         } catch (error) {
          setLoading(false);
          setError(error.message);
         }
        }}/>
      <Loading loading={loading} />
</AuthContainer>
</ScrollView>
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
    width: '100%',
  },
  inputAndroid: {
    backgroundColor: '#e8e8e8',
    width: 300,
    padding: 20,
    borderRadius: 8,
    color: 'black',

  },
});
