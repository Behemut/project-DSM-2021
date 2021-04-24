/* eslint-disable prettier/prettier */
import React,{useState} from 'react';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import moment from 'moment';
import es from 'moment/locale/es';
import {BASE_URL} from '../config';
import {Card} from './Card';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';



export function DoctorComponente({consultas, fetchData}) {
  const [modalVisible, setModalVisible] = useState(false);
  const user = React.useContext(UserContext);


  const AceptarCaso = async () => {
    try{

      const consulta= new FormData();
      //Datos de la consulta
      const doctor ={
        doctor : user.id,
        estado: true,
      }
      consulta.append('data', JSON.stringify(doctor))

      await axios({
        method: 'PUT',
        url: `${BASE_URL}/consultas/${consultas.id}`,
        data: consulta,
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
          },
      })
      .then(
        fetchData()
      )
        }
    catch(error){
      console.log(error.message);
    }}
  return (
<>
    <Card style={styles.card}>

   <TouchableOpacity delayLongPress={1500} onLongPress={()=>{setModalVisible(!modalVisible)}}   >
      <View style={styles.infoContainer}>
      <Text style={styles.informacionAlt}>Caso no ha sido aceptado</Text>
        <Text style={styles.informacion}>Duración: {consultas.horas}</Text>
        <Text style={styles.informacion}>Fecha y Hora: {moment (consultas.fecha_cita).format("MMMM Do YYYY, h:mm:ss a")}</Text>
        <Text style={styles.informacion}>Descripción: {consultas.descripcion}</Text>
        <Text style={styles.informacion}>Tiempo restante para la cita {moment (consultas.fecha_cita).local(es).startOf().fromNow()}</Text>
      </View>
      </TouchableOpacity>

    </Card>



    <Modal
animationType="slide"
transparent={true}
visible={modalVisible}
onRequestClose={() => {
  setModalVisible(!modalVisible);
}}
>
<View style={modal.centeredView}>
  <View style={modal.modalView}>
    <Text style={modal.modalText}>¿Esta seguro que desea aceptar este caso?</Text>
    <View style={modal.flexContainer}>
    <TouchableOpacity
      style={[modal.button, modal.confirmar]}
    onPress={()=>{AceptarCaso()}}
    >
      <Text style={modal.textStyle}>Si, estoy seguro</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[modal.button, modal.buttonClose]}
      onPress={() => setModalVisible(!modalVisible)}>
      <Text style={modal.textStyle}>Cancelar</Text>
    </TouchableOpacity>
    </View>
  </View>
</View>
</Modal>




</>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    padding: 16,
  },
  informacion: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  informacionAccepted: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },

  informacionAlt: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },

  subinfo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
  },
});



const modal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  confirmar:{
    backgroundColor: "red",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
    flex: 1,
    
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

  flexContainer:{
    flexDirection: 'row', 
    alignContent: 'center',
   justifyContent: 'center',
  },


});
