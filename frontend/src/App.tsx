// CORS error happens when Origin meaning hostname and port are not same on both side - BE & FE.
// 1st Solution is to whitelist the URL at backend like IP or Domain
// 2nd Solution Install CORS package in BACKEND
// 3rd Solution PROXY on configure on vite.config.ts

import { Routes, Route } from 'react-router-dom';

// import ProtectedRoute from './components/shared/ProtectedRoute';
import Login from './components/packages/Access/Login';

import Register from './components/packages/Access/Register';
import NavBar from './components/shared/NavBar.jsx'
import Todo from './components/packages/Todo/Todo.jsx'

import Home from './components/packages/Home/Home.jsx';
import About from './components/packages/About/About.jsx';
import Contacts from './components/packages/Contact/Contact.jsx'
import Services from './components/packages/Services/Services.jsx'

import Products from './components/packages/Products/ListProduct.jsx';

function App() {
    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center">
                <div className="max-w-screen-lg w-full p-4"> {/* Adjust max width and padding as needed */}
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        {/* // element={<PopUpLayout> <Login /> </PopUpLayout>} */}
                        <Route path='/signup' element={<Register />} />
                        <Route path="/products" Component={Products} />
                        <Route path="/todos" Component={Todo} />
                        <Route path='/home' element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path='/contacts' element={<Contacts />} />
                        <Route path="/services" element={<Services />} />

                        {/* Todo */}
                        {/* <Route
                        path='/signup'
                        element={<ProtectedRoute Component={Register} />}
                    /> */}
                    </Routes>
                    {/*
                // Nested Router Example
                <Route path='/todos' element={<Protected Component={Todo} />} >             // Opening the Nested Route Parent
                    <Route path='/new' element={<Protected Component={Todo} />} />          // Self Closing nested route child
                    <Route path='/:todoId' element={<Protected Component={Todo} />} />      // Self Closing nested route child
                    <Route path='/archive' element={<Protected Component={Todo} />} />      // Self Closing nested route child
                </Route>                                                                    // Closing the Nested Route Parent
            */}
                </div>
            </div >
        </>
    );
}

export default App;
