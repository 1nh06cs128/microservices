import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import counterReducer from '../slices/counterSlice';
import postsReducer from '../slices/postsSlice';
import usersReducer from '../slices/usersSlice';
import todosReducer from '../slices/TodoSlice';
import { productsReducer } from '../slices/productsSlice';

export const store = configureStore({
    // reducer: counterReducer  /* Single Reducer */
    reducer: {
        auth: authReducer,
        counter: counterReducer,
        posts: postsReducer,
        users: usersReducer,
        todos: todosReducer,
        products: productsReducer,
    }
});