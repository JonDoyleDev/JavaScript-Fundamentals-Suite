document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('month-year');
    const daysContainer = document.getElementById('days');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    let date = new Date();
    
    function renderCalendar() {
        date.setDate(1);
        
        const month = date.getMonth();
        const year = date.getFullYear();
        
        monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
        
        const firstDayIndex = date.getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        const prevLastDay = new Date(year, month, 0).getDate();
        
        const nextDays = 7 - new Date(year, month + 1, 0).getDay() - 1;
        
        daysContainer.innerHTML = '';
        
        for (let x = firstDayIndex; x > 0; x--) {
            daysContainer.innerHTML += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
        }
        
        for (let i = 1; i <= lastDay; i++) {
            if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
                daysContainer.innerHTML += `<div class="today">${i}</div>`;
            } else {
                daysContainer.innerHTML += `<div>${i}</div>`;
            }
        }
        
        for (let j = 1; j <= nextDays; j++) {
            daysContainer.innerHTML += `<div class="next-date">${j}</div>`;
        }
    }
    
    prevBtn.addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    });
    
    nextBtn.addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });
    
    renderCalendar();
});
