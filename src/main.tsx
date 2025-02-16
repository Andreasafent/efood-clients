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

createRoot(document.getElementById('root')!).render(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route path="/" element={<Home />}></Route>
                        {/* Auth */}
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route path="/profile" element={<Profile />}></Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>

)
