using System.ComponentModel.DataAnnotations;

namespace GestionProductos.API.Models;

public class Producto
{
  public int Id {get; set;}
  [Required]
    [MaxLength(100)]
    public string Nombre { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Descripcion { get; set; } = string.Empty;

    [Range(0.01, 999999999)]
    public decimal Precio { get; set; }

    [Range(0, int.MaxValue)]
    public int Stock { get; set; }

    [Required]
    [MaxLength(50)]
    public string TipoProducto { get; set; } = string.Empty;

}