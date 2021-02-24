/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackNavigator} from './src/navigation/AuthStackNavigator';
import {MainStackNavigator} from './src/navigation/MainStackNavigator';
import {darkTheme} from './src/themes/dark';
import {lightTheme} from './src/themes/light';

import {AuthContext} from './src/contexts/AuthContext';
import {UserContext} from './src/contexts/UserContext';
import { useAuth } from './src/hooks/useAuth';


const RootStack = createStackNavigator();

export default function App(){


  const {auth, state} = useAuth();

return(
<AuthContext.Provider value={auth}>
<StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
  <NavigationContainer theme={lightTheme}>
    <RootStack.Navigator  screenOptions={{headerShown: false}}>
    {state.user ? (
    <RootStack.Screen  name={'MainStack'} >
{()=>(
     <UserContext.Provider value={{user:state.user}}>
       <MainStackNavigator/>
     </UserContext.Provider>
)}
      </RootStack.Screen>

    ) : (
     <RootStack.Screen  name={'AuthStack'}  component={AuthStackNavigator}/>)
    }
    
    </RootStack.Navigator>
  </NavigationContainer>
</AuthContext.Provider>
);

}

const styles = StyleSheet.create({

})