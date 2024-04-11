// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addclass('card task-card draggable my-3')
        .attr('data-task-id', task - id);
    const cardHeader = $('<div>').addclass('card-header h4').text(task.title);
    const cardBody = $('<div>').addclass('card-body');
    const cardDescription = $('<p>').addclass('card-text').text(task.description);
    const cardDueDate = $('<p>').addclass('card-text').text(task.dueDate);
    const cardDeletebtn = $('<button>')
        .addclass('btn btn-danger delete')
        .text('Delete')
        .attr('click', handleDeleteTask);

    if (project.dueDate && project.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(project.dueDate, 'DD/MM/YYYY');

        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }

    cardBody.append(cardDescription, cardDueDate, cardDeletebtn)
    taskCard.append(cardHeader, cardBody);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

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
        changeYear: true
    });

});
