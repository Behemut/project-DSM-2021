/* eslint-disable prettier/prettier */
import React from 'react';
import {BASE_URL} from '../config/index';
import {sleep} from '../utils/sleep';
import {createAction} from '../utils/createAction';
import axios from 'axios';
import SecureStorage from 'react-native-secure-storage'
import { ActionSheetIOS } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton
} from '@react-native-community/google-signin';

export function useAuth(){
const [avatarform, setAvatarform] = React.useState(null);
const [state, dispach] =React.useReducer( (state,action)=>{
    switch (action.type){
        case 'SET_USER':
          return{
            ...state,
            loading:false,
            user: {...action.payload},
          };
        case 'REMOVE_USER':
            return{
              ...state,
              user: undefined,
            };
            case 'SET_LOADING':
                return {
                  ...state,
                  loading: action.payload,
                };
              default:
                return state;
    }
 }, {user: undefined,loading:  true});

 const auth = React.useMemo( ()=> ({

  
   login: async (email, password) =>{
    await sleep(1500);
  const {data} =  await axios.post(`${BASE_URL}/auth/local`, {
       identifier: email, password,
     });  
     const user ={
       id: data.user.id,
       email: data.user.email,
       rol: data.user.rol,
       username: data.user.username,
       token: data.jwt ,
     };
     const inicio= new FormData();
     inicio.append('estado', JSON.stringify(true));
     await axios({
    method: 'PUT',
    url: `${BASE_URL}/users/${user.id}`,
  data: inicio,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${user.token}`,
    },
});

   await SecureStorage.setItem('user', JSON.stringify(user));
   dispach(createAction( 'SET_USER',user));
   },

   loginGoogle: async (idToken, Gusuario) =>{
    await sleep(1500);
    const { data } = await axios.get(`${BASE_URL}/auth/google/callback`, {
      params: {
        access_token: idToken,
      },
    });

    const avatar = new FormData();
    const inicio= new FormData();
    // save the JWT token and user info in your app
  
     const user ={
       id: data.user.id,
       email: data.user.email,
       rol: data.user.rol,
       username: data.user.username,
       token: data.jwt ,
     };

     let Gnombre= Gusuario.givenName + ' ' + Gusuario.familyName;
  
     inicio.append('estado', JSON.stringify(true));
     inicio.append('Nombre', JSON.stringify(Gnombre));

     const GusuarioId = {
      'usuario': user.id,
    };

    await axios({
    method: 'PUT',
    url: `${BASE_URL}/users/${user.id}`,
    data: inicio,
    headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${user.token}`,
    }});
    
    avatar.append('data', JSON.stringify(GusuarioId));
    avatar.append('files.profilepic', {
      uri: Gusuario.photo,
      name: Gusuario.email,
      type: 'image/jpeg',
  });

  let responseAvatar = await axios.get(`${BASE_URL}/avatars?_where[usuario]=${user.id}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${data.jwt}`,
    },
  });
 
if (responseAvatar.headers['content-length']===2 || responseAvatar.headers['content-length']==='2' ){
  await axios.post(`${BASE_URL}/avatars`, avatar, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${data.jwt}`,
    },
  });
}


   await SecureStorage.setItem('user', JSON.stringify(user));
   dispach(createAction( 'SET_USER',user));
   },




   logout : async (id,token) =>{

    const estado= new FormData();
    estado.append('estado', JSON.stringify(false));
    await axios({
   method: 'PUT',
   url: `${BASE_URL}/users/${id}`,
 data: estado,
 headers: {
   'Content-Type': 'multipart/form-data',
   Authorization: `Bearer ${token}`,
   },
});
   await SecureStorage.removeItem('user');
   await  dispach (createAction( 'REMOVE_USER'));

   await GoogleSignin.signOut();
   },
   register :  async (nombre,email, password,rol,file) =>{
    const data = new FormData();
    const avatar = new FormData();
    await sleep(1500);
    data.append('Nombre', nombre);
     data.append('username', email);
     data.append('email', email);
     data.append('rol',rol);
     data.append('confirmed', 'false');
     data.append('password',password);
     const response = await axios({
  method: 'post',
  url: `${BASE_URL}/auth/local/register`,
  data: data,
  headers: {
    'Content-Type': 'multipart/form-data',
    },
});
const usuario = {
  'usuario': response.data.user.id,
};
avatar.append('data', JSON.stringify(usuario));
avatar.append('files.profilepic', {
    uri: file.uri,
    name: file.fileName,
    type: 'image/jpeg',
});
  await axios.post(`${BASE_URL}/avatars`, avatar, {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${response.data.jwt}`,
  },
});
}}), [], );


 React.useEffect(() => {
  sleep(2000).then(() => {
    SecureStorage.getItem('user').then(user => {
      if (user) {
        dispach(createAction('SET_USER', JSON.parse(user)));
      }
      dispach(createAction('SET_LOADING', false));
    });
  });
}, []);
return {auth, state};
}