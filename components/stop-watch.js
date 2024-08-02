//COMPONENT TABS
const alarmTab = document.getElementById('alarm-tab');
const stopWatchTab = document.getElementById('stopwatch-tab');
const timerTab = document.getElementById('timer-tab');
const clockEl = document.getElementById('clock');
const alarmsEl = document.getElementById('alarm-clock');
const stopWatchEl = document.getElementById('stop-watch-container');


function showAlarm() { 
    alarmsEl.classList.remove('hidden');
    stopWatchEl.classList.add('hidden');
    //timer
}

function showStopWatch() { 
    alarmsEl.classList.add('hidden');
    stopWatchEl.classList.remove('hidden');
    // timer
}

alarmTab.addEventListener('click', showAlarm);
stopWatchTab.addEventListener('click', showStopWatch);


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

// STOP-WATCH

let stopWatchInterval;
let seconds = 0;

function updateStopWatch() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    document.getElementById('stop-watch').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startStopWatch() {
    if (!stopWatchInterval) {
        stopWatchInterval = setInterval(() => {
            seconds++;
            updateStopWatch();
        }, 1000);
    }
}

function stopStopWatch() {
    if (stopWatchInterval) {
        clearInterval(stopWatchInterval);
        stopWatchInterval = null;
    }
}

function resetStopWatch() {
    stopStopWatch();
    seconds = 0;
    updateStopWatch();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', startStopWatch);
    document.getElementById('stop-button').addEventListener('click', stopStopWatch);
    document.getElementById('reset-button').addEventListener('click', resetStopWatch);
});

//ALARM-CLOCK
const currentTimeDisplay = document.getElementById('current-time');
const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmButton = document.getElementById('set-alarm');
const alarmList = document.getElementById('alarm-list');
const alarmStatus = document.getElementById('alarm-status');
const editModal = document.getElementById('edit-modal');
const editTimeInput = document.getElementById('edit-time');
const saveEditButton = document.getElementById('save-edit');
const cancelEditButton = document.getElementById('cancel-edit');
const newAlarmButton = document.getElementById('new-alarm');

let alarms = [];
let editingIndex = null;

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    alarms.forEach(alarm => {
        const [alarmHours, alarmMinutes] = alarm.time.split(':');
        if (hours === alarmHours && minutes === alarmMinutes) {
            alarmStatus.textContent = `Alarm ringing for ${alarm.time}!`;
            new Audio('/audio/alarm.mp3').play();
        }
    });
}

function showAdd(){ 
    document.getElementById('alarm-settings').classList.remove('hidden');
}

function addAlarm(time) {
    alarms.push({ time });
    updateAlarmList();
    document.getElementById('alarm-settings').classList.add('hidden');
}

function updateAlarmList() {
    alarmList.innerHTML = '';
    alarms.forEach((alarm, index) => {
        const li = document.createElement('li');
        li.className = 'alarm-item';
        li.innerHTML = `
            ${alarm.time}
            <button onclick="showEditModal(${index})">Edit</button>
            <button onclick="deleteAlarm(${index})">Delete</button>
        `;
        alarmList.appendChild(li);
    });
}

function showEditModal(index) {
    editingIndex = index;
    editTimeInput.value = alarms[index].time;
    editModal.classList.remove('hidden');
}

function hideEditModal() {
    editModal.classList.add('hidden');
}

function editAlarm() {
    const newTime = editTimeInput.value;
    if (newTime) {
        alarms[editingIndex].time = newTime;
        updateAlarmList();
        hideEditModal();
    }
}

function deleteAlarm(index) {
    alarms.splice(index, 1);
    updateAlarmList();
}

setAlarmButton.addEventListener('click', () => {
    const time = alarmTimeInput.value;
    if (time) {
        addAlarm(time);
    }
});

saveEditButton.addEventListener('click', editAlarm);
cancelEditButton.addEventListener('click', hideEditModal);
newAlarmButton.addEventListener('click', showAdd);

setInterval(updateTime, 1000);

window.showEditModal = showEditModal;
window.deleteAlarm = deleteAlarm;

// TIMER