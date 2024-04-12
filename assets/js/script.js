const taskFormEl = $('#formTask');
const taskTitleEl = $('#task-title');
const taskDescEl = $('#task-desc');
const taskDateEl = $('#task-date');

// Retrieve tasks and nextId from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
// This makes an id that will be apart of the cards array.
function generateTaskId() {
    const newId = nextId;
    nextId++;
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return newId;
}

// this function is to send the items to localStorage.
function saveTasksToStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // this allows for a better way to see what it will look like on the page.
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

    // this checks if the task is done.
    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        // when the date is that same as the due date the card turns yellow and when its past due it will turn red but if it is in the done column it will be white.
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
    // checks to see if the array is empty.
    if (!tasks || tasks.length == 0) {
        return;
    }


    const todo = $('#todo-cards');
    todo.empty();

    const inProgress = $('#in-progress-cards');
    inProgress.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    // this checks for the status of the cards and appends them onto the same column.
    for (let task of tasks) {
        if (task.status === 'to-do') {
            todo.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgress.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task));
        }
    }

    // the draggable from bootstrap.
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    // this is for the array.
    const taskTitle = taskTitleEl.val().trim();
    const taskDesc = taskDescEl.val().trim();
    const taskDate = taskDateEl.val();

    // this is the array.
    const newTask = {
        id: generateTaskId(),
        title: taskTitle,
        description: taskDesc,
        dueDate: taskDate,
        status: 'to-do',
    };

    // tasks is the main array and newTask is being pushed to the end of that arrray.
    tasks.push(newTask);
    saveTasksToStorage(tasks);
    renderTaskList();

    // clears the form after we hit submit.
    taskTitleEl.val('');
    taskDescEl.val('');
    taskDateEl.val('');

    // this hides the modal when we click submit.
    $('#formModal').modal('hide');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(this).attr('data-task-id');
    // the filter is to make sure only the same id array is delted.
    tasks = tasks.filter(task => task.id !== parseInt(taskId));
    saveTasksToStorage(tasks);
    renderTaskList();
    // this is to delete the last card that is left.
    $(this).closest('.task-card').remove();
}

// Todo: create a function to handle dropping a task into a new status lane
// this array changes the status of the cards when we move them from a different column to match the status of the column they are now in.
function handleDrop(event, ui) {
    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.id;

    tasks.find(task => task.id === parseInt(taskId)).status = newStatus;

    saveTasksToStorage(tasks);
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // .on would not work so I gave up and used a .submit function instead.
    taskFormEl.submit(function(event) {
        event.preventDefault();
        handleAddTask(event);
    });

    // jquery datepicker.
    $("#task-date").datepicker({
        changeMonth: true,
        changeYear: true,

    });

    //jquery ui droppable widget
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });

    // when the page refreshes the cards will still apear on the page and wont disapear.
    renderTaskList();
});