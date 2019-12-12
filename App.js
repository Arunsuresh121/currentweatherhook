import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {API_KEY} from './weatherdata/WeatherApiKey';
import Weather from './components/Weather';

function App() {
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
    location: 'no location',
  });
  const [temperature, setTemperature] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [initialState, setInitial] = useState({
    isLoading: false,
    weatherCondition: 'Default',
  });

  useEffect(() => {
    getPosition();
    console.log('bbb');
    console.log(position.latitude);
    console.log(position.longitude);
  }, [position.latitude, position.longitude]);

  const getPosition = () => {
    setInterval(() => {
      Geolocation.getCurrentPosition(locationUpdated, console.log, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
      });
    }, 1000);
  fetchWeather();
  };

  const locationUpdated = (location) => {
    console.log(location);
    setPosition({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
   
  };

  function fetchWeather(lat = position.latitude, lon = position.longitude) {
    console.log('a');
    console.log(position.latitude);
    console.log(position.longitude);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`,
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setInitial({
          weatherCondition: json.weather[0].main,
          isLoading: false,
        });
        setTemperature(json.main.temp.toFixed(1));
        setPressure(json.main.pressure);
        setHumidity(json.main.humidity);
      });
  }
  return (
    <View style={styles.container}>
      <Text>Latitude: {position.latitude}</Text>
      <Text>Longitude: {position.longitude}</Text>

      {initialState.isLoading ? (
        <Text>Fetching Weather Data</Text>
      ) : (
        <Weather
          weather={initialState.weatherCondition}
          temperature={temperature}
          pressure={pressure}
          humidity={humidity}
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
