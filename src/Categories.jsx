import { useEffect, useState } from 'react'
import categoriesService from './services/categoriesService'

function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const response = await categoriesService.getAll()
      setCategories(response)
    }
    getCategories()
  }, [])

  return (
    <div>
      {categories.length>0 &&
        categories.map((cat) => {
          return (
            <CategoryCard key={cat._id}>
                <p>{cat.name} {cat.icon}</p>
            </CategoryCard>
          )
        })}
        <button>Create List</button>
    </div>
  )
}

const CategoryCard = ({children})=>{
    return(
        <div>{children}</div>
    )
}

export default Categories
