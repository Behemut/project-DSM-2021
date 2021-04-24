/* eslint-disable prettier/prettier */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { UserContext } from '../contexts/UserContext';
import DoctorConsultas from '../screens/DoctorConsultas'
import CrearConsultas from '../screens/CrearConsultas';
import Paciente  from '../screens/Paciente';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import {Text} from 'react-native'
import Perfil from '../screens/Perfil';
import {ChatStackNavigator}  from './ChatStackNavigator';
import {IconButton} from '../components/IconButton'

const Drawer = createDrawerNavigator();

export function MainDrawerNavigator({navigation}){
    const {logout} = React.useContext(AuthContext);
    const user = React.useContext(UserContext);
    if (user.rol == 'Doctor')
    return(
    <Drawer.Navigator screenOptions={{headerShown: true}}>
        
        <Drawer.Screen  name="paciente" component={Paciente}   options={{ title: 'Proximás Citas' , drawerIcon:({focused, size})=>(  <IconButton name={'calendar'} />) }}/>
        <Drawer.Screen name={'doctor'} component={DoctorConsultas}    options={{ title: 'Citas sin atender', drawerIcon:({focused, size})=>(  <IconButton name={'medkit'} />) }}/>
        <Drawer.Screen  name="perfil" component={Perfil}   options={{ title: 'Perfil de usuario', drawerIcon:({focused, size})=>(  <IconButton name={'person'} />) }}/>
        <Drawer.Screen  name="chat" component={ChatStackNavigator}   options={{ title: 'Chat', drawerIcon:({focused, size})=>(  <IconButton name={'chatbubbles'} />) }}/>
       </Drawer.Navigator>
 );

 if (user.rol == 'Paciente')
 return(
 <Drawer.Navigator screenOptions={{headerShown: true}}>
     <Drawer.Screen  name="paciente" component={Paciente}   options={{ title: 'Proximás Citas' , drawerIcon:({focused, size})=>(  <IconButton name={'home'} />) }}/>
     <Drawer.Screen  name={'crear'} component={CrearConsultas}   options={{ title: 'Crear consulta', drawerIcon:({focused, size})=>(  <IconButton name={'create'} />) }}/>
     <Drawer.Screen  name="perfil" component={Perfil}   options={{ title: 'Perfil de usuario' , drawerIcon:({focused, size})=>(  <IconButton name={'person'} />) }}/>
     <Drawer.Screen  name="chat" component={ChatStackNavigator}  options={{ title: 'Chat', drawerIcon:({focused, size})=>(  <IconButton name={'chatbubbles'} />) }}/>
 </Drawer.Navigator>
);



}