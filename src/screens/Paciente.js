/* eslint-disable prettier/prettier */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';

export default function Pacientes({navigation}) {
    const user = React.useContext(UserContext);
    const {logout} = React.useContext(AuthContext);

    React.useEffect( ()=>{
        navigation.setOptions({
            headerRight: ()=> <HeaderIconButton  name={'log-out'} onPress={async  ()=>{await logout(user.id, user.token)}}/>,
            headerLeft: () => <HeaderIconButton name={'menu'} onPress={()=>{navigation.openDrawer()}} />,
          
        });
    }, [navigation, logout, user.id, user.token] );
    return (
        <View>
            <Text>BIENVENIDO A CREAR CONSULTAS (DOCTOR)</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
