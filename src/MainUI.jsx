import { useState } from 'react'
import AddNewTask from './AddNewTask'
import Categories from './Categories'
import Tasks from './Tasks'

function MainUI({ user }) {
  const [categories, setCategories] = useState([])
  const [tasks, setTasks] = useState([])
  const [visibleTasks, setVisibleTasks] = useState(null)

  const handleVisibleTasks = (categoryName) => {
    setVisibleTasks(categoryName)
  }
  return (
    <div className=' min-h-screen w-full bg-back-gray'>
        <div className='mx-16 my-16 flex bg-main-gray border'>
      <Categories
        tasks={tasks}
        setTasks={setTasks}
        categories={categories}
        setCategories={setCategories}
        setVisibleTasks={setVisibleTasks}
        handleVisibleTasks={handleVisibleTasks}
      />
      <div className='flex  flex-col justify-between py-8 px-5'>
        <div style={{ display: 'flex' }}>
          <h3>
            {getGreeting()}{' '}
            <p style={{ color: 'blue', display: 'inline' }}>{user.username}</p>
          </h3>
          {/* <button style={{ marginLeft: '500px' }}>Filter tasks</button> */}
          <h4>{getFormattedDate()}</h4>
          <Tasks tasks={tasks} setTasks={setTasks} visibleTasks={visibleTasks} />
        </div>
        <AddNewTask
        tasks={tasks}
          setTasks={setTasks}
          categories={categories}
          setCategories={setCategories}
        />
      </div>
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
