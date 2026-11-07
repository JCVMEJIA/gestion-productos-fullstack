
const API_URL = "http://localhost:5152/api/productos";

async function request(endpoint = "", options = {}) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...options.headers
        }
    });

    if (response.status === 204) return null;

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Error en la operación");
    }

    return data;
}

export const getProductos = () => request();

export const crearProducto = (producto) =>
    request("", {
        method: "POST",
        body: JSON.stringify(producto)
    });

export const actualizarProducto = (id, producto) =>
    request(`/${id}`, {
        method: "PUT",
        body: JSON.stringify(producto)
    });

export const eliminarProducto = (id) =>
    request(`/${id}`, {
        method: "DELETE"
    });
