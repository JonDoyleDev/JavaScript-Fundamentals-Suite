const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherEl = document.getElementById('current-weather-items');
const timezoneEl = document.getElementById('time-zone');
const currentTempEl = document.getElementById("current-temp");
const locationEl = document.getElementById("location");
const weatherForecastEl = document.getElementById('weather-forecast');
const weatherAPI = "93ca171dab2a3eb1c5f5d46d9d24e11c";


setInterval(() => {
    const time = new Date();
    const month = time.getMonth(); 
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hourIn12 = hour >=13 ? hour %12: hour;
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'
    
    // Set AM/PM
    timeEl.innerHTML = hourIn12 + ':' + minutes + `<span id="am-pm">${ampm}</span>`;

    // Set Month Name
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let monthName = (month >= 1 && month <= 12) ? monthNames[month]: "whoops I'm broken again :(";
    
    // Set Day Name
    const dayNames = [ 
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = (day >= 1 && day <= 7) ? dayNames[day] : "Whoops I'm broken again :(";

    // Set Day Suffix
    let daySuffix = "";
    const daySuffixNum = date % 10;
    if(date == 11-13){daySuffix = 'th'}
    else if (daySuffixNum == 1){daySuffix = 'st'}
    else if (daySuffixNum == 2){daySuffix = 'nd'}
    else if (daySuffixNum == 3){daySuffix = "rd"}
    else (daySuffix = "th");

    dateEl.innerHTML = dayName + ', ' + monthName + ' ' + date + daySuffix;
}, 1000);

let positionData;

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((position) => {
        positionData = position;

        let { latitude, longitude } = position.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${weatherAPI}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }, (error) => {
        console.error(error);
    });
}

getWeatherData();

setTimeout(() => {
    if (positionData) {
        console.log('Position data:', positionData);
    } else {
        console.log('Position data not available yet.');
    }
}, 1000);

