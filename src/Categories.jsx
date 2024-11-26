import { useEffect, useState } from 'react'
import categoriesService from './services/categoriesService'

function Categories({categories, setCategories, handleVisibleTasks}) {
  useEffect(() => {
    const getCategories = async () => {
      const response = await categoriesService.getAll()
      setCategories(response)
    }
    getCategories()
  }, [])

  return (
    <div>
      <h3>Private</h3>
      {categories.length>0 &&
        categories.map((cat) => {
          return (
            <button key={cat._id} onClick={()=> handleVisibleTasks(cat.name)} >
                <p>{cat.name} {cat.icon}</p>
            </button>
          )
        })}
        <button>Create List</button>
        <br /><br />
        <button>Show All tasks</button>
        <h3>Group</h3>
        <div>
          <h4>Coding Project</h4>
        </div>
    </div>
  )
}


export default Categories
