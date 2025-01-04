import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formStyles } from '../styles/formStyles';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;      
    return passwordRegex.test(password);
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(username);
  }
  const handleRegister = async () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!username) {
      newErrors.username = 'Username is required.';
    } else if (username.length < 8) {
      newErrors.username = 'Username must be at least 8 characters.';
    } else if (!validateUsername(username)) {
      newErrors.username = 'Username must contain only letters, numbers, and underscores.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }else if(password.length < 8){
      newErrors.password = 'Password must be at least 8 characters.';
    } else if (!validatePassword(password)) {
      newErrors.password =
        'Password must include at least 1 uppercase letter, 1 number, and 8 characters.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Do not proceed if there are validation errors
    }

    try {
      // Save user data (for simplicity, using AsyncStorage)
      await AsyncStorage.setItem('user', JSON.stringify({ username, password }));
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to register. Please try again.');
    }
  };

  return (
     <ImageBackground source={require('../assets/background.jpg')} style={formStyles.backgroundImage}>
    <View style={formStyles.container}>
      <Text style={formStyles.title}>Register</Text>

      <TextInput
        style={formStyles.input}
        placeholder="Email"
        placeholderTextColor={'#c7c5c3'}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: validateEmail(text) ? '' : 'Invalid email format.',
          }));
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={formStyles.error}>{errors.email}</Text>}

      <TextInput
        style={formStyles.input}
        placeholder="Username"
        placeholderTextColor={'#c7c5c3'}
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setErrors((prevErrors) => ({
            ...prevErrors,
            username:
              text.length >= 8 ? '' : 'Username must be at least 8 characters.',
          }));
        }}
        autoCapitalize="none"
      />
      {errors.username && <Text style={formStyles.error}>{errors.username}</Text>}

      <TextInput
        style={formStyles.input}
        placeholder="Password"
        placeholderTextColor={'#c7c5c3'}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: validatePassword(text)
              ? ''
              : 'Password must include at least 1 uppercase letter, 1 number, and 8 characters.',
          }));
        }}
        secureTextEntry
      />
      {errors.password && <Text style={formStyles.error}>{errors.password}</Text>}

      <TextInput
        style={formStyles.input}
        placeholder="Confirm Password"
        placeholderTextColor={'#c7c5c3'}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {errors.confirmPassword && (
        <Text style={formStyles.error}>{errors.confirmPassword}</Text>
      )}

      <TouchableOpacity style={formStyles.button} onPress={handleRegister}>
        <Text style={formStyles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={formStyles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

export default Register;
