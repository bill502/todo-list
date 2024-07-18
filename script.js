document.getElementById('add-todo').addEventListener('click', function() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value;

    if (todoText === '') {
        alert('Please enter a task');
        return;
    }

    const todoList = document.getElementById('todo-list');
    const newTodo = document.createElement('li');
    newTodo.textContent = todoText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        todoList.removeChild(newTodo);
    });

    newTodo.appendChild(deleteButton);
    todoList.appendChild(newTodo);

    todoInput.value = '';
});
