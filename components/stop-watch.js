// CLOCK
function updateTime() {
    const timeDiv = document.getElementById('time');
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours.toString();
    timeDiv.textContent = `${formattedHours}:${minutes} ${period}`;
}

function displayLocalTime() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(() => {
            updateTime();
            setInterval(updateTime, 1000);
        }, (error) => {
            document.getElementById('time').textContent = 'Time Loading...';
        });
    } else {
        document.getElementById('time').textContent = 'Oops Clocks Broke :(';
    }
}

displayLocalTime();

// LOCATION 
navigator.geolocation.getCurrentPosition(
    function(position) {
        const { latitude, longitude } = position.coords;
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d1933aa946e6467986ff7c773384241f`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const city = data.results[0].components.city || data.results[0].components.town;
                    const state = data.results[0].components.state;
                    document.getElementById('location').innerHTML = `${city}, ${state}`;
                } else {
                    document.getElementById('location').innerHTML = 'No city found.';
                }
            })
            .catch(error => {
                console.error('Error fetching location:', error);
            });
    },
    function(error) {
        console.error('Error occurred. Error code: ' + error.code);
        document.getElementById('location').innerHTML = 'Unable to retrieve location.';
    }
);
