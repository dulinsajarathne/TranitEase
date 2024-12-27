import React from 'react';
import store from './src/redux/store'; // Import the Redux store
import { Provider } from 'react-redux'; // Import Provider to wrap the app
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppNavigator from './src/navigation/AppNavigator'; // Import navigation

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1, // Ensure SafeAreaView takes the entire screen
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
