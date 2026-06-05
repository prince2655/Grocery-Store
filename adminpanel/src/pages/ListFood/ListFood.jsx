import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { use } from 'react';
import { toast } from 'react-toastify';
import './ListFood.css';
import { getFoodList } from '../../services/foodService';

const ListFood = () => {
  const[list, setList]=useState([]);
  const fetchList=async()=>{
    try {
      const data=await getFoodList();
      setList(data);
    } catch (error) {
      toast.error('Error fetching food list');
    }
  }
  
  const removeFood=async(foodId)=>{
    try{
      const success=await deleteFood(foodId);
      if(success){
        toast.success('Food removed successfully');
        await fetchList();
      } else {
        toast.error('Error removing food');
      }
    } catch (error) {
      toast.error('Error removing food');
    }
  };

  useEffect(()=>{
    fetchList();
  }, []);
  return (
    <div className="py-5 row justify-content-center">
      <div className="col-11 card">
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((item,index)=>{
                return(
                  <tr key={index}>
                    <td><img src={item.imageUrl} alt={item.name} height={48} width={48}/></td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>&#8377;{item.price}</td>
                    <td className='text-danger'>
                      <i className="bi bi-x-circle-fill" onClick={()=>removeFood(item.id)}></i>
                      {/* <i className="bi bi-trash">Delete</i> */}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table></div>
      </div>
  )
}

export default ListFood;