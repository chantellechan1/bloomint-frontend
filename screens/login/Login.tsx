import React, { useState } from 'react';
import { Button, TextInput, StyleSheet } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

import { Text, View } from '../../components/Themed';
import axios from 'axios';
//import {TEST_VAR, LOGIN_URL} from '@env';

// const API_URL = process.env.REACT_APP_BLOOMINT_API;
const API_URL = 'http://localhost:5000';

const login = async (email: string, password: string) => {
 
  try {
    let res = await axios.post(
      `${API_URL}/auth/login`,
      {
        email: email,
        password: password
      }
    );
  
    const userToken = res.data.token;
  
    await SecureStore.setItemAsync(`${process.env.USER_JWT_TOKEN}`, userToken);
  
    let storedToken = await SecureStore.getItemAsync(`${process.env.USER_JWT_TOKEN}`);
    console.log(storedToken)

  } catch (error) {
    console.log(error);
  }
  
};

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        defaultValue={email}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        defaultValue={password}
      />
      <View>
        <Button
          onPress={() => login(email, password)}
          title="Log In"
        />
      </View>
    </View>
  );
};

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

export default LoginScreen;