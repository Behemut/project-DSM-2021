import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function SplashScreen() {
  const {colors} = useTheme();
  return <View style={[styles.container, {backgroundColor: colors.primary}]}>
     
        </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});