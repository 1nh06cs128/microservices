import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import './index.css'
import { store } from "./app/store.js";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from "./hooks/useAuth.jsx";

// import { fetchUsers } from "./features/Users/usersSlice.js";

// store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <AuthProvider> {/* Auth Provider works within BrowserRouter. */}
                    <App />
                </AuthProvider>
            </Router>
        </Provider>
    </React.StrictMode>
);
