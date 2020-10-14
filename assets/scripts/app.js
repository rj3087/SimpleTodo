const topContent = document.querySelector('.top-content');
const inputTask = document.querySelector('.task-input');
const addBtn = document.querySelector('.add-task');
const todoList = document.querySelector('.todo-list');

//Event Listeners
inputTask.addEventListener('click', addBtnEventClick);
inputTask.addEventListener('keyup', addBtnEventType);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', checkCompleteDeleteTodo);
let todoNo = 1;


//Functions
function addBtnEventClick() {
    if (inputTask.value.length === 0) {
        addBtn.style.backgroundColor = '#F0F0F0';
    }
}
function addBtnEventType() {
    if (inputTask.value.length === 0) {
        addBtn.style.backgroundColor = '#F0F0F0';
    } else {
        addBtn.style.backgroundColor = '#52A6FA';
    }
}

function createTodoItem() {
    var todoNoIncrement = todoNo++;

    if (inputTask.value.length !== 0) {
        const createTodoItem = document.createElement('li')
        createTodoItem.classList.add('task-item');
        todoList.appendChild(createTodoItem);

        const completeTodoItem = document.createElement('input');
        completeTodoItem.type = 'checkbox';
        completeTodoItem.id = `complete-todo-${todoNoIncrement}`;
        completeTodoItem.classList.add('complete-todo');
        createTodoItem.appendChild(completeTodoItem);

        const completeTodoItemLabel = document.createElement('label');
        completeTodoItemLabel.htmlFor = `complete-todo-${todoNoIncrement}`;
        completeTodoItemLabel.classList.add('complete-todo');
        createTodoItem.appendChild(completeTodoItemLabel);

        const todoItemDesc = document.createElement('p');
        todoItemDesc.classList.add('todo-desc');
        todoItemDesc.textContent = inputTask.value;
        createTodoItem.appendChild(todoItemDesc);

        const deleteTodoItem = document.createElement('input');
        deleteTodoItem.type = 'checkbox';
        deleteTodoItem.id = `delete-todo-${todoNoIncrement}`;
        deleteTodoItem.classList.add('delete-todo');
        createTodoItem.appendChild(deleteTodoItem);

        const deleteTodoItemLabel = document.createElement('label');
        deleteTodoItemLabel.htmlFor = `delete-todo-${todoNoIncrement}`;
        deleteTodoItemLabel.classList.add('delete-todo');
        createTodoItem.appendChild(deleteTodoItemLabel);

        topContent.style.borderBottom = '1px solid #E8E8E8';
        inputTask.value = '';
    }
}

function addTodo(e) {
    e.preventDefault();
    var todoList = createTodoItem();
}

function checkCompleteDeleteTodo(e) {
    const todoItemElement = e.target;
    console.log(todoItemElement);
    if (todoItemElement.classList[0] === 'complete-todo') {
        todoItemElement.addEventListener('change', () => {
            if (todoItemElement.checked) {
                todoItemElement.nextElementSibling.nextElementSibling.style.setProperty('--strike--display', 'scaleX(1)');
                todoItemElement.parentNode.classList.add('completed');
                document.querySelector('.delete-todo').checked = true;
                todoItemElement.parentNode.lastElementChild.style.setProperty('transform', 'scale(1)');
            } else {
                todoItemElement.nextElementSibling.nextElementSibling.style.setProperty('--strike--display', 'scaleX(0)');
                todoItemElement.parentNode.classList.remove('completed');
                todoItemElement.parentNode.lastElementChild.style.setProperty('transform', 'scale(0)');
            }
        });
    } else if (todoItemElement.classList[0] === 'delete-todo') {
        todoItemElement.parentNode.remove();
    }
}