const http = require('http');
const exceljs = require('exceljs');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  try {
    // Validación de rutas
    if (req.url !== '/reporte') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Visita /reporte para descargar el Excel');
      return;
    }

    // Generar el archivo Excel en memoria
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Ventas');

    // Agregar las cabeceras (títulos de columnas)
    worksheet.columns = [
      { header: 'Producto', key: 'producto', width: 30 },
      { header: 'Cantidad', key: 'cantidad', width: 10 },
      { header: 'Precio', key: 'precio', width: 15 }
    ];

    // Agregar datos de ejemplo (20 filas)
    const productos = [
      { producto: 'Producto A', cantidad: 5, precio: 10 },
      { producto: 'Producto B', cantidad: 3, precio: 15 },
      { producto: 'Producto C', cantidad: 7, precio: 12 },
      { producto: 'Producto D', cantidad: 2, precio: 20 },
      { producto: 'Producto E', cantidad: 4, precio: 25 },
      { producto: 'Producto F', cantidad: 1, precio: 18 },
      { producto: 'Producto G', cantidad: 8, precio: 8 },
      { producto: 'Producto H', cantidad: 6, precio: 10 },
      { producto: 'Producto I', cantidad: 3, precio: 12 },
      { producto: 'Producto J', cantidad: 9, precio: 5 },
      { producto: 'Producto K', cantidad: 2, precio: 30 },
      { producto: 'Producto L', cantidad: 4, precio: 20 },
      { producto: 'Producto M', cantidad: 5, precio: 22 },
      { producto: 'Producto N', cantidad: 7, precio: 14 },
      { producto: 'Producto O', cantidad: 1, precio: 25 },
      { producto: 'Producto P', cantidad: 10, precio: 9 },
      { producto: 'Producto Q', cantidad: 8, precio: 17 },
      { producto: 'Producto R', cantidad: 6, precio: 11 },
      { producto: 'Producto S', cantidad: 3, precio: 13 },
      { producto: 'Producto T', cantidad: 4, precio: 28 }
    ];

    // Insertar las filas de datos
    productos.forEach(producto => {
      worksheet.addRow(producto);
    });

    // Configurar las cabeceras HTTP para forzar la descarga del archivo .xlsx
    res.writeHead(200, {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="ventas.xlsx"'
    });

    // Enviar el archivo Excel al cliente en streaming
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Error al generar el archivo Excel:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Ocurrió un error al generar el archivo Excel.');
  }
});

// Iniciar el servidor en el puerto 3000
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
