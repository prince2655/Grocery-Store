import React from 'react'
import FoodDisplay from '../../componets/FoodDisplay/FoodDisplay'
import { useState } from 'react'

const Explore = () => {
  const[category,setCategory] = useState('All');
  const[searchText,setSearchText] = useState('');
  return (

    <>  
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group mb-3">
              <select className="form-select mt-2" style={{maxWidth: '150px'}} onChange={(e) => setCategory(e.target.value)}>
                <option value="All">All</option>
                <option value="Fruit">Fruit</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Milk">Milk</option>
                <option value="Oil">Oil</option>
                <option value="Ketchup">Ketchup</option>
              </select>
              <input type="text" className="form-control mt-2" placeholder="Search for food..." 
              onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
              <button className="btn btn-primary mt-2" type="submit">

              <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <FoodDisplay category={category} searchText={searchText} />
    </>
  )
}

export default Explore