const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/getWeather', async (req, res) => {
  try {
    const { cities } = req.body;

    const weatherPromises = cities.map(city => fetchWeather(city));

    const weatherResults = await Promise.all(weatherPromises);

    const weatherData = {};
    weatherResults.forEach((result, index) => {
      const city = cities[index];
      weatherData[city] = result;
    });

    res.json({ weather: weatherData });
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

async function fetchWeather(city) {
  try {
    // Replace the API_URL placeholder with the URL of your chosen weather API
    const API_URL = `https://api.example.com/weather?city=${city}`;
    const response = await axios.get(API_URL);
    const weather = response.data.weather;
    return weather;
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error);
    return 'N/A';
  }
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
