import { useState } from 'react'
import tasksServices from './services/tasksServices'

function AddNewTask({ tasks, setTasks,categories }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const handleClick = () => {
    setMenuOpen(!menuOpen)
  }
  const handleNewTask = async () => {
    const newTask = {
      category: selectedCategory,
      title: newTaskTitle,
      description: newTaskDescription,
    }

    try {
      const response = await tasksServices.create(newTask)
      const category = categories.find(cat=> cat._id === selectedCategory)
      console.log(category)

      setTasks(prevTasks => [...prevTasks, {...response, category}])
      console.log(tasks)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <button onClick={handleClick}>Create a new task</button>
      {menuOpen && (
        <div style={{ marginTop: '25px' }}>
          <input
            type="text"
            placeholder="Enter task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter task description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />

          <br />
          <br />
          {categories.length > 0 && (
            <CategoryCardDrop
              categories={categories}
              setSelectedCategory={setSelectedCategory}
            />
          )}
          <br />
          <button onClick={handleNewTask}>Save changes</button>
        </div>
      )}
      <br />
    </div>
  )
}

const CategoryCardDrop = ({ categories, setSelectedCategory }) => {
  const handleSelectedOption = (e) => {
    setSelectedCategory(e.target.value)
  }
  return (
    <div>
      <select
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
  )
}
export default AddNewTask
