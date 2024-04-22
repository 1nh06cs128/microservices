import React, { useState, useRef } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import TextInput from "../../ui-ux/LabeledInput";
import ButtonElement from "../../ui-ux/LabeledButton";
import { addTodo } from '../../../slices/TodoSlice';

const AddTodos = () => {

    const dispatch = useDispatch();
    const childRef = useRef(null);

    const [canAddTodo, setCanAddTodo] = useState(false);

    const addTodoHandler = () => {
        if (canAddTodo) {
            const retrievedData = childRef.current.retrieve();
            dispatch(addTodo(retrievedData));
            // reset child component state
            childRef.current.clearValue();
            setCanAddTodo(false);
        }
    }

    const enableDisabledState = (event) => {
        setCanAddTodo(Boolean(event.target.value));
    };

    return (
        <form>
            <div className="flex justify-between items-center mt-1 w-full">
                <div className="w-full">
                    <TextInput
                        ref={childRef}
                        label={"Add a Todo"}
                        informParentOnInputChange={enableDisabledState}
                    />
                </div>
                <div className="">
                    <ButtonElement
                        icon={<FaUser />}
                        label={'Add'}
                        bgColor={'indigo'}
                        handleButtonClickOnParent={addTodoHandler}
                        enableDisabledToggle={!canAddTodo}
                    />
                </div>
            </div>
        </form>
    )
}

export default AddTodos
