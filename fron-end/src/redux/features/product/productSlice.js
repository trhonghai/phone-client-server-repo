import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import productService from "./productService"




const initialState = {
    products:[],
    cart:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
}

export const getProducts = createAsyncThunk(
    'product',
    async () =>{
        try {
            return await productService.getProducts();
        } catch (error) {
            console.log('Error: ',error);
        }
    }
)

export const productSilce = createSlice({
    name:"product",
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) =>{
        builder
            .addCase(getProducts.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload?.data || [];
            })
            .addCase(getProducts.rejected,(state)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.products = [];
            })
    }
})

export default productSilce.reducer;