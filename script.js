const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091';
    const city = document.querySelector('.search-box input').value.trim();

    if (city === '') {
        alert('Please enter a city name!');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then((json) => {
            // Updating weather information
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Setting weather image based on condition
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'image/clear.png';
                    break;
                case 'Rain':
                    image.src = 'image/rain.png';
                    break;
                case 'Snow':
                    image.src = 'image/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'image/cloud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'image/mist.png';
                    break;
                default:
                    image.src = 'image/cloud.png';
            }

            // Updating UI with API data
            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerText = json.weather[0].description;
            humidity.innerText = `${json.main.humidity}%`;
            wind.innerText = `${Math.round(json.wind.speed)}Km/h`;

            // Making the weather box and details visible
            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';
        })
        .catch(error => {
            // Handle error: show 404.png and reset details
            const weatherIcon = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
        
            weatherIcon.src = 'image/404.png'; // Display the 404 error image
            temperature.innerHTML = 'Oops!'; // Show "N/A" for temperature
            description.textContent = 'Location not found'; // Show error description
            humidity.textContent = '--'; // Clear humidity
            wind.textContent = '--'; // Clear wind speed
        
            // Ensure visibility of the weather box and keep consistent size
            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex'; // Show details even if empty
        });
        
});
