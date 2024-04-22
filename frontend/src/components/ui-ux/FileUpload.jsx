import React, { useState, forwardRef, useImperativeHandle } from 'react';

import DeleteIcon from '../../assets/svgFiles/delete.svg?react';
import UploadIcon from '../../assets/svgFiles/upload.svg?react';
import ActionButton from './ActionButton';

const FileUpload = forwardRef(({
    maxFileSize = 5, // defaulted to 5MB
    acceptableFileTypes = ['image/jpeg', 'image/png', 'image/gif'], // defaulted to image formats
    ...props
}, ref) => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        const files = e.target.files;
        const allowedFormats = acceptableFileTypes
        const maxSizeMB = maxFileSize;

        let error = '';
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Check file size
            if (file.size > maxSizeMB * 1024 * 1024) {
                error = `File "${file.name}" exceeds maximum size of ${maxSizeMB}MB.`;
                break;
            }

            // Check file format
            if (!allowedFormats.includes(file.type)) {
                error = `File "${file.name}" has an invalid format. Only JPEG, PNG, and GIF are allowed.`;
                break;
            }
        }

        if (error) {
            setErrorMessage(error);
            e.target.value = null; // Clear selected files
        } else {
            setErrorMessage('');
            setSelectedFiles(Array.from(files));
        }
    };

    const handleUpload = () => {
        // Handle file upload logic here, e.g. send the files to a server
        console.log(selectedFiles);
        // Reset selected files after upload
        setSelectedFiles([]);
    };

    const removeSelectedImage = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    }

    // Expose clearValue function using useImperativeHandle
    useImperativeHandle(ref, () => ({
        clearValue() {
            setSelectedFiles([]);
        }
    }));

    return (
        <div>
            <div className={`flex items-center justify-between ${props.className || ''} `}>
                <label htmlFor="file-upload" className="inline-block bg-blue-400 hover:bg-blue-600 p-2 rounded cursor-pointer">
                    <i className="fas fa-cloud-upload-alt"></i>  Upload Image
                </label>
                {/* <label htmlFor="file-upload" className={"mb-1 display-block bg-rose-200"}>Choose Files:</label> */}
                <input
                    id="file-upload"
                    type="file"
                    accept="image/jpeg, image/png, image/gif"
                    multiple
                    onChange={handleFileChange}
                    className={'hidden'}
                />
                {/* <button  style={{ marginBottom: '10px' }}> </button> */}

                <ActionButton disabled={selectedFiles.length == 0 || errorMessage} bg-color='blue' onClick={handleUpload} className="border bg-blue-400 hover:bg-blue-600 border-blue-500 p-2 flex items-center">
                    <UploadIcon />
                </ActionButton>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {selectedFiles.length > 0 && (
                <>
                    <p>Selected Files:</p>
                    <div className="overflow-y-auto grid grid-cols-3 gap-3 justify-items-auto h-48 border-rose-300 border-2">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="relative flex items-center justify-center max-w-48 max-h-24 m-1" >
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Selected ${index + 1}`}
                                    className="object-cover m-1"
                                />
                                <div className="absolute top-0 right-0 rounded-full h-8 w-8 bg-rose-300 flex items-center justify-center">
                                    <DeleteIcon onClick={() => removeSelectedImage(index)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )
            }
        </div>
    );
});

export default FileUpload;