import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { assets } from '../../assets/assets';
import { calculateCartTotals } from '../../util/cartUtil';
import { StoreContext } from '../../contex/StoreContex';
import { data } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {RAZORPAY_KEY} from '../../util/contants';
import { useNavigate } from 'react-router-dom';


const PlaceOrder = () => {

  const { foodList, quantities,setQuantities,token } = useContext(StoreContext);

  const navigate=useNavigate();
  


  const [data, setData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    phone:"",
    address:"",
    state:"",
    city:"",
    zip:""
    
  });

  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData((data)=>({...data,[name]:value}))
  }

  const deleteOrder=async(orderId)=>{
    try{
      await axios.delete('http://localhost:8080/api/orders/delete/'+orderId,{
        headers:{
          "Authorization":"Bearer "+token
        }
      });
      setQuantities({}); // Clear quantities after deleting the order
    }catch(error){
      console.error("Error deleting order:", error);
      toast.error("An error occurred while deleting the order. Please try again.");
    }
  };


  const clearCart=async()=>{
    try{
      await axios.delete('http://localhost:8080/api/cart',{
        headers:{
          "Authorization":"Bearer "+token
        }
      });
    }catch(error){
      console.error("Error clearing cart:", error);
      toast.error("An error occurred while clearing the cart. Please try again.");
    }
  };

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    // console.log(Data);

    const orderData={
      userAddress:`${data.firstname} ${data.lastname}, ${data.address}, ${data.city}, ${data.state} ${data.zip}`,
      phone:data.phone,
      email:data.email,
      orderItems:cartItems.map(item=>({
        foodId:item.id,
        quantity:quantities[item.id],
        price:item.price * quantities[item.id],
        category:item.category, 
        imageUrl:item.imageUrl,
        description:item.description,
        name:item.name
      })),
      amount:total,
      orderStatus:"Preparing"
    };

    try{
      const response=await axios.post("http://localhost:8080/api/orders/create", orderData,{
        headers:{
          "Authorization":"Bearer "+token
        }});
        if(response.status===201 && response.data.razorpayOrderId){
          //initiate razorpay payment
          initiateRazorpayPayment(response.data);
        }else{
          toast.error("Unable to place order. Please try again.");
        }
    }catch(error){
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order. Please try again.");
    }
  };

  const initiateRazorpayPayment=(order)=>{
    console.log("Razorpay =", window.Razorpay);
    console.log(order);
    const options={
      key:RAZORPAY_KEY,
      amount:order.amount, //in paise
      currency:"INR",
      name:"Food Land",
      description:"Food Order Payment",
      order_id:order.razorpayOrderId,
      handler:async function(razorpayResponse){
        await verifyPayment(razorpayResponse);
      },
      prefill:{
        name: `${data.firstname} ${data.lastname}`,
        email:data.email,
        contact:data.phone
      },
        theme:{color:"#3399cc"},
        modal:{
          ondismiss:async function(){
            toast.error("Payment cancelled");
            await deleteOrder(order.id);
          }
        }
      };
      console.log("KEY =", RAZORPAY_KEY);
      console.log(options);

    const razorpay=new window.Razorpay(options);
    razorpay.open();
  };

  const verifyPayment=async(razorpayResponse)=>{
    const paymentData={
      razorpay_payment_id:razorpayResponse.razorpay_payment_id,
      razorpay_order_id:razorpayResponse.razorpay_order_id,
      razorpay_signature:razorpayResponse.razorpay_signature
    };
    try{
      const response=await axios.post("http://localhost:8080/api/payments/verify", paymentData,{
      headers:{
        "Authorization":"Bearer "+token
      }
    });
      if(response.status===200){
        toast.success("Payment successful! ");
        await clearCart();
        navigate('/myorders');
      }else{
        toast.error("Payment failed. Please try again.");
        navigate('/');
      }
    }catch(error){
      // console.error("Error verifying payment:", error);
      toast.error("Payment failed. Please try again.");
      navigate('/');
    };
  }


  const cartItems = foodList.filter(food => quantities[food.id] > 0);

  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems, quantities);
  return (
    
    <div>
        <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
  <button className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
    id="bd-theme" type="button" aria-expanded="false"
    data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">

    <svg className="bi my-1 theme-icon-active" aria-hidden="true">
      <use href="#circle-half"></use>
    </svg>

    <span className="visually-hidden" id="bd-theme-text">Toggle theme</span>
  </button>

  <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">

    <li>
      <button type="button"
        className="dropdown-item d-flex align-items-center"
        data-bs-theme-value="light" aria-pressed="false">

        <svg className="bi me-2 opacity-50" aria-hidden="true">
          <use href="#sun-fill"></use>
        </svg>

        Light

        <svg className="bi ms-auto d-none" aria-hidden="true">
          <use href="#check2"></use>
        </svg>
      </button>
    </li>

    <li>
      <button type="button"
        className="dropdown-item d-flex align-items-center"
        data-bs-theme-value="dark" aria-pressed="false">

        <svg className="bi me-2 opacity-50" aria-hidden="true">
          <use href="#moon-stars-fill"></use>
        </svg>

        Dark

        <svg className="bi ms-auto d-none" aria-hidden="true">
          <use href="#check2"></use>
        </svg>
      </button>
    </li>

    <li>
      <button type="button"
        className="dropdown-item d-flex align-items-center active"
        data-bs-theme-value="auto" aria-pressed="true">

        <svg className="bi me-2 opacity-50" aria-hidden="true">
          <use href="#circle-half"></use>
        </svg>

        Auto

        <svg className="bi ms-auto d-none" aria-hidden="true">
          <use href="#check2"></use>
        </svg>
      </button>
    </li>

  </ul>
</div>
<div className="container mt-4">
    <main>
      <div className="py-5 text-center">
  <img className="d-block mx-auto" src={assets.delvery} alt="" width={98} height={98}/>
  </div>
            

    <div className="row g-5">

      <div className="col-md-5 col-lg-4 order-md-last">

        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Your cart</span>
          <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
        </h4>

        <ul className="list-group mb-3">

          {cartItems.map(item=>(

            <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 className="my-0">{item.name}</h6>
              <small className="text-body-secondary">Qty: {quantities[item.id]}</small>
            </div>
            <span className="text-body-secondary">&#8377;{(item.price * quantities[item.id])}</span>
          </li>
          )
          )}

          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              
              <small className="text-body-secondary">Shipping</small>
            </div>
            <span className="text-body-secondary">&#8377;{subtotal==0 ? 0.0 : shipping.toFixed(2)}</span>
          </li>

          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              
              <small className="text-body-secondary">Tax(10%)</small>
            </div>
            <span className="text-body-secondary">&#8377;{tax.toFixed(2)}</span>
          </li>

         

          <li className="list-group-item d-flex justify-content-between">
            <span>Total (INR)</span>
            <strong>&#8377; {total.toFixed(2)}</strong>
          </li>

        </ul>

        

      </div>

      <div className="col-md-7 col-lg-8">

        <h4 className="my-3">Billing address</h4>

        <form className="needs-validation" onSubmit={onSubmitHandler}>

          <div className="row g-3">

            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input type="text" className="form-control" id="firstName" placeholder='John' name='firstname' value={data.firstname} required onChange={onChangeHandler}/>
            </div>

            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input type="text" className="form-control" id="lastName" placeholder='Doe' name='lastname' value={data.lastname} required onChange={onChangeHandler}/>
            </div>

            <div className="col-12">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-group has-validation">
                <span className="input-group-text">@</span>
                <input type="text" className="form-control" id="email" required placeholder='test@example.com' name='email' value={data.email} onChange={onChangeHandler}/>
                
              </div>
            </div>

            
            <div className="col-12">
              <label htmlFor="address" className="form-label">Phone Number</label>
              <input type="number" className="form-control" id="phone" required placeholder='1234876890' name='phone' value={data.phone} onChange={onChangeHandler}/>
              </div>

           

            <div className="col-12">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" required placeholder='1234 main st' name='address' value={data.address} onChange={onChangeHandler}/>
              </div>

            


            <div className="col-md-4">
              <label htmlFor="state" className="form-label">State</label>
              <select className="form-select" id="state" required name='state' value={data.state} onChange={onChangeHandler}>
                <option value="">Choose...</option>
                <option>Gujarat</option>
                <option>Maharashtra</option>
              </select>
            </div>

            <div className="col-md-5">
              <label htmlFor="city" className="form-label">City</label>
              <select className="form-select" id="city" required name='city' value={data.city} onChange={onChangeHandler}>
                <option value="">Choose...</option>
                <option>Mumbai</option>
                <option>Surat</option>
              </select>
              </div>

            <div className="col-md-3">
              <label htmlFor="zip" className="form-label">Zip</label>
              <input type="number" placeholder='979690' className="form-control" id="zip" required name='zip' value={data.zip} onChange={onChangeHandler}/>
              </div>

          </div>
          <hr className="my-4"/>

          <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItems.length==0}>
            Continue to checkout
          </button>

        </form>
      </div>

    </div>
  </main>
</div>
    </div>
  )
};

export default PlaceOrder;