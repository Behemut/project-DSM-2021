/* eslint-disable prettier/prettier */
import React ,{useCallback} from 'react';
import {RefreshControl, FlatList,StyleSheet} from 'react-native';
import {BASE_URL} from '../config';
import {PerfilComponent} from '../components/Perfil';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';


export default function Perfil({navigation}) {
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    wait(2000).then(() => setRefreshing(false));
  }, [fetchData]);

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
            return()=>{}
    }, [navigation, logout, user.id, fetchData, user.token] );
 

  function renderProduct({item: perfil}) {
    return <PerfilComponent usuario={perfil} onPress={fetchData}/>;
  }

  return (
    <FlatList
      contentContainerStyle={styles.productsListContainer}
      data={perfil}
      showsVerticalScrollIndicator={false} 
      showsHorizontalScrollIndicator={false}
      renderItem={renderProduct}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      keyExtractor={perfil => `${perfil.id}`}
    />
  );
}
const styles = StyleSheet.create({
  });