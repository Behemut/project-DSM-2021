/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Chat from '../screens/Chat';
import Mensajes from '../screens/Mensajes';
import Pacientes from '../screens/Paciente';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';

const ChatStack = createStackNavigator();

export function ChatStackNavigator({navigation}) {
    const user = React.useContext(UserContext);
    const {logout} = React.useContext(AuthContext);
React.useEffect(()=>{
    navigation.setOptions({
        headerRight: ()=> <HeaderIconButton  name={'log-out'} onPress={async  ()=>{await logout(user.id, user.token)}}/>,
        headerLeft: () => <HeaderIconButton name={'menu'} onPress={()=>{navigation.openDrawer()}} /> });

},[logout, navigation, user.id, user.token])

            return(
                <ChatStack.Navigator   screenOptions={{headerShown: false}}>
                <ChatStack.Screen name={'inicio'} component={Chat} />
                <ChatStack.Screen name={'mensajes'} component={Mensajes} />
                <ChatStack.Screen name={'pacientes'} component={Pacientes} />
                </ChatStack.Navigator>
            );
}