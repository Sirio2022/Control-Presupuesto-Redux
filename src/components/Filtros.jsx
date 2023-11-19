import { useDispatch, useSelector } from 'react-redux';
import { filtrarGastos } from '../redux/nuevoPresupuestoSlice';

export default function Filtros() {
  const dispatch = useDispatch();

  const { filtro } = useSelector((state) => state.Presupuesto);

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(filtrarGastos(e.target.value));
  };

  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="filtros">Filtrar Gastos</label>
          <select id="filtros" value={filtro} onChange={handleChange}>
            <option value="">-- Todas las Categorías --</option>
            <option value="ahorro">Ahorro</option>
            <option value="casa">Casa</option>
            <option value="comida">Comida</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  );
}
