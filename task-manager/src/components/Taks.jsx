import { useState } from 'react';
import { db, auth } from '../firebase.config';
import { Trash2, PlusCircle } from 'lucide-react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]); // Update the UI immediately with the new task
      registerTasks(taskInput); // Register the task in Firestore
      setTaskInput(''); // Clear the input
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const registerTasks = async (task) => {
    const user = auth.currentUser;

    if (user) {
      const taskCollectionRef = collection(db, 'tasks');
      try {
        await addDoc(taskCollectionRef, {
          task, // Save the task input
          author: { name: user.displayName, id: user.uid },
          timestamp: Timestamp.now(), // Use Firestore's Timestamp for consistency
        });
        console.log('Task saved successfully');
      } catch (error) {
        console.error('Error saving task: ', error);
      }
    } else {
      console.error('No user signed in to save task');
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-2xl mx-auto bg-slate-950 text-white shadow-lg rounded-lg h-[80vh] flex flex-col">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Task Manager</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input 
          type="text" 
          value={taskInput} 
          onChange={(e) => setTaskInput(e.target.value)} 
          className="flex-grow p-3 rounded-lg bg-slate-800 text-white focus:outline-none text-lg"
          placeholder="Enter a task..."
        />
        <button 
          onClick={addTask} // Just call addTask since registerTasks is now inside it
          className="flex items-center gap-2 bg-blue-600 p-3 rounded-lg hover:bg-blue-500 text-lg mt-4 sm:mt-0"
        >
          <PlusCircle size={24} />
        </button>
      </div>
      
      <ul className="space-y-4 flex-grow overflow-auto">
        {tasks.map((task, index) => (
          <li 
            key={index} 
            className="flex justify-between items-center bg-slate-800 p-4 rounded-lg text-lg"
          >
            <span>{task}</span>
            <button onClick={() => deleteTask(index)} className="text-red-500 hover:text-red-400">
              <Trash2 size={24} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
