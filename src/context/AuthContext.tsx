import { createContext, useContext, useEffect, useState } from "react"
import { LoginCredentials, LoginResponse, RegisterCredentials, RegisterResponse, User } from "../types/user";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router";

const AuthContext = createContext<{
    user: User | null, 
    token: string | null, 
    login: (credentials: LoginCredentials) => void,
	register: (credentials: RegisterCredentials) => void,
    logout: () => void,
}>({
    user: null,
    token: null,
    login: () => null,
    logout: () => null,
    register: () => null,
});

export const AuthProvider = ({ children })=>{
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
	const navigate = useNavigate();

    useEffect(()=>{
        if (token) {
            axiosInstance.get("/client/users/me")
                .then((response) => {
                    console.log(response.data);
                    setUser(response.data);
                })
        }
    }, [token]);

    const login = ({email, password}: LoginCredentials) => {
		axiosInstance.post<LoginResponse>(
			"/client/auth/login", 
			{email, password}
		)
			.then((response) =>{
				if(!response.data.success) {
					return;
				};
				const data = response.data.data;
				afterAuthentication(data);
			})
	};

    const register = ({name, email, password}: RegisterCredentials) => {
		axiosInstance.post<RegisterResponse>(
			"/client/auth/register", 
			{name, email, password}
		)
			.then((response) =>{
				if(!response.data.success) {
					return;
				};

				const data = response.data.data;
				afterAuthentication(data);
				
			})
	};

	const afterAuthentication = (data: RegisterResponse["data"] | LoginResponse["data"])=>{
		setUser(data.user);
		setToken(data.token);
		localStorage.setItem("token", data.token);
		navigate("/");
	}
	
	const logout = () =>{
		setUser(null);
		setToken(null);
		localStorage.removeItem("token");

	}

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
