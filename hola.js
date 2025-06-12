/**
 * Procesa una lista de pedidos y genera un resumen con estadísticas.
 * @param {Array} pedidos - Lista de objetos con { id, cliente, monto, entregado }
 * @returns {Object} Resumen con estadísticas
 */
function procesarPedidos(pedidos) {
  if (!Array.isArray(pedidos)) {
    throw new Error("El parámetro debe ser un array de pedidos.");
  }

  const resumen = {
    totalPedidos: 0,
    totalEntregados: 0,
    totalPendientes: 0,
    montoTotal: 0,
    clientesFrecuentes: []
  };

  const conteoClientes = {};

  for (const pedido of pedidos) {
    if (!pedido || typeof pedido !== 'object') continue;

    const { id, cliente, monto, entregado } = pedido;

    if (typeof id !== 'number' || typeof cliente !== 'string' || typeof monto !== 'number') {
      continue; // salto si los datos son inválidos
    }

    resumen.totalPedidos++;
    resumen.montoTotal += monto;

    if (entregado) {
      resumen.totalEntregados++;
    } else {
      resumen.totalPendientes++;
    }

    // Conteo por cliente
    if (!conteoClientes[cliente]) {
      conteoClientes[cliente] = 1;
    } else {
      conteoClientes[cliente]++;
    }
  }

  // Detectar clientes frecuentes
  for (const [cliente, cantidad] of Object.entries(conteoClientes)) {
    if (cantidad >= 3) {
      resumen.clientesFrecuentes.push(cliente);
    }
  }

  return resumen;
}