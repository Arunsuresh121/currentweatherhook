import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {API_KEY} from './weatherdata/WeatherApiKey';
import Weather from './components/Weather';

function App() {
  const [initialState, setInitial] = useState({
    location: 'No location',
    isLoading: false,
    temperature: 0,
    pressure: 0,
    humidity: 0,
    weatherCondition: 'Default',
    error: null,
  });
  
  useEffect(() => {
    fetchWeather();
    Geolocation.getCurrentPosition(locationUpdated, console.log, {
      maximumAge: 10000,
      enableHighAccuracy: false,
    });
  }, []);

   locationUpdated = (location) => {
    console.log('ggg');
    console.log(location);
    setInitial({
      location: `Longitude: ${location.coords.longitude}, Latitude: ${location.coords.latitude}`,
    });
  }

  function fetchWeather(lat = 10.01516, lon = 76.347315) {
    console.log('a');
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`,
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setInitial({
          temperature: json.main.temp,
          pressure: json.main.pressure,
          humidity: json.main.humidity,
          weatherCondition: json.weather[0].main,
          isLoading: false,
        });
      });
  }
  return (
    <View style={styles.container}>
      <Text>{initialState.location}</Text>
      <Text>arun</Text>
      {initialState.isLoading ? (
        <Text>Fetching Weather Data</Text>
      ) : (
        <Weather
          weather={initialState.weatherCondition}
          temperature={initialState.temperature}
          pressure={initialState.pressure}
          humidity={initialState.humidity}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
