import React from 'react'
import Header from '../../componets/Header/Header'
import ExploreMenu from '../../componets/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../componets/FoodDisplay/FoodDisplay'
import { useState } from 'react'

const Home = () => {

  const[category,setCategory] = useState('All');
  return (
    <main className="container">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} searchText={''}/>
    </main>
  )
}

export default Home