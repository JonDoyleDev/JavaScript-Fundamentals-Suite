// CLOCK
function updateTime() {
    const timeDiv = document.getElementById('time');
    const now = new Date();
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    
    const formattedHours = hours.toString().padStart(2, '0');
    timeDiv.textContent = `${formattedHours}:${minutes}:${seconds} ${period}`;
}

function displayLocalTime() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(() => {
            updateTime();
            setInterval(updateTime, 1000);
        }, (error) => {
            document.getElementById('time').textContent = 'Unable to get location';
        });
    } else {
        document.getElementById('time').textContent = 'Geolocation is not supported by this browser.';
    }
}

displayLocalTime();

// 