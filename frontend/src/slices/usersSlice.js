import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const USERS_URL = 'https://jsonplaceholder.typecode.com/users';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = [];

/*
const initialState = [
    {
        id: 0,
        name:'Test User 1'
    }, {
        id: 1,
        name:'Test User 2'
    }, {
        id: 2,
        name:'Test User 3'
    }
];
*/
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    return response.data;
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // postAdded : {
        //     reducer(state, action) {
        //         state.push(action.payload)
        //     },
        //     // prepare callbacks prepares data when postAdd reducer is called.
        //     prepare(name){
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 name,
        //             }
        //         }
        //     }
        // }
    },
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer

