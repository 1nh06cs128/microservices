import React, { useState } from 'react';

import AddTodos from "./AddTodo";
import TodoList from "./TodoList";

const Todo = ({ isLoggedIn }) => {

    if (!isLoggedIn) {
        return null;
    }

    return (
        <>
            <AddTodos />
            <TodoList />
        </>
    );
}

export default Todo;