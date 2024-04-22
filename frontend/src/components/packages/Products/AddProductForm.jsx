import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../../slices/productsSlice';

import TextInput from '../../ui-ux/LabeledInput';
import ButtonElement from "../../ui-ux/LabeledButton.jsx";

import FileUpload from '../../ui-ux/FileUpload.jsx';

const AddProductForm = () => {
    const dispatch = useDispatch();

    const productNameRef = useRef(null);
    const productPriceRef = useRef(null);
    const productDescriptionRef = useRef(null);
    const productCategoryRef = useRef(null);
    const productImageURLRef = useRef(null);
    const productImageFileRef = useRef(null);

    const initialState = {
        name: '',
        price: 0,
        description: '',
        category: '',
        imageURL: '',
        imageFile: null
    }

    const [productForm, setProductForm] = useState(initialState);

    // Ensure price is always a number
    // useEffect(() => {
    //     setProductForm(prevState => ({
    //         ...prevState,
    //         price: parseFloat(productForm.price)
    //     }));
    // }, [productForm.price]);

    const handleChange = (e) => {
        // console.log(e.target.name);
        const { name, value, type, files } = e.target;
        const newValue = type === 'file' ? files[0] : value; // Get the file object if type is file input
        setProductForm(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productForm['name'].trim() !== '' || productForm['price'].trim() !== '' || productForm['description'].trim() !== '' || productForm['category'].trim() !== '') {
            dispatch(addProduct(productForm)).unwrap();
            // dispatch(prepareAndAddProduct(productForm));
        }
        // submitForm(productForm);
        // Optionally, you can clear the form after submission
        resetForm(e);
    };

    const resetForm = (e) => {
        setProductForm(initialState);
        productNameRef.current.clearValue();
        productPriceRef.current.clearValue();
        productDescriptionRef.current.clearValue();
        productCategoryRef.current.clearValue();
        productImageURLRef.current.clearValue();
        productImageFileRef.current.clearValue();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextInput ref={productNameRef} label="Name" value={productForm.name} informParentOnInputChange={handleChange} />
                <TextInput ref={productDescriptionRef} label="Description" value={productForm.description} informParentOnInputChange={handleChange} />
                <TextInput ref={productPriceRef} label="Price" value={productForm.price} informParentOnInputChange={handleChange} inputType="number" pattern="\d+(\.\d{1,2})?" step="0.01" />
                <TextInput ref={productCategoryRef} label="Category" value={productForm.category} informParentOnInputChange={handleChange} />
                <TextInput ref={productImageURLRef} label="Image URL" value={productForm.imageURL} informParentOnInputChange={handleChange} inputType="url" />

                <FileUpload ref={productImageFileRef} className={'mt-2'} />

                <div className="flex item-center justify-center space-x-6 mt-2">
                    {/* <ButtonElement type={'submit'} className="w-full" label={'Submit'.toUpperCase()} bgColor={'green'} handleButtonClickOnParent={submitForm} /> */}
                    <ButtonElement type={'submit'} className="w-full" label={'Submit'.toUpperCase()} bgColor={'green'} />
                    <ButtonElement type={'button'} className="w-full" label={'Clear'.toUpperCase()} bgColor={'rose'} handleButtonClickOnParent={resetForm} />
                </div>
            </form>
        </>
    );
};

export default AddProductForm;
