import { useEffect, useState } from 'react';

function TaskList({ onEdit }) {
  const [tasks, setTasks] = useState([]);

  // Получаем список задач при загрузке
  useEffect(() => {
    fetch('http://localhost:8081/tasks')
      .then(res => res.json())
      .then(setTasks);
  }, []);

  // Удалить задачу
  const handleDelete = (id) => {
    fetch(`http://localhost:8081/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks(tasks => tasks.filter(task => task.id !== id)));
  };

  // Пометить задачу как выполненную
  const handleDone = (task) => {
    fetch(`http://localhost:8081/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, done: true }),
    })
    .then(() => setTasks(tasks => tasks.map(t => t.id === task.id ? { ...t, done: true } : t)));
  };

  return (
    <div>
      <h2>Задачи</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <b>{task.title}</b> — {task.description} [{task.done ? "✔" : "❌"}]
            <button onClick={() => handleDelete(task.id)}>Удалить</button>
            {!task.done && <button onClick={() => handleDone(task)}>Выполнено</button>}
            <button onClick={() => onEdit(task)}>Редактировать</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
