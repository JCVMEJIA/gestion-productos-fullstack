
import { createContext, useContext, useState } from "react";
import { login as loginService, logout as logoutService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const saved = localStorage.getItem("usuario");
        return saved ? JSON.parse(saved) : null;
    });

    const login = async (email, password) => {
        const data = await loginService(email, password);
        setUsuario(data.usuario);
    };

    const logout = () => {
        logoutService();
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
