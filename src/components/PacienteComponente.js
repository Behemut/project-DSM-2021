/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import es from 'moment/locale/es';
import {BASE_URL} from '../config';
import {Card} from './Card';

export function PacienteComponente({consultas, onPress}) {

  return (
    <Card style={styles.card} onPress={onPress}>

      <View style={styles.infoContainer}>
      { consultas.estado? <View> 
          <Text style={styles.informacionAccepted}>Doctor: { consultas.doctor.Nombre}</Text>  
          <Text style={styles.informacionAccepted}>Email: { consultas.doctor.email}</Text>  
      </View>:  
      <Text style={styles.informacionAlt}>Caso no ha sido aceptado</Text>}  
        <Text style={styles.informacion}>Duración: {consultas.horas}</Text>
        <Text style={styles.informacion}>Fecha y hora: {moment (consultas.fecha_cita).format("MMMM Do YYYY, h:mm:ss a")}</Text>
        <Text style={styles.subinfo}>Descripcion: {consultas.descripcion}</Text>
     
        <Text style={styles.subinfo}>Tiempo restante para la cita {moment (consultas.fecha_cita).local(es).startOf().fromNow()}</Text>
  
      </View>
    </Card>
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