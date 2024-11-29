import { useState } from 'react';
import tasksServices from './services/tasksServices';

function AddNewTask({ tasks, setTasks, categories, showGuide, setShowGuide }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleClick = () => {
    setShowGuide(false)
    setMenuOpen(!menuOpen);
  };

  const handleNewTask = async () => {
    const newTask = {
      category: selectedCategory,
      title: newTaskTitle,
      description: newTaskDescription,
    };

    try {
      const response = await tasksServices.create(newTask);
      const category = categories.find(cat => cat._id === selectedCategory);
      console.log(category);

      setTasks(prevTasks => [...prevTasks, { ...response, category }]);
      console.log(tasks);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={` ml-60 ${showGuide ? 'absolute bottom-28 z-20' : 'relative'}`}>
      <button
        onClick={handleClick}
        className="bg-black text-white py-2 w-[400px] rounded-lg"
      >
        {menuOpen ? 'Cancel' : 'Create a new task'}
      </button>
      <div
        className={`absolute -top-[280px] w-[400px] flex flex-col transition-all duration-500 bg-white p-5 rounded-xl ${
          menuOpen ? '' : 'opacity-0 translate-y-5 pointer-events-none'
        }`}
      >
        <input
          type="text"
          placeholder="Enter task title"
          value={newTaskTitle}
          className="newtaskInput bg-gray-300"
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter task description"
          value={newTaskDescription}
          className="newtaskInput border border-gray-300"
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        {categories.length > 0 && (
          <CategoryCardDrop
            categories={categories}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        <br />
        <button
          onClick={handleNewTask}
          className="py-2 bg-blue-700 text-white rounded-lg"
        >
          Save changes
        </button>
      </div>
      <br />
    </div>
  );
}

const CategoryCardDrop = ({ categories, setSelectedCategory }) => {
  const handleSelectedOption = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <select
        className="w-full outline-none border border-gray-300 py-2 rounded-lg px-3"
        name=""
        id=""
        onChange={handleSelectedOption}
        defaultValue="default"
      >
        <option value="default" disabled>
          Select a category
        </option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name} {cat.icon}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddNewTask;
