import { useState } from 'react';
import { db, auth } from '../firebase.config';
import { Trash2, PlusCircle } from 'lucide-react';
import { addDoc, collection, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { format, addDays } from 'date-fns';

function getRandomDueDate() {
  return addDays(new Date(), Math.floor(Math.random() * 7) + 1); // Random date in 1-7 days
}

const categoriesList = ['Work', 'Personal', 'School', 'Errands', 'Other'];

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoriesList[0]); // Default category
  const [categories, setCategories] = useState({});

  const addTask = async () => {
    if (taskInput.trim() === '') return;

    const user = auth.currentUser;
    if (!user) {
      console.error('No user signed in');
      return;
    }

    const dueDate = getRandomDueDate();
    const newTask = { id: Date.now(), task: taskInput, dueDate, category: selectedCategory };

    setTasks([...tasks, newTask]);

    // Categorize task
    setCategories((prev) => ({
      ...prev,
      [selectedCategory]: [...(prev[selectedCategory] || []), newTask],
    }));

    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        task: taskInput,
        dueDate: Timestamp.fromDate(dueDate), // Store in Firestore
        category: selectedCategory,
        author: { name: user.displayName, id: user.uid },
        timestamp: Timestamp.now(),
      });

      newTask.id = docRef.id;
      setTasks((prev) => prev.map((t) => (t.id === Date.now() ? { ...t, id: docRef.id } : t)));
    } catch (error) {
      console.error('Error saving task: ', error);
    }

    setTaskInput('');
  };

  const deleteTask = async (taskId, category) => {
    setTasks(tasks.filter((task) => task.id !== taskId));

    // Remove from categories
    setCategories((prev) => {
      const newCategories = { ...prev };
      newCategories[category] = newCategories[category].filter((task) => task.id !== taskId);
      return newCategories;
    });

    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
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

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 rounded-lg bg-slate-800 text-white focus:outline-none text-lg"
        >
          {categoriesList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button
          onClick={addTask}
          className="flex items-center gap-2 bg-blue-600 p-3 rounded-lg hover:bg-blue-500 text-lg mt-4 sm:mt-0"
        >
          <PlusCircle size={24} />
        </button>
      </div>

      <div className="flex-grow overflow-auto">
        {Object.keys(categories).map((category) => (
          <div key={category} className="mb-6">
            <h2 className="text-xl font-semibold mb-3">{category}</h2>
            <ul className="space-y-4">
              {categories[category].map((task) => (
                <li key={task.id} className="flex justify-between items-center bg-slate-800 p-4 rounded-lg text-lg">
                  <div>
                    <span>{task.task}</span>
                    <div className="text-sm text-gray-400">Due: {format(task.dueDate, 'PP')}</div>
                  </div>
                  <button onClick={() => deleteTask(task.id, category)} className="text-red-500 hover:text-red-400">
                    <Trash2 size={24} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
