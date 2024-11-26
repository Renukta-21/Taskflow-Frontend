import { useEffect, useState } from 'react'
import tasksServices from './services/tasksServices'

function Tasks() {
    const [error, setError] = useState(null)

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await tasksServices.getAll()
        return response
      } catch (error) {
        setError(error)
      }
    }
    getTasks()
  }, [])

  return <div>
    {error && <p>{error}</p> }
  </div>
}

export default Tasks
