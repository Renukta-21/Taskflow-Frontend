import { useEffect, useState } from 'react'
import categoriesService from './services/categoriesService'
import resetServices from './services/resetServices'
import EmojiPicker from 'emoji-picker-react'


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
const calculateTasksPerCategory = (categories) => {
  return categories.map((category) => {
    return {
      ...category,
      taskCount: category.tasks.length,
    };
  });
};


function Categories({
  tasks,
  categories,
  setCategories,
  setVisibleTasks,
  handleVisibleTasks,
}) {

  const [newCategoryMenu, setNewCategoryMenu] = useState(true)
  const [catIcon, setCatIcon] = useState('')
  const [categoryName, setCategoryName] = useState('')
  useEffect(() => {
    const getCategories = async () => {
      const response = await categoriesService.getAll()
      const categoriesWithTaskCount = calculateTasksPerCategory(response);
      setCategories(categoriesWithTaskCount)
      console.log(response)
    }
    getCategories()
  }, [tasks])

  const handleReset = async () => {
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
                  <p>{cat.taskCount}</p>
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
      <div className={`relative mt-4`} >
      <div
          className={`absolute top-[50%] -translate-y-[50%] duration-500 transition-all left-[350px] text-black bg-white p-4 z-30 shadow-2xl ${newCategoryMenu ? '': 'opacity-0 pointer-events-none'}`}>
          <form action="" className=''>
            <input type="text" className='newtaskInput border border-gray-400' placeholder='category name' onChange={(e)=> setCategoryName(e.target.value)}/>
            <div>
            <input type="text" className='newtaskInput border border-gray-400' value={catIcon} />
            <EmojiPicker onEmojiClick={(e)=> setCatIcon(e.emoji)}/>
            </div>
            <button 
            className={`bg-blue-700 text-white w-full rounded-lg py-2 ${!catIcon || !categoryName ? 'bg-gray-700':''}`} 
            disabled={!catIcon || !categoryName}>Add Category</button>
          </form>
        </div>

        <button className="w-full bg-blue-800 text-white rounded-xl py-3" onClick={()=> setNewCategoryMenu(!newCategoryMenu)}>
          {newCategoryMenu ? 'cancel':'Create new list'}
        </button>
        
      </div>
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
const EmojiInput = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleEmojiClick = (event, emojiObject) => {
    setSelectedEmoji(emojiObject.emoji);
  };

  return (
    <div>
      <input
        type="text"
        value={selectedEmoji}
        readOnly
        placeholder="Select an emoji"
        className="border p-2 rounded-md w-full"
      />
      
      
    </div>
  );
};

export default Categories
