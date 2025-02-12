document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('taskList');
  const addTaskForm = document.getElementById('addTaskForm');
  const newTaskInput = document.getElementById('newTaskInput');
  const addTaskButton = document.getElementById('addTaskButton');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function renderTasks(filter = 'all') {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
          if (filter === 'all' || (filter === 'pending' && !task.completed) || (filter === 'completed' && task.completed)) {
              const taskElement = document.createElement('div');
              taskElement.classList.add('task');
              if (task.completed) {
                  taskElement.classList.add('completed');
              }
              taskElement.innerHTML = `
                  <input type="checkbox" ${task.completed ? 'checked' : ''}>
                  <span>${task.text}</span>
                  <small>${task.date}</small>
              `;
              taskElement.querySelector('input').addEventListener('change', () => {
                  tasks[index].completed = !tasks[index].completed;
                  saveTasks();
                  renderTasks(filter);
              });
              taskList.appendChild(taskElement);
          }
      });
  }

  function addTask(text) {
      const date = new Date().toLocaleDateString();
      tasks.push({ text, completed: false, date });
      saveTasks();
      renderTasks();
  }

  addTaskButton.addEventListener('click', () => {
      const text = newTaskInput.value.trim();
      if (text) {
          addTask(text);
          newTaskInput.value = '';
          addTaskForm.classList.add('hidden');
      }
  });

  document.getElementById('pendientes').addEventListener('click', () => renderTasks('pending'));
  document.getElementById('cumplidas').addEventListener('click', () => renderTasks('completed'));
  document.getElementById('agregar').addEventListener('click', () => {
      addTaskForm.classList.toggle('hidden');
      newTaskInput.focus();
  });

  renderTasks();
});
