import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function SplashScreen() {
  const {colors} = useTheme();
  return <View style={[styles.container, {backgroundColor: colors.primary}]}>
     <Image
        style={styles.logo}
        source={require('../assets/logo.png')}
      />
        </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },

  logo: {
    width: 300,
    height: 300,
    marginLeft: 50,
    marginRight: 100,

  },
});