/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import  {News} from '../screens/News';
import  {Doctor} from '../screens/Doctor';
import { UserContext } from '../contexts/UserContext';
import {Text} from 'react-native'
const MainStack = createStackNavigator();

export function MainStackNavigator({navigation}) {

        const user = React.useContext(UserContext);
  
        if (user.rol == 'doctor')
        return (
             <MainStack.Navigator >
               <MainStack.Screen name={'doctor'} component={Doctor} />
             </MainStack.Navigator>
           )
      else 
           return (
             <MainStack.Navigator >
               <MainStack.Screen name={'doctor'} component={Doctor} />
             </MainStack.Navigator>
         
           );
            
}