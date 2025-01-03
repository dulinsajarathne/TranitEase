import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
    } else {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      if (user && user.username === username && user.password === password) {
        dispatch(setUser(username)); // Save username in Redux store
        navigation.navigate('Home');
      } else {
        setError('Invalid credentials');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={'#000'}
        value={username}
        onChangeText={setUsernameInput}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#000'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Don't have an account? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Login;
