import React, { useState } from 'react';
import { Button, TextInput, StyleSheet } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';

import { Text, View } from '../../components/Themed';
import axios from 'axios';
//import {TEST_VAR, LOGIN_URL} from '@env';

const login = async (username: string, password: string) => {
  console.log('login clicked');
  console.log(`${username}, ${password}, ${process.env.REACT_APP_BLOOMINT_API}`);

  let res = await axios.post(
    `${process.env.REACT_APP_BLOOMINT_API}/auth/login`,
    {
      username: username,
      password: password
    }
  );

  console.log(res.data);
};

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  console.log(`${process.env.REACT_APP_TEST_VAR}`)

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        defaultValue={username}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        defaultValue={password}
      />
      <View>
        <Button
          onPress={() => login(username, password)}
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