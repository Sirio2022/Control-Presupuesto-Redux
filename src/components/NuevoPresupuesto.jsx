import { useDispatch, useSelector } from 'react-redux';
import {
  selectPresupuesto,
  selectValidPresupuesto,
} from '../redux/nuevoPresupuestoSlice.jsx';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

export default function NuevoPresupuesto() {
  const { presupuesto } = useSelector((state) => state.Presupuesto);

  const dispatch = useDispatch();

  const handlePesupuesto = (e) => {
    const presupuesto = parseInt(e.target.value);

    dispatch(selectPresupuesto(presupuesto));
    localStorage.setItem('presupuesto', presupuesto || 0);
  };

  useEffect(() => {
    const presupuesto = parseInt(localStorage.getItem('presupuesto') || 0);

    if (presupuesto > 0) {
      dispatch(selectValidPresupuesto(true));
    }
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (presupuesto === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El presupuesto debe ser mayor a 0',
      });
      return;
    }

    dispatch(selectValidPresupuesto(true));
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="presupuesto">Definir Presupuesto</label>
          <input
            id="presupuesto"
            type="number"
            className="nuevo-presupuesto"
            placeholder="Coloca tu presupuesto"
            value={presupuesto || ''}
            onChange={handlePesupuesto}
            min={0}
          />
        </div>
        <input
          type="submit"
          className="button-primary u-full-width"
          value="Definir Presupuesto"
        />
      </form>
    </div>
  );
}
