import React, { useState } from 'react';

import ActionButton from '../../ui-ux/ActionButton'
import CarrotIcon from '../../../assets/svgFiles/caret-right.svg?react'

import FormatPrice from '../../ui-ux/FormatPrice'
import Tooltip from '../../ui-ux/Tooltip'

import EditIcon from '../../../assets/svgFiles/edit.svg?react';
import DeleteIcon from '../../../assets/svgFiles/delete.svg?react';

import { useDispatch, useSelector } from 'react-redux';
// import { deleteProduct, updateProduct } from '../../../slices/productsSlice';
import { deleteProduct, updateProduct } from '../../../slices/productsSlice';

const Column = ({ width, children }) => {
    return <div className={`py-1 text-center border-b border-blue-500 ${width ? `w-${width}` : 'flex-1'} min-w-min`}><strong>{children}</strong></div>;
};

const ProductsCategory = ({ category, products, ...props }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const dispatch = useDispatch();

    // For call and pass value
    // const spanMouseEnter = (index) => {
    //     setHoveredIndex(index);
    // }

    // curried function and see how the index is passed to arrow function.
    const spanMouseEnter = index => () => {
        setHoveredIndex(index);
    };

    const spanMouseLeave = () => {
        setHoveredIndex(-1);
    }

    let count = 0;
    const changeCollapsedState = (event) => {
        event.preventDefault();
        setCollapsed(!collapsed)
    }

    const handleUpdateClick = (id, name, price, description, category) => {
        console.log(id);
        dispatch(updateProduct({
            productId: id,
            productName: name,
            productPrice: price,
            productDescription: description,
            productCategory: category,
        }));
    };

    const handleDeleteClick = (id, name) => {
        console.log(id, name);
        dispatch(deleteProduct({ productId: id, productName: name }));
    };

    return (
        <>
            <ActionButton bgColor="yellow" onClick={changeCollapsedState} className="w-full mt-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <CarrotIcon style={{ transform: `rotate(${collapsed ? '0' : '90'}deg)`, transition: 'transform 0.3s ease' }} />
                        <h2 className="ml-2">{category.toUpperCase()}</h2>
                    </div>
                    <div className="text-sm italic p-2">
                        {products.length} items
                    </div>
                </div>
            </ActionButton>
            {!collapsed && (
                <div>
                    <div className="flex">
                        <Column width='10'>ID</Column>
                        <Column >Name</Column>
                        <Column >Price</Column>
                        <Column >Image URL</Column>
                        <Column >Image File</Column>
                        <Column width='16'>Actions</Column>
                    </div>

                    {products.map((product, index) => (
                        <div key={product.id + '_' + index} className="flex mt-1 mb-1 border-b border-blue-500 pb-1">
                            <div className="w-10 border-r border-blue-500 flex justify-center p-1">{++count}</div>
                            {/* <div className="flex-1 border-r border-blue-500 p-1"> */}
                            {/* Inline Execution */}
                            {/* <span
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(-1)}
                                    className="relative"
                                > */}
                            {/* Call Function and Pass on Mouse Enter */}
                            {/* <span
                                    onMouseEnter={() => spanMouseEnter(index)}
                                    onMouseLeave={spanMouseLeave}
                                    className="relative"
                                > */}
                            {/* Currying Up Execution check the function definition*/}
                            {/* <span
                                    onMouseEnter={spanMouseEnter(index)}
                                    onMouseLeave={spanMouseLeave}
                                    className="relative"
                                > */}
                            {/* {product.name} */}
                            {/* </span> */}
                            {/* </div> */}
                            <div className="flex-1 border-r border-blue-500 p-1">
                                <span className="relative"
                                    onMouseEnter={spanMouseEnter(index)}
                                    onMouseLeave={spanMouseLeave}>
                                    {product.name}
                                </span>
                                {hoveredIndex === index && (
                                    <Tooltip text={product.description} />
                                )}
                            </div>
                            <div className="flex-1 border-r border-blue-500 p-1"> <FormatPrice amount={product.price} symbol={'₹'} /> </div>
                            <div className="flex-1 border-r border-blue-500 p-1">{product.imageURL}</div>
                            <div className="flex-1 border-r border-blue-500 p-1">{product.imageFile}</div>
                            <div className="w-16 ml-auto flex items-center justify-center">
                                <ActionButton bgColor="green" className='h-8 w-8 flex items-center justify-center' onClick={() => handleUpdateClick(product.id, product.name)} >
                                    <EditIcon />
                                </ActionButton>
                                {/* <ActionButton bgColor="red" onClick={() => dispatch(removeTodo(todo.id))} > */}
                                <ActionButton bgColor="red" className='h-8 w-8 flex items-center justify-center' onClick={() => handleDeleteClick(product.id, product.name)} >
                                    <DeleteIcon />
                                </ActionButton>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ProductsCategory

