const apiUrl = 'URL_DEL_BACKEND'; // Reemplaza con la URL real del backend

const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDescriptionInput = document.getElementById('task-description');

// Función para cargar y mostrar las tareas desde el backend
async function loadTasks() {
  const response = await fetch(`${apiUrl}/getTasks`);
  const tasks = await response.json();

  taskList.innerHTML = '';
  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${task.name}</strong>: ${task.description} <button onclick="editTask(${task.id})">Editar</button> <button onclick="deleteTask(${task.id})">Eliminar</button>`;
    taskList.appendChild(listItem);
  });
}

// Función para agregar una nueva tarea
async function addTask(event) {
  event.preventDefault();

  const name = taskNameInput.value;
  const description = taskDescriptionInput.value;

  const response = await fetch(`${apiUrl}/addTask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description }),
  });

  if (response.ok) {
    loadTasks();
    taskNameInput.value = '';
    taskDescriptionInput.value = '';
  } else {
    console.error('Error al agregar la tarea.');
  }
}

// Función para editar una tarea
function editTask(id) {
  // Implementa la lógica de edición según tus necesidades
  console.log(`Editar tarea con ID ${id}`);
}

// Función para eliminar una tarea
async function deleteTask(id) {
  const response = await fetch(`${apiUrl}/deleteTask?id=${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    loadTasks();
  } else {
    console.error('Error al eliminar la tarea.');
  }
}

// Carga las tareas al cargar la página
loadTasks();

// Escucha el evento de envío del formulario
taskForm.addEventListener('submit', addTask);