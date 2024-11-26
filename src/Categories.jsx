import { useEffect, useState } from 'react'
import categoriesService from './services/categoriesService'

function Categories({categories, setCategories}) {
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
            <CategoryCard key={cat._id}>
                <p>{cat.name} {cat.icon}</p>
            </CategoryCard>
          )
        })}
        <button>Create List</button>
        <h3>Group</h3>
        <div>
          <h4>Coding Project</h4>
        </div>
    </div>
  )
}

const CategoryCard = ({children})=>{
    return(
        <div>{children}</div>
    )
}

export default Categories
