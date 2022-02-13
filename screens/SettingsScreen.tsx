import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';

import * as SecureStore from 'expo-secure-store';


// const SettingsScreen = ({navigation} : {navigation: RootTabScreenProps<'TabOne'>}) => {
const SettingsScreen = () => {
  const navigation = useNavigation();


  const logout = async () => {
    console.log('logout called')

    let currentUserToken = await SecureStore.getItemAsync('USER_JWT_TOKEN');
    if (currentUserToken !== null) {
      await SecureStore.deleteItemAsync('USER_JWT_TOKEN');
    }

    navigation.navigate('Root');

    console.log('navigate happened');

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button
        onPress={logout}
        title="Log Out"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/SettingsScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default SettingsScreen;