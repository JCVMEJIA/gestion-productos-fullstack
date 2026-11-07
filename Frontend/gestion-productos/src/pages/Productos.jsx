
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from "../services/productService";

const productoInicial = {
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    tipoProducto: ""
};

export default function Productos() {
    const { usuario, logout } = useAuth();

    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState(productoInicial);
    const [editando, setEditando] = useState(null);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);

    const esAdmin = usuario?.rol === "Admin";

    const cargarProductos = async () => {
        try {
            setError("");
            const data = await getProductos();
            setProductos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const cambiarCampo = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const guardarProducto = async (e) => {
        e.preventDefault();

        const producto = {
            ...form,
            precio: Number(form.precio),
            stock: Number(form.stock)
        };

        try {
            if (editando !== null) {
                await actualizarProducto(editando, {
                    ...producto,
                    id: editando
                });
            } else {
                await crearProducto(producto);
            }

            setForm(productoInicial);
            setEditando(null);
            await cargarProductos();
        } catch (err) {
            setError(err.message);
        }
    };

    const editar = (producto) => {
        setEditando(producto.id);
        setForm({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            tipoProducto: producto.tipoProducto
        });
    };

    const eliminar = async (id) => {
        if (!window.confirm("¿Deseas eliminar este producto?")) return;

        try {
            await eliminarProducto(id);
            await cargarProductos();
        } catch (err) {
            setError(err.message);
        }
    };

    const cerrarSesion = () => {
        logout();
    };

    return (
        <main className="dashboard">
            <header className="dashboard-header">
                <div>
                    <h1>Gestión de productos</h1>
                    <p>
                        Bienvenido, {usuario?.nombre} · Rol: {usuario?.rol}
                    </p>
                </div>
                <button className="secondary-button" onClick={cerrarSesion}>
                    Cerrar sesión
                </button>
            </header>

            {error && <div className="error-message">{error}</div>}

            {esAdmin && (
                <section className="product-form">
                    <h2>{editando ? "Editar producto" : "Nuevo producto"}</h2>

                    <form onSubmit={guardarProducto}>
                        <input
                            name="nombre"
                            placeholder="Nombre"
                            value={form.nombre}
                            onChange={cambiarCampo}
                            maxLength="100"
                            required
                        />

                        <input
                            name="descripcion"
                            placeholder="Descripción"
                            value={form.descripcion}
                            onChange={cambiarCampo}
                            maxLength="500"
                        />

                        <input
                            name="precio"
                            type="number"
                            placeholder="Precio"
                            value={form.precio}
                            onChange={cambiarCampo}
                            min="0.01"
                            step="0.01"
                            required
                        />

                        <input
                            name="stock"
                            type="number"
                            placeholder="Stock"
                            value={form.stock}
                            onChange={cambiarCampo}
                            min="0"
                            step="1"
                            required
                        />

                        <input
                            name="tipoProducto"
                            placeholder="Tipo de producto"
                            value={form.tipoProducto}
                            onChange={cambiarCampo}
                            maxLength="50"
                            required
                        />

                        <div className="form-actions">
                            <button type="submit">
                                {editando ? "Guardar cambios" : "Crear producto"}
                            </button>

                            {editando !== null && (
                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={() => {
                                        setEditando(null);
                                        setForm(productoInicial);
                                    }}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </section>
            )}

            <section className="products-section">
                <h2>Inventario de productos</h2>

                {cargando ? (
                    <p>Cargando productos...</p>
                ) : productos.length === 0 ? (
                    <p>No hay productos registrados.</p>
                ) : (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Tipo</th>
                                    {esAdmin && <th>Acciones</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto) => (
                                    <tr key={producto.id}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.descripcion}</td>
                                        <td>${Number(producto.precio).toFixed(2)}</td>
                                        <td>{producto.stock}</td>
                                        <td>{producto.tipoProducto}</td>
                                        {esAdmin && (
                                            <td>
                                                <button
                                                    className="small-button"
                                                    onClick={() => editar(producto)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="delete-button"
                                                    onClick={() => eliminar(producto.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}
