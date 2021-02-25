/* eslint-disable prettier/prettier */
import React from 'react';
import {BASE_URL} from '../config/index';
import {sleep} from '../utils/sleep';
import {createAction} from '../utils/createAction';
import axios from 'axios';
import SecureStorage from 'react-native-secure-storage'
 
export function useAuth(){
const [state, dispach] =React.useReducer( (state,action)=>{
    switch (action.type){
        case 'SET_USER':
          return{
            ...state,
            loading:false,
            user: {...action.payload},
          }
        case 'REMOVE_USER':
            return{
              ...state,
              user: undefined,
            }
            case 'SET_LOADING':
                return {
                  ...state,
                  loading: action.payload,
                };
              default:
                return state;
    }
 }, {user: undefined,loading:  true,});


  
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
       consultas: data.user.noticias,
       token: data.jwt ,
     };
   
     await SecureStorage.setItem('user', JSON.stringify(user));
     dispach(createAction( 'SET_USER',user));
   },
   logout : async () =>{
       await SecureStorage.removeItem('user');
   await  dispach (createAction( 'REMOVE_USER'));

   },
   register :  async (email, password) =>{
  await sleep(1500);
   await axios.post(`${BASE_URL}/auth/local/register`, {
      username: email,
      email,
      rol: 'doctor',
      password: password,
    });
  }
 }),  [], );


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