import { useEffect } from 'react'
import categoriesService from './services/categoriesService'
import resetServices from './services/resetServices'
/* import resetServices from './services/resetServices' */

const colaborativeSpaces = [
  {
    id: 1,
    task: 'Coding Project',
    participants: ['Daniel', 'Zuckerberg', 'Rosalinda'],
  },
  {
    id: 2,
    task: 'Meeting',
    participants: ['Eduardo', 'Ceron', 'Erika'],
  },
]
function Categories({
  categories,
  setCategories,
  setVisibleTasks,
  handleVisibleTasks,
}) {
  useEffect(() => {
    const getCategories = async () => {
      const response = await categoriesService.getAll()
      setCategories(response)
    }
    getCategories()
    /* const resetDB = async()=>{a
      await resetServices.resetDB()
    }
    resetDB() */
  }, [])

  const handleReset = async()=>{
    try {
      const response = await resetServices.resetDB()
      console.log(response)
    } catch (error) {
        console.log(error.message)
    }
  }
  return (
    <div className="w-[420px] py-6 px-3  rounded-3xl mx-2 my-2 bg-white">
      <h3 className="text-2xl mb-5">Private</h3>
      <div className="flex flex-col">
        {categories.length > 0 &&
          categories.map((cat) => {
            return (
              <button
                className="sidebarButton"
                key={cat._id}
                onClick={() => handleVisibleTasks(cat.name)}
              >
                <div>
                  <span className="text-xl">{cat.icon}</span>{' '}
                  <span className="px-4">{cat.name}</span>
                </div>
                <div>
                  <p>0</p>
                </div>
              </button>
            )
          })}
      </div>
      <button
        className="sidebarButton justify-center bg-slate-300"
        onClick={() => setVisibleTasks(null)}
      >
        Show all tasks
      </button>
      <button className="w-full bg-blue-800 text-white rounded-xl py-3 mt-4">
        Create new list
      </button>
      <br />
      <br />
      <h3 className="text-2xl mb-2">Group</h3>
      <small>Colaborative space with friends and partners</small>
      <div className='mt-3 grid grid-cols-2'>
        {colaborativeSpaces.map((cs) => (
          <ColaborativeCard
            key={cs.id}
            participants={cs.participants}
            task={cs.task}
          />
        ))}
      </div>
        <button className='bg-red-500 mt-10 py-2 px-4' onClick={handleReset}>Reset Defaullt Values</button>
    </div>
  )
}
const ColaborativeCard = ({ task, participants }) => {
  return (
    <div >
      <div className="aspect-square bg-gray-400 max-w-32"></div>
      <h4>{task}</h4>
      <div>
        {participants.map((p, idx) => (
          <div key={idx} className='flex items-center'>
            <div className="aspect-square w-4 h-4 bg-blue-500 rounded-full mr-2" ></div>
            <small>{p}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Categories
