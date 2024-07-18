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

    // Append the circle to the new task
    newTodo.appendChild(circle);

    // Create a text node for the todo text and append it
    const todoTextSpan = document.createElement('span');
    todoTextSpan.textContent = todoText;
    newTodo.appendChild(todoTextSpan);
    
    //event listener to toggle the completed state on the text span
    circle.addEventListener('click', function() {
        circle.classList.toggle('completed');
        todoTextSpan.classList.toggle('completed-text');
    });

    // Create and style the delete button as an "X"
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    
    //event listener to delete the task on click
    deleteButton.addEventListener('click', function() {
        todoList.removeChild(newTodo);
    });
    
    
    newTodo.appendChild(deleteButton);
    todoList.appendChild(newTodo);
    
    todoInput.value = '';    
});
