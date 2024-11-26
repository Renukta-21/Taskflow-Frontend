import { useState } from 'react'

function AddNewTask({ categories, setCategories }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const handleClick = () => {
    setMenuOpen(!menuOpen)
  }
  const handleNewTask = () => {
    console.log(newTaskDescription)
    console.log(selectedCategory)
  }
  return (
    <div>
      <button onClick={handleClick}>Create a new task</button>
      {menuOpen && (
        <div style={{ marginTop: '25px' }}>
          <input
            type="text"
            placeholder="Enter new Task"
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
      <select name="" id="" onChange={handleSelectedOption} defaultValue='default'>
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
