/* eslint-disable prettier/prettier */
import React from 'react';
import {ToastAndroid,View, StyleSheet, Text, StatusBar} from 'react-native';



export function Error({error}) {
 
  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
        error,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

 
  return (
    <View style={styles.container}>
        {(error!=null)? showToastWithGravityAndOffset(): null}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    justifyContent: "center",
    padding: 8
  }
});