import { useState, useEffect } from 'react';

function TaskForm({ editingTask, onSaved }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Если редактируем — заполняем форму данными
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  // Сохранить задачу
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingTask ? 'PUT' : 'POST';
    const url = editingTask 
      ? `http://localhost:8081/tasks/${editingTask.id}` 
      : 'http://localhost:8081/tasks';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, done: editingTask ? editingTask.done : false }),
    })
      .then(() => {
        onSaved();  // Сообщаем, что задача сохранена (обновить список)
        setTitle('');
        setDescription('');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingTask ? 'Редактировать' : 'Добавить'} задачу</h2>
      <input 
        placeholder="Название" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        required 
      />
      <input 
        placeholder="Описание" 
        value={description} 
        onChange={e => setDescription(e.target.value)} 
      />
      <button type="submit">{editingTask ? 'Сохранить' : 'Добавить'}</button>
    </form>
  );
}

export default TaskForm;
