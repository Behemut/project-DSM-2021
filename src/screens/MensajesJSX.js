/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Alert, Modal, View, ImageBackground,TouchableOpacity ,Button, TextInput,ScrollView} from 'react-native';
import {BASE_URL} from '../config';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import { MensajesComponent } from '../components/Mensajes';
import {map} from 'lodash';
import Colors from '../utils/Color';
import {IconButton} from '../components/IconButton';
import FormData from 'form-data';
import {useGet}    from '../hooks/useGet';
import { useFocusEffect } from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';


export default class MensajesJSX extends Component {
    render() {
        return (
                <>

                </>
        )
    }
}
