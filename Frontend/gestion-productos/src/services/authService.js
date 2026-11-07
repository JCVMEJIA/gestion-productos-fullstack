
const API_URL = "http://localhost:5152/api";

export async function login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Error al iniciar sesión");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    return data;
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
}

export function getToken() {
    return localStorage.getItem("token");
}

export function getUsuario() {
    const usuario = localStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario) : null;
}
