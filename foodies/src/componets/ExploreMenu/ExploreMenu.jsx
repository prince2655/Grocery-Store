import React, { useRef } from 'react'
import { categories } from '../../assets/assets';
import './ExploreMenu.css'

const ExploreMenu = ({ category, setCategory }) => {

    const menuRef=useRef(null);
    const scrollLeft=()=>{
       if(menuRef.current){
        menuRef.current.scrollBy({
            left:-200,
            behavior:'smooth'
        })
       }
    }
    const scrollRight=()=>{
        if(menuRef.current){
         menuRef.current.scrollBy({
                left:200,
                behavior:'smooth'
            })
        }
    }
  return (
   <div className="explore-menu position-relative">
    <div className="d-flex justify-content-between align-items-center explore-menu-header my-5">
        <div className="explore-menu-text">
            <h1>Explore Our Menu</h1>
            <p>Explore curated list of dishes from top categories</p>
        </div>
        <div className="d-flex scroll-buttons">
            <i className='bi bi-arrow-left-circle scroll-icon' onClick={scrollLeft}></i>
            <i className='bi bi-arrow-right-circle scroll-icon' onClick={scrollRight}></i>
        </div>
    </div>
    <div className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list" ref={menuRef}>
        {
            categories.map((item,index) => {
                return (
                    <div key={index} className="text-center explore-menu-list-item" onClick={() => setCategory(prev=>prev===item.category?'All':item.category)}>
                        <img src={item.icon} alt=""  className={item.category==category ? 'rounded-circle active':'rounded-circle'} height={128} width={128}/>
                        <p className='mt-2 fw-bold'>{item.category}</p>
                    </div>
                )
            })
        }
    </div>
    <hr/>
   </div>
  )
}

export default ExploreMenu