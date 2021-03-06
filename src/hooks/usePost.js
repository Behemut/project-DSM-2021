/* eslint-disable prettier/prettier */
import React from 'react';
import axios from 'axios';
import {UserContext} from '../contexts/UserContext';
import {BASE_URL} from '../config';

export function usePost (endpoint, petition, initialValue = []){
    const {token} = React.useContext(UserContext);
    const [data, setData] = React.useState(initialValue);
    React.useEffect(() => {
      axios
        .post(`${BASE_URL}${endpoint}`, petition, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `bearer ${token}`,
          },
        })
        .then(({data}) => {
          setData(data);
        });
    }, [token, endpoint, petition]);
    return data;
  }
