export default function FormatearCantidad(cantidad) {
  return cantidad.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
}
