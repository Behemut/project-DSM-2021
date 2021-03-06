/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {BASE_URL} from '../config';
import {Card} from './Card';

export function NewsComponent({news, onPress}) {
  return (
    <Card style={styles.card} onPress={onPress}>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{news.title}</Text>
        <Text style={styles.price}>{news.enlaces}</Text>
    
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
  },
});