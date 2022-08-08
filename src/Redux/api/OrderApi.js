import axios from "axios";
import { endPoint } from "../../constants/GlobaleVariables";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddOrder = async(data) => {
    // try {

    let response = await axios.post( endPoint + `/api/order/add`, data)
    const json = response.data

    return json;
            
}

const UpdateUserSoldVitamix = async(data) => {

    const response = await axios.put(`${endPoint}/api/order/userSoldVitamix/${data.userId}`, data) 
    const json = response.data;
    return json;
    // const json = response.data

    // return json;
            
}

const getOneOrder = async(id) => {

    let response = await axios.get( `${endPoint}/api/order/findOrder/${id}`)
    const json = response.data

    return json;
            
}

const getOrderByUser = async(id) => {

        let response = await axios.get( `${endPoint}/api/order/findUserOrder/${id}`)
        const json = response.data
        // console.log(id)
        return json;
            
}


const OrderApi =  {
    AddOrder,
    UpdateUserSoldVitamix,
    getOneOrder,
    getOrderByUser
}

export default OrderApi