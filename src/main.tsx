import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import MainLayout from './layouts/MainLayout.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import Profile from './pages/Profile.tsx'
import AuthRoute from './components/helper/AuthRoute.tsx'
import Stores from './pages/Stores.tsx'
import NoAuthRoute from './components/helper/NoAuthRoute.tsx'
import Store from './pages/Store.tsx'
import Checkout from './pages/Checkout.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={
                        <NoAuthRoute>
                            <Home />
                        </NoAuthRoute>                        
                    }/>
                    {/* Auth */}
                    <Route path="/login" element={
                        <NoAuthRoute>
                            <Login />
                        </NoAuthRoute>
                    }/>
                    <Route path="/register" element={
                        <NoAuthRoute>
                            <Register />
                        </NoAuthRoute>
                    }/>
                    <Route path="/stores" element={
                        <AuthRoute>
                            <Stores />
                        </AuthRoute>
                    } />
                    <Route path="/stores/:id" element={
                        <AuthRoute>
                            <Store />
                        </AuthRoute>
                    } />
                    <Route path="/stores/:id/checkout" element={
                        <AuthRoute>
                            <Checkout />
                        </AuthRoute>
                    } />
                    <Route path="/profile" element={
                        <AuthRoute>
                            <Profile />
                        </AuthRoute>
                    } />
                </Route>
            </Routes>
        </AuthProvider>
    </BrowserRouter>

)
