// Task Manager and Timer Logic

const taskList = document.getElementById('task-list');
const taskModal = document.getElementById('task-modal');
const addTaskBtn = document.getElementById('add-task-btn');
const saveTaskBtn = document.getElementById('save-task');
const closeModalBtn = document.getElementById('close-modal');
const startTimerBtn = document.getElementById('start-timer');
const timerMinutes = document.getElementById('timer-minutes');
const timerSeconds = document.getElementById('timer-seconds');

let tasks = [];
let timerInterval;

// Show modal to add a new task
addTaskBtn.addEventListener('click', () => {
    taskModal.style.display = 'flex';
});

// Close the modal
closeModalBtn.addEventListener('click', () => {
    taskModal.style.display = 'none';
});

// Save a new task
saveTaskBtn.addEventListener('click', () => {
    const taskName = document.getElementById('task-name').value;
    const taskDuration = document.getElementById('task-duration').value;
    const taskPriority = document.getElementById('task-priority').value;

    if (taskName && taskDuration) {
        const task = {
            name: taskName,
            duration: taskDuration,
            priority: taskPriority
        };

        tasks.push(task);
        displayTasks();
        taskModal.style.display = 'none';
    }
});

// Display tasks in the list
function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <p>${task.name} (${task.duration} mins) - Priority: ${task.priority}</p>
            <button class="btn" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

// Pomodoro Timer Logic
let isTimerRunning = false;
let timeRemaining = 25 * 60;

startTimerBtn.addEventListener('click', () => {
    if (!isTimerRunning) {
        startTimer();
    } else {
        stopTimer();
    }
});

// Start the timer
function startTimer() {
    isTimerRunning = true;
    startTimerBtn.textContent = 'Stop Timer';

    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
        } else {
            stopTimer();
            alert('Time is up! Take a break.');
        }
    }, 1000);
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    startTimerBtn.textContent = 'Start Timer';
}

// Update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
    timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
}

