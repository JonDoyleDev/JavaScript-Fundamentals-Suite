const calendar = document.getElementById('calendar');
const noteInput = document.getElementById('note-input');
const saveNoteBtn = document.getElementById('save-note');
let currentDate;

// Initialize the calendar
function initCalendar() {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('day');
        calendar.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = day;

        const notesDiv = document.createElement('div');
        notesDiv.classList.add('notes');
        notesDiv.id = `note-${day}`;
        notesDiv.textContent = getNoteForDay(day) || '';
        dayDiv.appendChild(notesDiv);

        dayDiv.addEventListener('click', () => {
            currentDate = day;
            noteInput.value = getNoteForDay(day) || '';
        });

        calendar.appendChild(dayDiv);
    }
}

// Save note for the current date
function saveNote() {
    if (currentDate === undefined) return;

    const noteText = noteInput.value;
    localStorage.setItem(`note-${currentDate}`, noteText);
    document.getElementById(`note-${currentDate}`).textContent = noteText;
}

// Retrieve note for a specific day
function getNoteForDay(day) {
    return localStorage.getItem(`note-${day}`) || '';
}

// Add event listener to the Save button
saveNoteBtn.addEventListener('click', saveNote);

// Initialize the calendar when the page loads
document.addEventListener('DOMContentLoaded', initCalendar);
