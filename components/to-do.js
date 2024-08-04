const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-task-button');
const toDoList = document.getElementById('to-do-list');

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return; 
    }

    const li = document.createElement('li');

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    taskContent.classList.add('task-content');
    taskContent.setAttribute('contenteditable', 'true');

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.className = 'complete-btn';
    completeButton.addEventListener('click', function () {
        li.classList.toggle('completed');
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {e
        const isEditable = taskContent.isContentEditable;
        taskContent.contentEditable = !isEditable;
        editButton.textContent = isEditable ? 'Edit' : 'Save';
        if (isEditable) {
            taskContent.blur();
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function () {
        toDoList.removeChild(li);
    });

    li.appendChild(taskContent);
    li.appendChild(completeButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    toDoList.appendChild(li);
    taskInput.value = '';
}

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function openIndexPage() {
    window.location.href = '/index.html';
}