/* eslint-disable prettier/prettier */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {MainStackNavigator}  from './MainStackNavigator';
import { UserContext } from '../contexts/UserContext';
import { Doctor } from '../screens/Doctor';
import { News } from '../screens/News';
import CrearConsultas from '../screens/CrearConsultas';
import Paciente  from '../screens/Paciente';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import {Text} from 'react-native'
import Perfil from '../screens/Perfil';
import {ChatStackNavigator}  from './ChatStackNavigator';


const Drawer = createDrawerNavigator();

export function MainDrawerNavigator({navigation}){
    const {logout} = React.useContext(AuthContext);
    const user = React.useContext(UserContext);
    if (user.rol == 'Doctor')
    return(
    <Drawer.Navigator screenOptions={{headerShown: true}}>
        <Drawer.Screen name={'doctor'} component={Doctor}    options={{ title: 'Inicio' }}/>
        <Drawer.Screen  name={'crear'} component={CrearConsultas}   options={{ title: 'Crear consulta' }}/>
        <Drawer.Screen  name="perfil" component={Perfil}   options={{ title: 'Perfil de usuario' }}/>
        <Drawer.Screen  name="chat" component={ChatStackNavigator}   options={{ title: 'Chat' }}/>
    </Drawer.Navigator>
 );

 if (user.rol == 'Paciente')
 return(
 <Drawer.Navigator screenOptions={{headerShown: true}}>
     <Drawer.Screen  name="paciente" component={Paciente}   options={{ title: 'Consultas' }}/>
     <Drawer.Screen  name="perfil" component={Perfil}   options={{ title: 'Perfil de usuario' }}/>
     <Drawer.Screen  name="chat" component={ChatStackNavigator}   options={{ title: 'Chat' }}/>
 </Drawer.Navigator>
);



}