let selectedColor = '#FFDDC1'; // Default color

const colorButtons = document.querySelectorAll('.color-btn');

colorButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove 'selected' class from all buttons
        colorButtons.forEach(btn => btn.classList.remove('selected'));
        // Add 'selected' class to the clicked button
        button.classList.add('selected');
        // Set the selected color
        selectedColor = button.getAttribute('data-color');
    });
});

document.getElementById('add-todo').addEventListener('click', function() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value;

    if (todoText === '') {
        alert('Please enter a task');
        return;
    }

    const todoList = document.getElementById('todo-list');
    const newTodo = document.createElement('li');
    newTodo.classList.add('task', 'draggable');
    newTodo.setAttribute('draggable', true); // Make the task draggable

    // Create different shades of the color for the task
    const lighterColor = lightenColor(selectedColor, 0.7); // Lighten by 70%
    const darkerColor = lightenColor(selectedColor, -0.3); // Darken by 30%
    newTodo.style.borderColor = selectedColor; // Set the border color
    newTodo.style.backgroundColor = lighterColor; // Set the lighter background color
    newTodo.style.color = darkerColor; // Set the darker text color

    // Create the circle element
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.borderColor = darkerColor; // Set the border color of the circle

    // Append the circle to the new task
    newTodo.appendChild(circle);

    // Create a span for the todo text and append it
    const todoTextSpan = document.createElement('span');
    todoTextSpan.textContent = todoText;
    todoTextSpan.style.color = darkerColor; // Set the darker text color
    newTodo.appendChild(todoTextSpan);

    // Add event listener to toggle the completed state
    circle.addEventListener('click', function() {
        circle.classList.toggle('completed');
        todoTextSpan.classList.toggle('completed-text');
        if (circle.classList.contains('completed')) {
            circle.style.backgroundColor = darkerColor; // Fill color when completed
        } else {
            circle.style.backgroundColor = ''; // Reset fill color when not completed
        }
    });

    // Create and style the delete button as an "X"
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');

    // Add event listener to delete the task on click
    deleteButton.addEventListener('click', function() {
        todoList.removeChild(newTodo);
    });

    newTodo.appendChild(deleteButton);
    todoList.appendChild(newTodo);

    todoInput.value = '';

    // Add drag-and-drop event listeners
    addDragAndDropHandlers(newTodo);
});

// Drag-and-drop handlers
function addDragAndDropHandlers(task) {
    task.addEventListener('dragstart', handleDragStart);
    task.addEventListener('dragover', handleDragOver);
    task.addEventListener('drop', handleDrop);
    task.addEventListener('dragend', handleDragEnd);
}

let dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);

    this.classList.add('dragElem');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    this.classList.add('over');

    e.dataTransfer.dropEffect = 'move';

    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (dragSrcEl !== this) {
        this.parentNode.removeChild(dragSrcEl);
        let dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin', dropHTML);
        let dropElem = this.previousSibling;
        addDragAndDropHandlers(dropElem);

        // Reattach event listeners to the newly dropped element
        dropElem.querySelector('.circle').addEventListener('click', function() {
            dropElem.querySelector('.circle').classList.toggle('completed');
            dropElem.querySelector('span').classList.toggle('completed-text');
        });

        dropElem.querySelector('.delete-button').addEventListener('click', function() {
            dropElem.parentNode.removeChild(dropElem);
        });
    }

    this.classList.remove('over');
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('over');
    this.classList.remove('dragElem');
}

//color lighten function using HSL
function lightenColor(color, percent) {
    const f = parseInt(color.slice(1), 16),
          t = percent < 0 ? 0 : 255,
          p = percent < 0 ? percent * -1 : percent,
          R = f >> 16,
          G = (f >> 8) & 0x00FF,
          B = f & 0x0000FF;
    return `#${(0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1).toUpperCase()}`;
}
