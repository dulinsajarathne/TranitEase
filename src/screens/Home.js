import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const Home = ({ route }) => {
  const { username } = route.params;
  const [busService, setBusService] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const appId = 'c5776a05'; // Your app_id
      const appKey = '62f088f005e6f370155f97eb371f0aeb'; // Your app_key
      const url = `https://transportapi.com/v3/uk/bus/services/FPOT:25.json?app_id=${appId}&app_key=${appKey}`;

      try {
        const response = await axios.get(url);
        setBusService(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  if (!busService) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}</Text>
      <Text style={styles.title}>Bus Service Information</Text>
      <Text style={styles.info}>Operator: {busService.operator.name}</Text>
      <Text style={styles.info}>Line: {busService.line_name}</Text>
      <Text style={styles.info}>Directions:</Text>
      <FlatList
        data={busService.directions}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.direction}>
            <Text style={styles.directionName}>{item.name}</Text>
            <Text style={styles.destination}>{item.destination.description}</Text>
          </View>
        )}
      />
      <Text style={styles.info}>Coordinates: {busService.centroid.coordinates.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  direction: {
    marginBottom: 10,
  },
  directionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  destination: {
    fontSize: 16,
  },
});

export default Home;