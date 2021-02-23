/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import {Login} from './src/screens/Login';
import {Register} from './src/screens/Register';
import axios from 'axios';

import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import {AuthStackNavigator} from './src/navigation/AuthStackNavigator';
import {darkTheme} from './src/themes/dark';
import {lightTheme} from './src/themes/light';

import {AuthContext} from './src/contexts/AuthContext';
import {BASE_URL} from './src/config/index';
import {sleep} from './src/utils/sleep';
import {createAction} from './src/utils/createAction';


const RootStack = createStackNavigator();


export default function App(){

 const [state, dispach] =React.useReducer( (state,action)=>{
    switch (action.type){
        case 'SET_USER':
          return{
            ...state,
            user: {...action.payload},
          }
    }
 }, {user: undefined});


  
 const auth = React.useMemo( ()=> ({
   login: async (email, password) =>{
    await sleep(2000);
  const {data} =  await axios.post(`${BASE_URL}/auth/local`, {
       identifier: email, password,
     });
     const user ={
       email: data.user.email,
       token: data.jwt ,
     };
     dispach(createAction( 'SET_USER',user));
   },
   logout : () =>{

   },
   register :  async (email, password) =>{
  await sleep(1500);
   await axios.post(`${BASE_URL}/auth/local/register`, {
      username: email,
      email,
      rol: 'doctor',
      password: password,
    });
  }
 }),  [], );


console.clear();
console.log(state.user);
return(
<AuthContext.Provider value={auth}>
<StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
  <NavigationContainer theme={lightTheme}>
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen  name={'AuthStack'}  component={AuthStackNavigator}/>

    </RootStack.Navigator>
  </NavigationContainer>
</AuthContext.Provider>
);

}

const styles = StyleSheet.create({

})