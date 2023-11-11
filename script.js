function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;

    // Replace this URL with your actual weather forecast API endpoint
    const apiUrl = `https://useritem-api-service-tuurhulselmans.cloud.okteto.net/forecast_ordered/${cityName}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayWeatherError();
        });
}

function displayWeather(weatherData) {
    const weatherOutput = document.getElementById('weatherOutput');
    weatherOutput.innerHTML = '';

    if (weatherData.length === 0) {
        weatherOutput.innerHTML = '<p>No forecast data available for the specified city.</p>';
        return;
    }

    weatherData.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.innerHTML = `
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Description:</strong> ${entry.description}</p>
            <p><strong>High Temperature:</strong> ${entry.temperature_high}°C</p>
            <p><strong>Low Temperature:</strong> ${entry.temperature_low}°C</p>
            <hr>
        `;
        weatherOutput.appendChild(entryDiv);
    });
}

function displayWeatherError() {
    const weatherOutput = document.getElementById('weatherOutput');
    weatherOutput.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
}