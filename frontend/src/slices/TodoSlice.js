import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{
        id: 1,
        text: 'First ToDo'
    }]
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            };
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },

        // destructuring example below for reference
        // updateTodo: (state, action) => {
        updateTodo: (state, { payload: { id: updateId, text: updatedText } }) => {
            const updateToDo = state.todos.find(todo => todo.id === updateId);
            // console.log(updateId, updatedText, updateToDo);
            if (updateToDo) {
                updateToDo.text = updatedText;
            }
        }
    }
});

export const { addTodo, removeTodo, updateTodo } = todosSlice.actions;

// mask the selectAllTodos to state.todos;
export const selectAllToDos = (state) => state.todos.todos;
export default todosSlice.reducer;