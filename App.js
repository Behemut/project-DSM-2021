/* eslint-disable prettier/prettier */
/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {StyleSheet, StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackNavigator} from './src/navigation/AuthStackNavigator';
import {MainDrawerNavigator} from './src/navigation/MainDrawNavigator';
import {darkTheme} from './src/themes/dark';
import {lightTheme} from './src/themes/light';
import {AuthContext} from './src/contexts/AuthContext';
import {UserContext} from './src/contexts/UserContext';
import { useAuth } from './src/hooks/useAuth';
import {SplashScreen} from './src/screens/SplashScreen';

const RootStack = createStackNavigator();

export default function App(){


  const {auth, state} = useAuth();

  function renderScreens() {
    if (state.loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen} />;
    }
    return (state.user ? (
      <RootStack.Screen name={'Main'}>
        {() => (
          <UserContext.Provider value={state.user}>
            <MainDrawerNavigator />
          </UserContext.Provider>
        )}
      </RootStack.Screen>
    ) : (
      <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
    ));
  }
return(
<AuthContext.Provider value={auth}>
<StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
  <NavigationContainer theme={lightTheme}>
    <RootStack.Navigator  screenOptions={{headerShown: false}}>
    {renderScreens()}
    </RootStack.Navigator>
  </NavigationContainer>
</AuthContext.Provider>
);

}

const styles = StyleSheet.create({

})