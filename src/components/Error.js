/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';



export function Error({error}) {

  return (
  <Text>{error}</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  text: {
    color: 'red',
    fontWeight: 'bold',
  },
});