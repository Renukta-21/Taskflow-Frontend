import { useEffect, useState } from 'react'
import tasksServices from './services/tasksServices'

function Tasks({
  tasks,
  setTasks,
  visibleTasks,
  showGuide,
  menuOpen,
}) {
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

  const filteredTasks = visibleTasks
    ? tasks.filter((task) => task.category.name === visibleTasks)
    : tasks


  return (
    <div className="relative flex flex-col h-full w-full">
      {showGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      )}

      {/* Mensaje de guía si no hay tareas */}
      {showGuide && filteredTasks.length === 0 && (
        <div className="absolute z-20 top-[100px] left-1/2 transform -translate-x-1/2 text-center">
          <h2 className="text-white text-2xl mb-4">
            Welcome! Start by adding a task to your list!
          </h2>
        </div>
      )}

      {/* Flecha animada apuntando al botón */}
      {showGuide && !menuOpen && (
        <div className="absolute z-30 top-64  left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce ">
          <div className="h-[200px] w-1 bg-white"></div>
          <div className="w-10 h-10 border-r-4 border-b-4 border-white transform rotate-45 "></div>
        </div>
      )}

      {/* Lista de tareas */}
      <div
        className={`relative z-20 mt-2 ${
          showGuide ? 'pointer-events-none' : ''
        }`}
      >
        {filteredTasks && filteredTasks.length > 0
          ? filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                visibleTasks={visibleTasks}
                title={task.title}
                category={task.category}
                description={task.description}
              />
            ))
          : !showGuide && (
              <p className="">
                No tasks found {visibleTasks !== null && 'in this category'}
              </p>
            )}
        {/* {!filteredTasks.length > 0 && (
          <h2 className='text-xl underline'>
            Consider adding tasks to your day!
          </h2>
        )} */}
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

const TaskCard = ({ title, description, category, visibleTasks }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleChecked = ()=>setIsChecked(!isChecked)
  return (
    <div className=" bg-white py-2 rounded-xl px-5">
      <p>
        <input type="checkbox" name="" id="" className="scale-150 mr-4" onChange={handleChecked}/>
        {visibleTasks===null && <span>{category.icon}</span>}
        <span className={`${isChecked? 'line-through':''}`}> <span className='font-semibold'>{title}</span>  {description}</span>
      </p>
    </div>
  )
}

export default Tasks
