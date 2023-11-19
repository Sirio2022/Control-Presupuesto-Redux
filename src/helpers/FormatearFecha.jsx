const FormatearFecha = (fecha) => {
  const formatoFecha = new Date(fecha);
  const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
  return formatoFecha.toLocaleDateString('es-ES', opciones);
};

export default FormatearFecha;
