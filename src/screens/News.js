/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';

import { UserContext } from '../contexts/UserContext';
import {NewsComponent} from '../components/NewsComponent';
import {HeaderIconsContainer} from '../components/HeaderIconContainer';
import {ThemeContext} from '../contexts/ThemeContext';

export function News({navigation}) {
  const {logout} = React.useContext(AuthContext);
  const user = React.useContext(UserContext);
  const switchTheme = React.useContext(ThemeContext);
  


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIconsContainer>
          
          <HeaderIconButton
            name={'log-out'}
            onPress={() => {
              logout();
            }}
          />
        </HeaderIconsContainer>
      ),
    });
  }, [navigation, logout]);


  const const_noticias =  useGet(`/noticias?usuario=${user.id}`);
  function renderProduct({item: noticias}) {
    return <NewsComponent news={noticias} />;
  }

  return (
    <FlatList
      contentContainerStyle={styles.productsListContainer}
      data={const_noticias}
      renderItem={renderProduct}
      keyExtractor={noticias => `${noticias.id}`}
    />
  );
}

const styles = StyleSheet.create({
  productsListContainer: {
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});