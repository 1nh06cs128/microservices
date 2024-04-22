import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllToDos, removeTodo, updateTodo } from '../../../slices/TodoSlice';

import ActionButton from "../../ui-ux/ActionButton";

import EditIcon from '../../../assets/svgFiles/edit.svg?react';
import DeleteIcon from '../../../assets/svgFiles/delete.svg?react';

import EditTodoInput from "./EditTodo";

const TodoList = () => {

    const dispatch = useDispatch()
    const allTodos = useSelector(selectAllToDos);
    const [checkedItems, setCheckedItems] = useState([]);
    const [editingTodoId, setEditingTodoId] = useState(null);

    const handleUpdateClick = (id) => {
        setEditingTodoId(id);
    };

    const handleDeleteTodo = (id) => {
        dispatch(removeTodo(id))
        setEditingTodoId(null);
        if (checkedItems.includes(id)) {
            // If already checked, remove from checked items
            setCheckedItems(checkedItems.filter((item) => item !== id));
        }
    };

    const handleCancelUpdate = () => {
        setEditingTodoId(null);
    };

    const handleSaveUpdate = (id, newText) => {
        dispatch(updateTodo({ id, text: newText }));
        setEditingTodoId(null);
    };


    const handleCheckboxClick = (id) => {
        if (checkedItems.includes(id)) {
            // If already checked, remove from checked items
            setCheckedItems(checkedItems.filter((item) => item !== id));
        } else {
            // If not checked, add to checked items
            setCheckedItems([...checkedItems, id]);
        }
    };

    return (
        <>
            {allTodos.length ? (
                <div>
                    <div>Your List of Todos:</div>
                    <ul className="list-none">
                        {allTodos.map((todo) => (
                            <li
                                key={todo.id}
                                className={`mt-1 flex justify-between items-center bg-zinc-800 pl-4 pr-2 py-1 rounded group ${checkedItems.includes(todo.id) ? 'bg-gray-600' : ''}`}>

                                <input
                                    type="checkbox"
                                    checked={checkedItems.includes(todo.id)}
                                    onChange={() => handleCheckboxClick(todo.id)}
                                    className="mr-2"
                                />

                                {editingTodoId === todo.id ? (
                                    <div className="flex flex-col">
                                        {/* // Render the edit input component when updating todo */}
                                        <EditTodoInput
                                            className="flex-grow"
                                            id={todo.id}
                                            initialValue={todo.text}
                                            onSave={handleSaveUpdate}
                                            onCancel={handleCancelUpdate}
                                        />
                                    </div>
                                ) : (
                                    // Render the text when not updating todo
                                    <div className="text-white float-left">{todo.text}</div>
                                )}

                                {/* <div className="text-white"> */}
                                <div className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 ml-auto">

                                    <ActionButton bgColor="green" onClick={() => handleUpdateClick(todo.id)} >
                                        <EditIcon />
                                    </ActionButton>

                                    {/* <ActionButton bgColor="red" onClick={() => dispatch(removeTodo(todo.id))} > */}
                                    <ActionButton bgColor="red" onClick={() => handleDeleteTodo(todo.id)} >
                                        <DeleteIcon />
                                    </ActionButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <span> Total of {allTodos.length} todos present in the list</span>
                </div>
            ) : (
                <p>No Todos to show</p>
            )}


            {(checkedItems.length && allTodos.length) ? (<div>
                <span> Selected {checkedItems.length} Todos from the list of {allTodos.length} </span>
            </div>) : ('')}

        </>
    );
}

export default TodoList