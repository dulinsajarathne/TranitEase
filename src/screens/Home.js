import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../redux/counterSlice'; // Import the increment action
import axios from 'axios';

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  const clickCount = useSelector((state) => state.counter.count); // Access the current click count from Redux
  const username = useSelector((state) => state.user.username); // Access the username from Redux
  const dispatch = useDispatch(); // Use Redux dispatch

  // Fetch all cars or search cars
  const searchVehicles = async (defaultQuery = 'vehicle') => {
    setLoading(true);
    setResults([]);
    setError('');
    try {
      const response = await axios.get(
        `https://cars-database-with-image.p.rapidapi.com/api/search`,
        {
          headers: {
            'x-rapidapi-host': 'cars-database-with-image.p.rapidapi.com',
            'x-rapidapi-key': 'dbafc40d8dmsh73dcd0e3f95ca77p1832cajsn4abb50893e6c',
          },
          params: { q: defaultQuery, page: 1 },
        }
      );
      setResults(response.data.results);
    } catch (error) {
      setError('Failed to fetch vehicle data. Please try again later.');
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all cars on page load
  useEffect(() => {
    searchVehicles();
  }, []);

  // Update search results as the user types
  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim()) {
      searchVehicles(text);
    } else {
      setResults([]); // Clear results if the query is empty
    }
  };

  const handleCardClick = () => {
    dispatch(increment()); // Dispatch the increment action when a card is clicked
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={handleCardClick}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
        <Text style={styles.additional}>{item.additional}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>Welcome, {username}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter vehicle name"
        placeholderTextColor={'#c7c5c3'}
        value={query}
        onChangeText={handleSearch}
      />

      {loading && <Text style={styles.loading}>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      {!loading && results.length === 0 && !error && query.trim() !== '' && (
        <Text style={styles.noResults}>No results found.</Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.buttonText}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  additional: {
    fontSize: 12,
    color: '#777',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200ee',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
