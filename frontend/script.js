// Dockerized setup
const apiUrl = 'https://todo-cedl.onrender.com/todos';
const baseUrl = 'http://localhost:8080/todos';// Adjust based on Docker or local setup
function fetchTodos() {
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        data.forEach(todo => {
          const todoItem = document.createElement('div');
          todoItem.classList.add('todo-item');
          todoItem.innerHTML = `
            <span>${todo.task} - ${todo.completed ? 'Completed' : 'Not Completed'}</span>
            <span class="priority-label" style="background-color: ${getPriorityColor(todo.priority)}">${todo.priority}</span>
            <div>
              <button class="update" onclick="updateTodo(${todo.id})">Mark as Completed</button>
              <button class="delete" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
          `;
          todoList.appendChild(todoItem);
        });
      })
      .catch(error => console.error("Error fetching todos:", error));
  }


// Function to get the color based on priority
function getPriorityColor(priority) {
  switch (priority) {
    case 'HIGH': return 'red';
    case 'MEDIUM': return 'yellow';
    case 'LOW': return 'green';
    default: return 'gray';
  }
}

// Speech Recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';

// Check if Speech Recognition is supported
if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
  alert('Sorry, your browser does not support Speech Recognition. Please use Google Chrome.');
} else {
  // Start listening on button click
  document.getElementById('voice-btn').addEventListener('click', () => {
    recognition.start();
    console.log('Listening...');
  });

  recognition.onstart = () => {
    console.log('Speech recognition started...');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim();
    console.log('Recognized Text:', transcript);
    // Process the recognized text (e.g., Add task to the list)
    addTodoFromVoice(transcript);
  };

  recognition.onerror = (event) => {
    console.error('Speech Recognition Error:', event.error);
  };
}

// Function to add todo from voice command
function addTodoFromVoice(transcript) {
  const prioritySelect = document.getElementById('priority');
  let task = transcript;

  // Parse the transcript for priority (e.g., "Add high priority task")
  if (transcript.toLowerCase().includes('low')) {
    prioritySelect.value = 'LOW';
    task = transcript.replace('low', '').trim();
  } else if (transcript.toLowerCase().includes('medium')) {
    prioritySelect.value = 'MEDIUM';
    task = transcript.replace('medium', '').trim();
  } else if (transcript.toLowerCase().includes('high')) {
    prioritySelect.value = 'HIGH';
    task = transcript.replace('high', '').trim();
  }

  const priority = prioritySelect.value;

  // API call to add the task to the database
  fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task, completed: false, priority }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add task to the database.');
      }
      return response.json();
    })
    .then(() => {
      fetchTodos(); // Refresh the task list
    })
    .catch(error => console.error('Error adding task from voice:', error));
}

// Function to add task to the to-do list(via text box)
document.getElementById('add-todo-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const newTask = document.getElementById('new-task').value;
  const priority = document.getElementById('priority').value;

  // POST request to backend
  fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: newTask, completed: false, priority: priority })
  })
    .then(response => response.json())
    .then(() => {
      fetchTodos(); // Refresh the list after adding
      document.getElementById('add-todo-form').reset();
    })
    .catch(error => console.error("Error adding todo:", error));
});


// Mark a task as completed
function markAsCompleted(event) {
  const todoItem = event.target.closest('.todo-item');
  todoItem.querySelector('span').style.textDecoration = 'line-through';
}

// Delete a to-do
function deleteTodo(id) {
  fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  })
    .then(() => fetchTodos()) // Refresh the list after deletion
    .catch(error => console.error("Error deleting todo:", error));
}

 fetchTodos();

// Mark a task as completed
function updateTodo(id) {
  fetch(`${baseUrl}/${id}`)
    .then(response => response.json())
    .then(todo => {
      fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...todo, completed: true })
      })
        .then(() => fetchTodos())
        .catch(error => console.error("Error updating todo:", error));
    })
    .catch(error => console.error("Error fetching todo for update:", error));
}

fetchTodos();