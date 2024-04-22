import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
    loading: false,
    error: null,
    user: null,
};

// const initialState = {
//     loading: false,
//     userInfo: {}, // for user object
//     userToken: null, // for storing the JWT
//     error: null,
//     success: false, // for monitoring the registration process.
// }

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userCredentials) => {
        try {
            console.log(userCredentials);
            const request = await axios.post('http://localhost:8000/user/login', userCredentials);
            const response = request.data.data;
            localStorage.setItem('user', JSON.stringify(response));
            return response;
        } catch (error) {
            throw new Error('Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            // update
        },
        logout(state) {
            state.loggedIn = false;
            state.user = null;
            state.error = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state) => {
                state.user = null;
                state.loading = true;
                state.loggedIn = false;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.loggedIn = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                // state.error = action.error.message;
                console.error(action.error && action.error.message);
                if (action.error.message === 'Request failed with status code 401') {
                    state.error = 'Access Denied! Invalid Credentials';
                } else {
                    state.error = action.error.message;
                }
            });
    },
});

export default authSlice.reducer;
