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

    if (!Array.isArray(weatherData) || weatherData.length === 0) {
        weatherOutput.innerHTML = '<p>No forecast data available for the specified city.</p>';
        return;
    }

    weatherData.forEach(entry => {
        // Check if the city name is empty
        const cityName = entry.city.trim() !== '' ? entry.city : 'Unknown';

        const entryDiv = document.createElement('div');
        entryDiv.innerHTML = `
            <p><strong>City:</strong> ${cityName}</p>
            <p><strong>Date:</strong> ${new Date(entry.date).toLocaleDateString()}</p>
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

function submitWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const dateInput = document.getElementById('dateInput').value;
    const descriptionInput = document.getElementById('descriptionInput').value;
    const highTempInput = parseFloat(document.getElementById('highTempInput').value);
    const lowTempInput = parseFloat(document.getElementById('lowTempInput').value);

    const apiUrl = 'https://useritem-api-service-tuurhulselmans.cloud.okteto.net/forecast/';

    const forecastData = {
        city: cityInput,
        date: dateInput,
        description: descriptionInput,
        temperature_high: highTempInput,
        temperature_low: lowTempInput,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(forecastData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);
            // Handle the response as needed
        })
        .catch(error => {
            console.error('Error submitting weather forecast:', error);
            // Handle the error, if necessary
        });
}

