const taskFormEl = $('#formTask');
const taskTitleEl = $('#task-title');
const taskDescEl = $('#task-desc');
const taskDateEl = $('#task-date');

// Retrieve tasks and nextId from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const newId = nextId;
    nextId++;
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return newId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $(`
        <div class="card task-card draggable my-3" data-task-id="${task.id}">
            <div class="card-header h4">${task.title}</div>
            <div class="card-body">
                <p class="card-text">${task.description}</p>
                <p class="card-text">${task.dueDate}</p>
                <button class="btn btn-danger border-light delete" data-task-id="${task.id}">Delete</button>
            </div>
        </div>
    `);

    taskCard.find('.delete').on('click', handleDeleteTask);

    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
        }
    }

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList(event) {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $("#task-date").datepicker({
        changeMonth: true,
        changeYear: true,

    });
});