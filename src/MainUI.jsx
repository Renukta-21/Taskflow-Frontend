import { useState } from 'react'
import AddNewTask from './AddNewTask'
import Categories from './Categories'
import Tasks from './Tasks'

function MainUI({ user }) {
    const [categories, setCategories] = useState([])
    const [tasks, setTasks] = useState([])

  return (
    <div style={{ display: 'flex', gap: '100px' }}>
      <Categories categories={categories} setCategories={setCategories}/>
      <div>
        <h3>
          {getGreeting()}{' '}
          <p style={{ color: 'blue', display: 'inline' }}>{user.username}</p>
        </h3>
        <h4>{getFormattedDate()}</h4>
        <Tasks tasks={tasks} setTasks={setTasks}/>
        <AddNewTask categories={categories} setCategories={setCategories}/>
      </div>
    </div>
  )
}
const getFormattedDate = () => {
  const today = new Date()
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(today)
  return `Today, ${formattedDate}`
}

const getGreeting = () => {
  const currentHour = new Date().getHours()
  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning'
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Good Afternoon'
  } else {
    return 'Good Evening'
  }
}

export default MainUI
