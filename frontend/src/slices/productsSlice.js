import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

const PRODUCTS_URL = 'http://localhost:8000/products';

export const fetchProducts = createAsyncThunk(
    'data/fetchProducts',
    async () => {
        try {
            const response = await axios.get(PRODUCTS_URL);
            return response.data
        } catch (error) {
            throw new Error('Failed to fetch Products');
        }
    }
);

// AsyncThunk to add a product
export const addProduct = createAsyncThunk(
    'products/addProduct',
    async ({ name, description, price, category }) => {
        try {
            let payload = {
                id: nanoid(),
                name,
                description,
                price: Number(price),
                category
            }
            const response = await axios.post(`${PRODUCTS_URL}/create/`, payload);
            return response.data;
        } catch (error) {
            throw new Error('Failed to add product');
        }
    }
);

// AsyncThunk to delete a product by ID
export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async ({ productId, productName }) => {
        try {
            const response = await axios.delete(`${PRODUCTS_URL}/delete/${productId}`, {
                data: { name: `${productName}` }
            });
            return {
                id: productId,
                data: response.data,
                message: `Product with id as ${productId} deleted.`
            };
        } catch (error) {
            throw new Error('Failed to delete product');
        }
    }
);

// AsyncThunk to delete a product by ID
export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ productId, newProductInfo }) => {
        try {
            console.log(productId, newProductInfo);
            //  includes the productName in the req.body.
            const response = await axios.delete(`${PRODUCTS_URL}/update/${productId}`, {
                data: {
                    name: `${newProductInfo.name}`,
                    price: `${newProductInfo.price}`,
                    description: `${newProductInfo.description}`,
                    category: `${newProductInfo.catgegory}`
                }
            });
            return { productId, response, message: `Product with id as ${productId} updated.` };
        } catch (error) {
            throw new Error('Failed to update product');
        }
    }
);

// Define the products slice
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: 'idle',
        error: null
    },
    reducers: {
        // synchronous operations
        // prepareThenAddProduct: {
        //     reducer(state, action) {
        //         console.log('prepareThenAddProduct Reducer');
        //         console.log(action.payload);
        //         state.products.push(action.payload)
        //     },
        //     prepare({ name, description, price, category }) {
        //         console.log('prepareThenAddProduct Prepare');
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 name,
        //                 description,
        //                 price,
        //                 category
        //             }
        //         }
        //     }
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.products = action.payload.data;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.products.push(action.payload.data);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.products = state.products.filter(product => product.id !== action.payload.data.data.product.id);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                //upon fullfilled update.
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            })
    }
});

// export const { prepareThenAddProduct } = productsSlice.actions;

export const selectProducts = (state) => state.products.products;

// export default productsSlice.reducer;
export const { reducer: productsReducer } = productsSlice; // Exporting named export
