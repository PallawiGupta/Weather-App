const container = document.querySelector('.container');
const search = document.querySelector('.searchbox button');
const weatherbox = document.querySelector('.weatherbox');
const weatherDetails = document.querySelector('.weatherDetails');
const error404 = document.querySelector('.notfound');
const cityHide = document.querySelector('.cityhide');

search.addEventListener('click', () => {
    const APIKey = '93d5e05a3d5b59960973482909ef357b';
    const city = document.querySelector('.searchbox input').value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if(json.cod === '404'){
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherbox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            if(cityHide.textContent == city){
                return;
            }
            else{
                cityHide.textContent = city;

                container.style.height = '555px';
                container.classList.add('active');
                weatherbox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                // setTimeout(() => {
                //     container.classList.remove('active');
                // }, 2500);

                const image = document.querySelector('.weatherbox img');
                const temperature = document.querySelector('.weatherbox .temperature');
                const description = document.querySelector('.weatherbox .description');
                const humidity = document.querySelector('.weatherDetails .humidity span');
                const wind = document.querySelector('.weatherDetails .wind span');

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = json.weather[0].description;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)} m/s`;

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'Clear.jpeg';
                        break;
                    case 'Rain':
                        image.src = 'rain.jpeg';
                        break;
                    case 'Snow':
                        image.src = 'snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'cloud.png';
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = 'mist.png';
                        break;
                    case 'Thunderstorm':
                        image.src = 'thunderstorm.png';
                        break;
                    default:
                        image.src = 'sunny.webp';
                } 
            }

            // Clone and handle animations
            const infoweather = document.querySelector('.infoweather');
            const infohumidity = document.querySelector('.info-humidity');
            const infowind = document.querySelector('.info-wind');

            const elCloneInfoWeather = infoweather.cloneNode(true);
            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            const elCloneInfoHumidity = infohumidity.cloneNode(true);
            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');

            const elCloneInfoWind = infowind.cloneNode(true);
            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');

            setTimeout(() => {
                infoweather.insertAdjacentElement("afterend", elCloneInfoWeather);
                infohumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                infowind.insertAdjacentElement("afterend", elCloneInfoWind);

                const cloneInfoWeather = document.querySelector('.infoweather.active-clone');
                const totalCloneInfoWeather = cloneInfoWeather.length;
                const cloneInfoWeatherFirst = cloneInfoWeather[0];

                const cloneInfoHumidity = document.querySelector('.info-humidity.active-clone');
                // const totalCloneInfoWeather = cloneInfoWeather.length;
                const cloneInfoHumidityFirst = cloneInfoHumidity[0];

                const cloneInfoWind = document.querySelector('.info-wind.active-clone');
                // const totalCloneInfoWeather = cloneInfoWeather.length;
                const cloneInfoWindFirst = cloneInfoWind[0];


                if(totalCloneInfoWeather >0){
                    cloneInfoWeatherFirst.classList.remove('active-clone');
                    cloneInfoHumidityFirst.classList.remove('active-clone');
                    cloneInfoWindFirst.classList.remove('active-clone');

                    setTimeout(() => {
                        cloneInfoWeatherFirst.remove();
                        cloneInfoHumidityFirst.remove();
                        cloneInfoWindFirst.remove();

                    }, 2200);

                }

                // const cloneInfoWeatherFirst = document.querySelector('.infoweather.active-clone');
                // if (cloneInfoWeatherFirst) {
                //     cloneInfoWeatherFirst.classList.remove('active-clone');
                //     setTimeout(() => {
                //         cloneInfoWeatherFirst.remove();
                //     }, 2200);
                // }
            }, 2200);
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
});
