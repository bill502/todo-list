document.getElementById('add-todo').addEventListener('click', function() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value;

    if (todoText === '') {
        alert('Please enter a task');
        return;
    }

    const todoList = document.getElementById('todo-list');
    const newTodo = document.createElement('li');
    newTodo.classList.add('task');

    // Create the circle element
    const circle = document.createElement('div');
    circle.classList.add('circle');

    // Add event listener to toggle the completed state
    circle.addEventListener('click', function() {
        circle.classList.toggle('completed');
    });

    // Append the circle to the new task
    newTodo.appendChild(circle);

    // Create a text node for the todo text and append it
    const todoTextNode = document.createTextNode(todoText);
    newTodo.appendChild(todoTextNode);

    newTodo.addEventListener('click', function() {
        newTodo.classList.toggle('completed');
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        todoList.removeChild(newTodo);
    });
    
    newTodo.appendChild(deleteButton);
    todoList.appendChild(newTodo);
    
    todoInput.value = '';    
});
