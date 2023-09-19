import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from "./context/AuthContext.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import SignInPage from "./pages/signin.jsx";
import SignUpPage from "./pages/register.jsx";


const queryClient = new QueryClient()
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <SignInPage />,
    },
    {
        path: "/register",
        element: <SignUpPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
