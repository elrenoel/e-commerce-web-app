import axios from "axios";

const baseURL = import.meta.env.VITE_URL_API;

export const getAllProducts = async (setProducts) =>{
    const endPoint = `${baseURL}/products`

    try {
        const res = await axios.get(endPoint);

        if(res.data){
            setProducts(res.data.data)
        }
    } catch (err) {
        console.error(err)
    }
}