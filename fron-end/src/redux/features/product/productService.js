import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const API_URL = `${BACKEND_URL}/products/`

const getProducts = async () =>{
    const response = await axios.get(API_URL);
    return response;
}


const productService = {
    getProducts,
}

export default productService;