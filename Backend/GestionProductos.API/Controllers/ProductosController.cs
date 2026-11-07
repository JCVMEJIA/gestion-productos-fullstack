
using GestionProductos.API.Data;
using GestionProductos.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GestionProductos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetProductos()
    {
        var productos = await _context.Productos.ToListAsync();
        return Ok(productos);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetProducto(int id)
    {
        var producto = await _context.Productos.FindAsync(id);

        if (producto == null)
            return NotFound(new { mensaje = "Producto no encontrado." });

        return Ok(producto);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CrearProducto(Producto producto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        producto.Id = 0;

        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetProducto),
            new { id = producto.Id },
            producto
        );
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ActualizarProducto(
        int id, Producto datos)
    {
        if (id != datos.Id)
            return BadRequest(new { mensaje = "El ID no coincide." });

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var producto = await _context.Productos.FindAsync(id);

        if (producto == null)
            return NotFound(new { mensaje = "Producto no encontrado." });

        producto.Nombre = datos.Nombre;
        producto.Descripcion = datos.Descripcion;
        producto.Precio = datos.Precio;
        producto.Stock = datos.Stock;
        producto.TipoProducto = datos.TipoProducto;

        await _context.SaveChangesAsync();

        return Ok(producto);
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> EliminarProducto(int id)
    {
        var producto = await _context.Productos.FindAsync(id);

        if (producto == null)
            return NotFound(new { mensaje = "Producto no encontrado." });

        _context.Productos.Remove(producto);
        await _context.SaveChangesAsync();

        return Ok(new { mensaje = "Producto eliminado correctamente." });
    }
}
