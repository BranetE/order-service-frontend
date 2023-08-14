import axios from "axios";
import authHeader from "./AuthHeader";

const ORDERS_URL = "http://localhost:8080/api/order";

export async function getByUser(userId){
    try{
        const response = await axios.get(ORDERS_URL + "/getByUser/" + userId, {headers: authHeader()});
        console.log(response);
        return response;
    }catch(error) {
        console.error(error);
    }
}

export async function getOrders(){
    var data = null;
    try{
        const response = await axios.get(ORDERS_URL, {headers: authHeader()});
        console.log(response);
        data = response.data;
    } catch (error){
        console.error(error);
    }
    return data;
}

export function saveOrder(order){
    axios.post(ORDERS_URL, order, {headers: authHeader()})
    .then((response) => {
        console.log(response);
    })
    .catch((error) => console.log(error));
}

export function updateOrderStatus(id, status){
    axios.put(ORDERS_URL + "/" + id + '?' + 'status=' + status,{}, {headers: authHeader()})
    .then((response) => {
        console.log(response);
    })
    .catch((error) => console.log(error))
}

export function deleteOrder(id){
    axios.delete(ORDERS_URL + "/" + id, {headers: authHeader()})
    .then((response) => {
        console.log(response);
    })
    .catch((error) => console.log(error))
} 
