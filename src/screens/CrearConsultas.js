/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React ,{useCallback,useState} from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, Button} from 'react-native'
import {AuthContainer} from '../components/AuthContainer';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
import {Heading}  from '../components/Heading';
import { Input}  from '../components/Input';
import { FilledButton}  from '../components/FilledButton';
import {Error} from '../components/Error';
import {IconButton } from '../components/IconButton';
import {Loading} from '../components/Loading';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import {BASE_URL} from '../config'
import axios from 'axios';
import {sleep} from '../utils/sleep';

export default function CrearConsultas({navigation}) {
    const user = React.useContext(UserContext);
    const {logout} = React.useContext(AuthContext);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [fechacita, setFechacita] = useState(new Date());
    const [horas,setHoras] = useState(null);
    const [descripcion,setDescripcion] = useState(null);

    React.useEffect( ()=>{
        navigation.setOptions({
            headerRight: ()=> <HeaderIconButton  name={'log-out'} onPress={async  ()=>{await logout(user.id, user.token)}}/>,
            headerLeft: () => <HeaderIconButton name={'menu'} onPress={()=>{navigation.openDrawer()}} />,
          
        });
    }, [navigation, logout, user.id, user.token] );

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
     if ( date<= fechacita){
      setError("No se pueden colocar fechas anteriores a hoy");
      sleep(1500);
      setError(null);
      hideDatePicker();
     }
     else{
      setFechacita(date);
      hideDatePicker();
     }
    };
  

    const crearConsulta = useCallback ( async ()=>{
      try{
      const data = new FormData();
       const formulario={
        paciente: user.id,
        fecha_cita: fechacita,
        horas: horas,
        descripcion: descripcion
       }
       data.append('data', JSON.stringify(formulario));
       await axios({
           method: 'POST',
           url: `${BASE_URL}/consultas`,
           data: data,
           headers: {
             'Content-Type': 'multipart/form-data',
             Authorization: `Bearer ${user.token}`,
             },
         })
         .then(res=>{
          sleep(1500);
          setLoading(false);
          setDescripcion(null);
          setHoras(0);
          setFechacita(new Date())
          setError("Cita creada con exitó");
          sleep(2000);
          setError(null);
         })
        
       } catch(error){
         setError(error.message);
          sleep(1500);
          setError(null);
          setLoading(false);
       }  

     },[descripcion, fechacita, horas, user.id, user.token]);

    return (
        <View style={styles.container}>
        <Heading style={styles.title}>Crear un consulta</Heading>
         <Error error={error} />
         <Input
              style={styles.input}
              placeholder={'Breve descripcion del caso'}
              multiline={true}
              onChangeText={setDescripcion}
              value={descripcion}
            />
    <View>
      <FilledButton  style={styles.filledButton} title={"Seleccionar fecha/hora cita"} onPress={showDatePicker}/>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='datetime'
        is24Hour={false}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>

    <RNPickerSelect
        placeholder={{
          label: 'Seleccione las horas deseadas',
          value: horas,
        }}
        useNativeAndroidPickerStyle={false}
        style={picketSelectStyles}
            onValueChange={(value) => setHoras(value)}
            items={[
                { label: '1 Hora', value: '1 Hora'},
                { label: '1:30 Horas', value: '1:30 Horas' },
                { label: '2 Horas', value:'2 Horas' },
                { label: '2:30 Horas', value: '2:30 Horas' },
                { label: '3 Horas', value: '3 Horas'},
                { label: '3:30 Horas', value: '3:30 Horas' },
                { label: '4 Horas', value: '4 Horas' },
                { label: '4:30 Horas', value:'4:30 Horas' },
            ]}
        />

<FilledButton  style={styles.filledButton}  title={"Enviar cita"}
onPress={ async=>{
  try {
      setLoading(true);
      crearConsulta();
      
  } catch (error) {setLoading(false);}}}/>
            <Loading loading={loading} />
      </View>
 
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 120,
    alignItems: 'center',
    
  },
    title: {
      marginBottom: 48,
    },
    input: {
      marginVertical: 15,
    },
    filledButton:{
      marginVertical: 15,
      paddingBottom: 20,
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
