const menuButton = document.getElementById("menu-button");
const newNoteButton = document.getElementById("new-note-button");
const editExitButton = document.getElementById("exit-edit-button");
const saveNoteButton = document.getElementById("save-note-button");


newNoteButton.addEventListener('click', () => document.getElementById("note-view").classList.remove('hidden'));
editExitButton.addEventListener('click', () => document.getElementById("note-view").classList.add('hidden'));
