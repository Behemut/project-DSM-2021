/* eslint-disable prettier/prettier */
import React from 'react';
import {BASE_URL} from '../config/index';
import {sleep} from '../utils/sleep';
import {createAction} from '../utils/createAction';
import axios from 'axios';

export function useAuth(){
const [state, dispach] =React.useReducer( (state,action)=>{
    switch (action.type){
        case 'SET_USER':
          return{
            ...state,
            user: {...action.payload},
          }
        case 'REMOVE_USER':
            return{
              ...state,
              user: undefined,
            }
    }
 }, {user: undefined});


  
 const auth = React.useMemo( ()=> ({
   login: async (email, password) =>{
    await sleep(1500);
  const {data} =  await axios.post(`${BASE_URL}/auth/local`, {
       identifier: email, password,
     });
     const user ={
       email: data.user.email,
       rol: data.user.rol,
       username: data.user.username,
       token: data.jwt ,
     };
     dispach(createAction( 'SET_USER',user));
   },
   logout : async () =>{
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

 return{auth, state};
}