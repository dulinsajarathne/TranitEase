import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formStyles } from '../styles/formStyles';

const Login = () => {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const validateInputs = () => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
     setError('Username must contain only letters, numbers, and underscores.');
      return false;
    }
    if (password.length < 6) {
     setError('Password must be at least 8 characters.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    if (!validateInputs()) {
      return;
    }

    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      if (user && user.username === username && user.password === password) {
        setError('');
        navigation.navigate('Home');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error accessing AsyncStorage:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={formStyles.backgroundImage}>
      <View style={formStyles.container}>
        <Text style={formStyles.title}>Login</Text>

        {error ? <Text style={formStyles.error}>{error}</Text> : null}

        <TextInput
          style={formStyles.input}
          placeholder="Username"
          placeholderTextColor={'#c7c5c3'}
          value={username}
          onChangeText={setUsernameInput}
        />
        <TextInput
          style={formStyles.input}
          placeholder="Password"
          placeholderTextColor={'#c7c5c3'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={formStyles.button} onPress={handleLogin}>
          <Text style={formStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={formStyles.link}>Don't have an account? Register here</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;
