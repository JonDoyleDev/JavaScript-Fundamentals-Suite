const menuButton = document.getElementById("menu-button");
const newNoteButton = document.getElementById("new-note-button");
const editExitButton = document.getElementById("exit-edit-button");
const saveNoteButton = document.getElementById("save-note-button");
const noteList = document.getElementById('list-item');
const popupContainer = document.getElementById('note-view');
const overlay = document.getElementById('overlay');

let currentNote = null;

editExitButton.addEventListener('click', () => closeNoteEditor());
newNoteButton.addEventListener('click', () => openNoteEditor());
saveNoteButton.addEventListener('click', () => saveNote());

function openNoteEditor(note = null) {
    currentNote = note;
    document.getElementById("note-view").classList.remove('hidden');
    document.getElementById('note-title-input').value = note ? note.title : '';
    document.getElementById('note-editor').value = note ? note.text : '';
    document.getElementById('overlay').classList.remove('hidden');
}

function closeNoteEditor() {
    document.getElementById('note-view').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
    currentNote = null;
}

function saveNote() {
    const noteTitle = document.getElementById('note-title-input').value;
    const noteText = document.getElementById('note-editor').value;
    if (noteTitle.trim() === '' || noteText.trim() === '') return;

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    if (currentNote) {
        const index = notes.findIndex(n => n.id === currentNote.id);
        notes[index].title = noteTitle;
        notes[index].text = noteText;
    } else {
        const newNote = {
            id: new Date().getTime(),
            title: noteTitle,
            text: noteText
        };
        notes.push(newNote);
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    document.getElementById('note-title-input').value = '';
    document.getElementById('note-editor').value = '';
    closeNoteEditor();
    displayNotes();
}

function displayNotes() {
    noteList.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span class="note-title">${note.title}</span>
        <div id="noteBtns-container">
            <button id="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>
            <button id="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        noteList.appendChild(listItem);
    });
}

function editNote(id) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes.find(n => n.id === id);
    if (note) openNoteEditor(note);
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

window.onload = displayNotes;

function openIndexPage() {
    window.location.href = '/index.html';
}