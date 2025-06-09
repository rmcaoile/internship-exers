import React, { useState } from 'react';
import './App.css';
function App() {
 const [task, setTask] = useState('');
 const [tasks, setTasks] = useState([]);
 const handleAdd = () => {
   if (task.trim() === '') return;
   setTasks([...tasks, task]);
   setTask('');
 };
 const handleDelete = (index) => {
   const newTasks = tasks.filter((_, i) => i !== index);
   setTasks(newTasks);
 };
 return (
   <div className="App">
     <h1>To-Do App</h1>
     <input
       type="text"
       placeholder="Enter a task"
       value={task}
       onChange={(e) => setTask(e.target.value)}
     />
     <button onClick={handleAdd}>Add Task</button>


     <ul>
       {tasks.map((t, i) => (
         <li key={i}>
           {t} <button onClick={() => handleDelete(i)}>Delete</button>
         </li>
       ))}
     </ul>
   </div>
 );
}
export default App;
