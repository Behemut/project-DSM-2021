/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import  {News} from '../screens/News';
import  {Doctor} from '../screens/Doctor';
import { UserContext } from '../contexts/UserContext';
import {Text} from 'react-native'
import { MainDrawerNavigator } from './MainDrawNavigator';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';



const MainStack = createStackNavigator();

export function MainStackNavigator({navigation}) {

        const user = React.useContext(UserContext);
        const {logout} = React.useContext(AuthContext);

/*
        if (user.rol == 'Doctor')
        return (
             <MainStack.Navigator >
               <MainStack.Screen name={'drawer'} screenOptions={{headerShown: true}} component={MainDrawerNavigator} />
             </MainStack.Navigator>
           )
        if (user.rol == 'Paciente')
           return (
             <MainStack.Navigator >
             <MainStack.Screen name={'drawer'} screenOptions={{headerShown: true}} component={MainDrawerNavigator} />
             </MainStack.Navigator>
         
           );
  */
 
           return(null);
}