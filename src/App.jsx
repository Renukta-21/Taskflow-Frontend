import { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import MainUI from './MainUI'
import './index.css'
import categoriesService from './services/categoriesService'

function App() {
  const [user, setUser] = useState(null)
  const [userFirstLogin, setUserFirstLogin] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)
  const calculateTasksPerCategory = (categories) => {
    return categories.map((category) => {
      return {
        ...category,
        taskCount: category.tasks.length,
      }
    })
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await categoriesService.getAll()
        const categoriesWithTaskCount = calculateTasksPerCategory(response)
        setCategories(categoriesWithTaskCount)
        setError(null)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setError(error.message)
      }
    }
    if (user) {
      getCategories()
    }
  }, [tasks, user])

  return (
    <div className="flex w-full  min-h-screen max-h-screen">
      {!user ? (
        <LoginForm
          user={user}
          setUser={setUser}
          userFirstLogin={userFirstLogin}
          setUserFirstLogin={setUserFirstLogin}
        />
      ) : isLoading && !error ? (
        <p>User data loading, please wait</p>
      ) : (
        <MainUI
          user={user}
          tasks={tasks}
          setTasks={setTasks}
          setUserFirstLogin={setUserFirstLogin}
          userFirstLogin={userFirstLogin}
          categories={categories}
          setCategories={setCategories}
        />
      )}
    </div>
  )
}

export default App
