import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = () => {

  const [data, setData] = useState([]);


  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://localhost:8080/api/orders/all');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);

    }
  }
  const updateStatus = async (event, orderId) => {
    const response = await axios.patch(`https://localhost:8080/api/orders/status/${orderId}?status=${event.target.value}`);
    if (response.status === 200) {
      await fetchOrders();
    }
  }

  useEffect(() => {

    fetchOrders();

  }, []);


  return (
    <div className="conta">
      <div className="py-5 row-justify-content-center">
        <div className="col-11 card">
          <table className='table table-responsive'>
            <tbody>
              {
                data.map((order, index) => {
                  return (
                                    <tr key={index}>
                                        <td>
                                            <img src={assets.delvery} alt="" height={48} width={48} />
                                        </td>
                                        <td>
                                            {order.orderedItems.map((item,index)=>{
                                                if(index===order.orderedItems.length-1){
                                                    return item.name+"x"+item.quantity;
                                                }else{
                                                    return item.name+"x"+item.quantity+", ";
                                                }
                                            })}
                                        </td>
                                        <td>
                                            {order.userAddress}
                                        </td>
                                        <td>&#x20B9;{order.amount.toFixed(2)}</td>
                                        <td>Items:{order.orderedItems.length}</td>
                                        <td>
                                            <select className="form-control" value={order.orderStatus} onChange={(e)=>updateStatus(e,order._id)}>
                                                <option value="Food Preparing">Food Preparing</option>
                                                <option value="Out for Delivery">Out for Delivery</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </td>
                                    </tr>
            )
                            })
                        }
          </tbody>

        </table>
      </div>

    </div>
    </div >
  )
}

export default Orders;