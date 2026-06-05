import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { addFood } from '../../services/foodService';
import { ToastContainer, toast } from 'react-toastify';
  

export const AddFood = () => {
  const[image, setImage] = useState(false);
  const[data, setData] = useState({
    name: '',
    description: '',
    category: 'Fruit',
    price: ''
  });

  const onChangeHandler = (e) => {
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]: value})); 
  }
  // useEffect(()=>{
  //   console.log(data);
  // }, [data]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(!image){
      toast.error('Please select an image');
      return;
    }
  

    try{
      await addFood(data, image);
      toast.success('Food added successfully');
      setData({
        name: '',
        description: '',
        category: 'Biryani',
        price: ''
      });
      setImage(null);
    } catch(error){
      // console.error('Error adding food:', error);
      toast.error('Error adding food');
    }
}
    

  return (
    
<div className="mx-2 mt-2">
  <div className="row">
    <div className="card col-md-4">
      <div className="card-body">
        <h2 className="mb-4">Add Food</h2>
        <form onSubmit={onSubmitHandler}>

        <div className="mb-3">
            <label htmlFor="image" className="form-label border dark"><img src={image ? URL.createObjectURL(image) : assets.uploadimage} alt="" width={98}/></label>
            <input type="file" className="form-control b" id="image"  hidden onChange={(e)=>setImage(e.target.files[0])}/> 
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control m-1" placeholder='enter food name' id="name" required name='name' onChange={onChangeHandler} value={data.name}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" placeholder='Enter food description' id="description" required name='description' onChange={onChangeHandler} value={data.description}/>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select type="text" className="form-control" id="category" required name='category' onChange={onChangeHandler} value={data.category}>
            <option value="Fruit">Fruit</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Milk">Milk</option>
            <option value="Oil">Oil</option>
            <option value="Ketchup">Ketchup</option> 
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" className="form-control" placeholder='&#8377;200' id="price" required name='price' onChange={onChangeHandler} value={data.price}/>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default AddFood;