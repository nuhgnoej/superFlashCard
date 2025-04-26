import { useEffect, useState } from "react";
import { View, Text, StyleSheet,ScrollView, Dimensions,ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

const {width: SCREEN_WIDTH} = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5});
    
    const apiKey = "AIzaSyB150mvHr3cOw-lbsrhXOeoOcF0W9NOJSI";       
    const locationUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    const WEATHER_API_KEY = 'f9448c88dd7f98dd8e886d87a0fda4bd';

    try {
      const response = await fetch(locationUrl);
      const data = await response.json();
      
      if (data.status === "OK") {
        const addressComponents = data.results[0].address_components;
        const city = addressComponents.find(c => 
          c.types.includes("locality") || c.types.includes("administrative_area_level_1")
        )?.long_name; // 가장 가까운 장소 이름
        setCity(city);
      } else {
        console.error("Places API Error:", data.status);
        setCity("Unknown");
      }
    } catch (error) {
      console.error("Error fetching place name:", error);
      setCity("Unknown");
    }
        
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();
      setDays(
        weatherData.list.filter((weather) => weather.dt_txt.includes("00:00:00"))
      );
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }  
  useEffect(()=>{ask();}, []);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>      
      <ScrollView 
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.weather}>
        {days.length === 0 ? (
            <View style={{ ...styles.day, alignItems: "center" }}>
             <ActivityIndicator
               color="white"
               style={{ marginTop: 10 }}
               size="large"
             />
           </View>
         ) : (
           days.map((day, index) => (
            <View key={index} style={styles.day}>
            <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
            >
               <Text style={styles.temp}>
                 {parseFloat(day.main.temp).toFixed(1)}
               </Text>
               <Fontisto
                   name={icons[day.weather[0].main]}
                   size={68}
                   color="white"
                 />
                 </View>
               <Text style={styles.description}>{day.weather[0].main}</Text>
               <Text style={styles.tinyText}>{day.weather[0].description}</Text>
             </View>
           ))
         )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  text: {
    fontSize: 28,
    color: "black",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
    color: "white",
  },
  weather: {
    
  },
  day: {        
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  temp: {
    marginTop: 50,
    fontSize: 100,
    fontWeight: "600",
    color: "white",
  },
  description: {
    marginTop: -10,
     fontSize: 30,
     color: "white",
     fontWeight: "500",
  },
  tinyText:{
    marginTop: -5,
    fontSize: 25,
    color: "white",
    fontWeight: "500",
  }
});
