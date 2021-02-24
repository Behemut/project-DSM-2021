/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, SafeAreaView, StyleSheet} from 'react-native'
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import {useTheme} from '@react-navigation/native';
import {Loading} from '../components/Loading';
import { UserContext } from '../contexts/UserContext';



export  function Doctor({navigation}) {
    const {colors} = useTheme();
const user = React.useContext(UserContext);
const {logout} = React.useContext(AuthContext);

React.useEffect( ()=>{
    navigation.setOptions({
        headerRight: ()=> <HeaderIconButton  name={'log-out'} onPress={async  ()=>{

           await logout()}}/>,
    });
}, [navigation, logout] );

React.useEffect(  ()=>{

})


    return (
        
        <SafeAreaView style={[styles.container, {backgroundColor: colors.primary}]}>
            <Text>BIENVENIDO A DOCTORES</Text>
    
    
 
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


