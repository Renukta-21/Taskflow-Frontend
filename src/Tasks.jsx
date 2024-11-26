import { useEffect, useState } from 'react'
import tasksServices from './services/tasksServices'

function Tasks({ tasks, setTasks, visibleTasks }) {
  const [error, setError] = useState(null)

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await tasksServices.getAll()
        setTasks(response)
      } catch (error) {
        setError(error)
      }
    }
    getTasks()
  }, [])

  const filteredTasks = visibleTasks ? tasks.filter(task=> task.category.name === visibleTasks) : tasks
  
  return (
    <div>
      {filteredTasks.length > 0 ?
        filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            title={task.title}
            category={task.category}
            description={task.description}
          />
        )): <p>No tasks found {visibleTasks!==null && 'in this category'}</p> }
      {error && <p>{error}</p>}
    </div>
  )
}
const TaskCard = ({title, description, category}) => {
    return(
        <div>
            <hr />
            <p>{category.icon}{title}</p>
            <p>{description}</p>
        </div>
    )
}
export default Tasks
