const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherEl = document.getElementById('current-weather-items');
const timezoneEl = document.getElementById('time-zone');
const currentTempEl = document.getElementById("temp-now");
const locationEl = document.getElementById("location");
const weatherForecastEl = document.getElementById('weather-forecast');
const weatherAPI = "93ca171dab2a3eb1c5f5d46d9d24e11c";

setInterval(() => {
    const time = new Date();
    const month = time.getMonth(); 
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hourIn12 = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    
    timeEl.innerHTML = `${hourIn12}:${minutes < 10 ? '0' + minutes : minutes}<span id="am-pm">${ampm}</span>`;

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[month];
    
    const dayNames = [ 
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = dayNames[day];

    let daySuffix = "";
    const daySuffixNum = date % 10;
    if (date >= 11 && date <= 13) {
        daySuffix = 'th';
    } else if (daySuffixNum === 1) {
        daySuffix = 'st';
    } else if (daySuffixNum === 2) {
        daySuffix = 'nd';
    } else if (daySuffixNum === 3) {
        daySuffix = 'rd';
    } else {
        daySuffix = 'th';
    }

    dateEl.innerHTML = `${dayName}, ${monthName} ${date}${daySuffix}`;
}, 1000);

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${weatherAPI}`)
            .then(res => res.json())
            .then(data => {
                showWeatherData(data);
            });
    });
}

function showWeatherData(data) {
    const { humidity, wind_speed } = data.current;
    const highTemp = data.daily[0].temp.max.toFixed(0);
    const lowTemp = data.daily[0].temp.min.toFixed(0);
    const currentTemp = data.current.temp.toFixed(0);
    const location = data.timezone;
    currentWeatherEl.innerHTML = `
        <div class="weather-items">
            <div>High / Low</div>
            <div>${highTemp} / ${lowTemp}</div>
        </div>
        <div class="weather-items">
            <div>Humidity</div>
            <div>${humidity}%</div>
        </div>
        <div class="weather-items">
            <div>Windspeed</div>
            <div>${wind_speed.toFixed(0)} mph</div>
        </div>`;

   currentTempEl.innerHTML = `${currentTemp}&#176 F`;
   locationEl.innerHTML = `${location}`;
   console.log(data);
   
   let otherDayForecast = "";
   data.daily.forEach((day, idx) => {
       if(idx == 0){
       }else{
           otherDayForecast += `
           <div class="weather-forecast-item">
               <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
               <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                              <div class="temp">Day - ${day.temp.day.toFixed(0)}&#176; F</div>
               <div class="temp">Night - ${day.temp.night.toFixed(0)}&#176; F</div>
           </div>
           
           `
       }
   })


   weatherForecastEl.innerHTML = otherDayForecast;
}

getWeatherData(); 



