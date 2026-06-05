import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../service/foodService";
import  {removeQtyFromCart, addToCart, getCartData } from "../service/cartService";

export const StoreContext = createContext(null);
export const StoreContextProvider = (props)=>{

    const [foodList,setfoodList]=useState([]);
    const[quantities,setQuantities]=useState({});
    const[token,setToken]=useState("");

    const increaseQty=async (foodId)=>{
        setQuantities((prev)=>({...prev,[foodId]:(prev[foodId] || 0)+1}))
        await addToCart(foodId, token);
    }

    const decreaseQty=async (foodId)=>{
        setQuantities((prev)=>({...prev,[foodId]:prev[foodId]>0 ? prev[foodId]-1 : 0}))
        await removeQtyFromCart(foodId, token);
    }

    const loadFoodData = async () => {
        const data = await fetchFoodList();
        return data;
    }

    const removeFromCart=(foodId)=>{
        setQuantities((prevQuantities)=>{
            const updatedQuantities = {...prevQuantities};
            delete updatedQuantities[foodId];
            return updatedQuantities;
        });
    }

    const loadCartData =async(token)=>{
       
        const items=await getCartData(token);
        setQuantities(items);

    }

    const ContextValue = {
        foodList,
        quantities,
        increaseQty,
        decreaseQty,
        removeFromCart,
        token,
        setToken,
        setQuantities,
        loadCartData
    };

    useEffect(()=>{
        async function loadData(){
            const data=await loadFoodData(); 
            setfoodList(data);
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[]);

    return(
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}