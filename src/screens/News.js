/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, SafeAreaView, StyleSheet} from 'react-native'
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';

import {Loading} from '../components/Loading';
import { UserContext } from '../contexts/UserContext';



export  function News({navigation}) {
const {user} = React.useContext(UserContext);
const {logout} = React.useContext(AuthContext);

React.useEffect( ()=>{
    navigation.setOptions({
        headerRight: ()=> <HeaderIconButton  name={'log-out'} onPress={async  ()=>{

           await logout()}}/>,
    });
}, [navigation, logout] );


    return (
        
        <SafeAreaView style={styles.container}>
            <Text>BIENVENIDO A NEWS</Text>
            <Text>Bienvenido {user.username}  y eres un {user.rol}</Text>
    
 
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1 ,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


