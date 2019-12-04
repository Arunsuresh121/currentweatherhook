import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {weatherConditions} from '../weatherdata/WeatherConditions';
const Weather = ({weather, temperature, pressure, humidity}) => {
  return (
    <View
      style={[
        styles.weatherContainer,
        {backgroundColor: weatherConditions[weather].color},
      ]}>
      <View style={styles.headerContainer}>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: weatherConditions[weather].image}}
        />
        {/* <Icon size={72} name={weatherConditions[weather].icon} color={'#fff'} /> */}
        <Text style={styles.tempText}>{temperature}˚</Text>
      </View>

      <View style={styles.headerContainer1}>
        <Text style={styles.Text}>Pressure:{pressure}</Text>
        <Text style={styles.Text}>Humidity:{humidity}</Text>
      </View>

      <View style={styles.headerContainer2}>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
        <Text style={styles.subtitle}>
          {weatherConditions[weather].subtitle}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tempText: {
    fontSize: 48,
    color: '#fff',
  },
  Text: {
    fontSize: 20,
    color: '#fff',
  },
  headerContainer1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer2: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    color: '#fff',
    paddingLeft: 20,
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    paddingLeft: 25,
  },
});
export default Weather;
