const list = document.getElementById("list");
const newTask = document.getElementById("newTask");
const btnNewTask = document.getElementById("btnNewTask");


let todos = JSON.parse(localStorage.getItem("todolist"));
if( todos === null ) {
    todos = [];
}
refreshTodos();

btnNewTask.addEventListener('click', addNewTodoToArray);

function addNewTodoToArray() {
    if(newTask.value === '') {
        return;
    }

    let todoItem = {
        task: newTask.value,
        done: false
    };

    todos.push(todoItem);
    newTask.value = '';
    refreshTodos();
}


function refreshTodos() {
    localStorage.setItem("todolist", JSON.stringify(todos));
    list.innerHTML = '';
    for(let i = 0; i < todos.length ; i++) {
       
        addTodoToList(todos[i], i);
    }
}


function addTodoToList(todoItem, todoId) {
    const li = document.createElement("li");
    li.setAttribute('todo-id', todoId);
    li.className = 'list-group-item';

    const span = document.createElement("span");
    span.innerText = todoItem.task;
    span.className = 'col-2'
    
    const checkbox = document.createElement("input");
    checkbox.setAttribute('type', 'checkbox');
    checkbox.className = 'col-1';
    checkbox.onchange = toggleCheckbox;

    const dltIcon = document.createElement("i");
    dltIcon.className = 'fas fa-trash';
    const dltBtn = document.createElement('button');
    dltBtn.className = "btn btn-link col-1 red-color";
    dltBtn.appendChild(dltIcon);
    dltBtn.onclick = deleteTodo;

    const upIcon = document.createElement('i');
    upIcon.className = 'fa fa-chevron-up';
    const upBtn = document.createElement('button');
    upBtn.className = 'btn btn-link col-1';
    upBtn.appendChild(upIcon);
    upBtn.onclick = moveTodoUp;

    const downIcon = document.createElement('i');
    downIcon.className = 'fa fa-chevron-down';
    const downBtn = document.createElement('button');
    downBtn.className = 'btn btn-link col-1';
    downBtn.appendChild(downIcon);
    downBtn.onclick = moveTodoDown;

    if(todoItem.done) {
        checkbox.setAttribute('checked', true);
        span.style.textDecoration = 'line-through';
        span.style.color = 'green'
    }

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(dltBtn);
    if(todoId !==  0) {
        li.appendChild(upBtn);
    }
    if(todoId !== todos.length - 1) {
        li.appendChild(downBtn);
    }

    list.appendChild(li);
}

function toggleCheckbox(event) {
    const index = parseInt(event.target.parentElement.getAttribute('todo-id'));
    todos[index].done = !todos[index].done;
    refreshTodos();
}

function deleteTodo(event) {
    let deleteIndex = parseInt(event.target.parentElement.getAttribute('todo-id'));
    if(Number.isNaN(deleteIndex)){
        deleteIndex = parseInt(event.target.parentElement.parentElement.getAttribute('todo-id'))
    }
    
    const newTodos = [];
    for(let i=0 ; i<todos.length ; i++) {
        if(i !== deleteIndex) {
            newTodos.push(todos[i]);
        }
    }
    todos = newTodos;
    refreshTodos();
}

function moveTodoUp(event) {
    let upIndex = parseInt(event.target.parentElement.getAttribute('todo-id'));
    if(Number.isNaN(upIndex)){
        upIndex = parseInt(event.target.parentElement.parentElement.getAttribute('todo-id'))
    }

    if(upIndex !== 0) {
        swap(upIndex, upIndex - 1);
        refreshTodos();
    }
}

function moveTodoDown(event) {
    let downIndex = parseInt(event.target.parentElement.getAttribute('todo-id'));
    if(Number.isNaN(downIndex)){
        downIndex = parseInt(event.target.parentElement.parentElement.getAttribute('todo-id'))
    }
    
    if(downIndex !== todos.length - 1) {
        swap(downIndex, downIndex + 1);
        refreshTodos();
    }
}


function swap(index1, index2) {
    const todoAtIndex1 = todos[index1];
    const todoAtIndex2 = todos[index2];

    todos[index1] = todoAtIndex2;
    todos[index2] = todoAtIndex1;
}
