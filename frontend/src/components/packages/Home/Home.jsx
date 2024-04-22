import React, { useState } from 'react';

import Products from "../Products/ListProduct";

import Counter from "../../../features/Counter/Counter"
// import AddProductForm from "../Products/AddProductForm";

const Home = () => {

    return (
        <>
            {/* <AddProductForm /> */}
            
            <Products />
        </>
    );
};

export default Home;