/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import  {News} from '../screens/News';
import  {Doctor} from '../screens/Doctor';
import {useAuth} from '../hooks/useAuth';
import { UserContext } from '../contexts/UserContext';

const MainStack = createStackNavigator();

export function MainStackNavigator() {

    const {user} = React.useContext(UserContext);

         if (user.rol == 'doctor')
           return (
                <MainStack.Navigator >
                  <MainStack.Screen name={'doctor'} component={Doctor} />
                </MainStack.Navigator>
              )
         else 
              return (
                <MainStack.Navigator >
                  <MainStack.Screen name={'news'} component={News} />
                </MainStack.Navigator>
            
              );
}