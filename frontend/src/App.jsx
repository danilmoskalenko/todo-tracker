import { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [editingTask, setEditingTask] = useState(null);
  const [refresh, setRefresh] = useState(0);

  // Функция обновить список задач после добавления/редактирования
  const handleSaved = () => {
    setEditingTask(null);
    setRefresh(r => r + 1);
  };

  return (
    <div>
      <TaskForm editingTask={editingTask} onSaved={handleSaved} />
      <TaskList key={refresh} onEdit={setEditingTask} />
    </div>
  );
}

export default App;
