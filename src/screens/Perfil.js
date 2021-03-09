/* eslint-disable prettier/prettier */
import React ,{useCallback} from 'react';
import { FlatList,StyleSheet} from 'react-native';
import {BASE_URL} from '../config';
import {PerfilComponent} from '../components/Perfil';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';


export default function Perfil({navigation}) {
    const user = React.useContext(UserContext);
    const {logout} = React.useContext(AuthContext);
    const [perfil, setPerfil] = React.useState(null);

//Usando CallBack se crea una funcion para llamar los datos del axios, sin romper la primera ley de React Hooks
    const fetchData = useCallback( async () => {
        await axios.get(`${BASE_URL}/avatars?_where[usuario.id]=${user.id}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          }},
        )
        .then(res => {
          setPerfil(res.data);
        });
      },
      [user.id, user.token],
    );

    React.useEffect( ()=>{
        navigation.setOptions({
          headerRight: ()=> <HeaderIconButton  name={'log-out'} onPress={async  ()=>{await logout(user.id, user.token)}}/>,
            headerLeft: () => <HeaderIconButton name={'menu'} onPress={()=>{navigation.openDrawer()}} /> });
            fetchData();
    }, [navigation, logout, user.id, fetchData, user.token] );
 

  function renderProduct({item: perfil}) {
    return <PerfilComponent usuario={perfil} onPress={fetchData}/>;
  }

  return (
    <FlatList
      contentContainerStyle={styles.productsListContainer}
      data={perfil}
      renderItem={renderProduct}
      keyExtractor={perfil => `${perfil.id}`}
    />
  );
}
const styles = StyleSheet.create({
  });