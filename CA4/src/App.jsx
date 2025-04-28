import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('low');
  const [editingIndex, setEditingIndex] = useState(-1);

  const addTask = () => {
    if (taskName.trim() == '') return;

    const newTask = {
      name: taskName,
      priority,
      completed: false
    }

    if (editingIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = newTask;
      setTasks(updatedTasks);
      setEditingIndex(-1);
    } else {
      setTasks([...tasks, newTask]);
    }

    setTaskName('');
    setPriority('low');
  }

  const editingTask = (index) => {
    const taskToEdit = tasks[index];
    setTaskName(taskToEdit.name);
    setPriority(taskToEdit.priority);
    setEditingIndex(index);
  }

  const completedTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  const deleteTask = (index) => {
    const data = [...tasks];
    const filteredData = tasks.filter((e) => (e.name !== data[index].name));
    console.log(data[0].name);
    
    console.log(filteredData);
    
    setTasks(filteredData);
  }
  return (
    <>
      <div>
        <h1>Task Manager</h1>
        <input type="text" placeholder='task name' value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={addTask}>{editingIndex === -1 ? "Add Task" : "Update Task"}</button>

        <h2>Tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
              {task.name} - {task.priority}
              <button onClick={() => editingTask(index)}>Edit</button>
              <button onClick={() => completedTask(index)}>Completed</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
