import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../slices/productsSlice';

import AddProductForm from "./AddProductForm.jsx";
import PopUpLayout from '../../ui-ux/PopUpLayout.jsx';
import ProductsCategory from './ProductsCategory.jsx';

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.products);

    useEffect(() => {
        if (loading === 'idle') {
            dispatch(fetchProducts());
        }
    }, [loading, dispatch])

    const productsByCategory = {};
    if (products && products.length > 0) {
        // Group products by category
        products.forEach(product => {
            const categoryName = product.category.toLowerCase();
            if (!productsByCategory[categoryName]) {
                productsByCategory[categoryName] = [];
            }
            productsByCategory[categoryName].push(product);
        });
    }
    const togglePopup = () => {
        console.log('togglePopup clicked');
    }

    let content = '';

    if (loading === 'pending') {
        content = <div>Loading...</div>;
    } else if (loading === 'failed') {
        content = <div>Operation Failed</div>;
    } else if (error) {
        content = <div>Error: {error}</div>;
    } else if (loading === 'succeeded') {
        content =
            <>
                <div className="flex items-center justify-between">
                    <h1 className="text-xl"><strong>{'Products'.toUpperCase()}</strong></h1>
                    <PopUpLayout buttonLabel={'Add Product'.toUpperCase()} >
                        <AddProductForm onCancel={togglePopup} />
                    </PopUpLayout>
                </div>
                {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
                    <ProductsCategory key={category} category={category} products={categoryProducts} className="w-full bg-yellow-500 p-1 m-1 cursor-pointer select-none" />
                ))}
            </>
    }

    return <section>{content && content}</section>;
};

export default ProductList;



// let content;
// if (PostsStatus === 'loading') {
//     content = <p>'Loading...'</p>;
// } else if (PostsStatus === 'succeeded') {
//     const orderPosts = Posts.slice().sort((a, b) => b.date.localeCompare(a.date));
//     content = orderPosts.map(post => (
//         <PostsExcerpt key={post.id} post={post} />
//     ))
// } else if (PostsStatus === 'failed') {
//     content = <p>{PostsError}</p>;
// }

// return (
//     <section>
//         <h2>Posts</h2>
//         {/* {renderedPosts} */}
//         {content}
//     </section>
// )