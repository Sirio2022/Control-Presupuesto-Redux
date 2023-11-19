import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Gasto from './Gasto';
import { gastosFiltradosFunction } from '../redux/nuevoPresupuestoSlice';

export default function ListadoGastos() {
  const { gastos, filtro, gastosFiltrados } = useSelector(
    (state) => state.Presupuesto
  );

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltro = gastos.filter((gasto) => gasto.categoria === filtro);
      dispatch(gastosFiltradosFunction(gastosFiltro));
    }
  }, [filtro, dispatch, gastos]);

  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length
              ? 'Tus Gastos'
              : 'No tienes gastos en esta categoría'}
          </h2>

          {gastosFiltrados.map((gasto) => (
            <Gasto key={gasto.id} gasto={gasto} />
          ))}
        </>
      ) : (
        <>
          <h2>
            {gastosFiltrados.length ? 'Tus Gastos' : 'No tienes gastos aún'}
          </h2>
          {gastos.map((gasto) => (
            <Gasto key={gasto.id} gasto={gasto} />
          ))}
        </>
      )}
    </div>
  );
}
