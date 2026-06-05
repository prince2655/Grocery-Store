import axios from "axios";
import { data } from "react-router-dom";

const API_URL = "http://localhost:8080/api/foods";

export const fetchFoodList = async () => {
    try {
        const response = await axios.get(API_URL);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching food list:", error);
        throw error;
    }   
};


export const fetchFoodDetails = async (id) => {
    try {
    const response=await axios.get(API_URL+'/'+id);
    return response.data;
    } catch (error) {
        console.error("Error fetching food details:", error);
        throw error;    
        
    }
}