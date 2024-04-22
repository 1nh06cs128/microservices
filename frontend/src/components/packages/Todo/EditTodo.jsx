import React, { useState } from "react";

import ActionButton from "../../ui-ux/ActionButton";

import CheckIcon from '../../../assets/svgFiles/check.svg?react';
import CancelIcon from '../../../assets/svgFiles/cancel.svg?react';

// Create a new component for editing todo text
const EditTodoInput = ({ id, initialValue, onSave, onCancel }) => {
    const [editedText, setEditedText] = useState(initialValue);

    const handleSave = () => {
        onSave(id, editedText);
    };

    return (
        <div className="flex items-center">
            <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="mr-2 border-2 border-green-500 p-1 rounded"
            />
            <div className="text-white">
                <ActionButton bgColor="green" onClick={handleSave} >
                    <CheckIcon />
                </ActionButton>

                <ActionButton bgColor="red" onClick={onCancel} >
                    <CancelIcon />
                </ActionButton>
            </div>
        </div>
    );
};

export default EditTodoInput;