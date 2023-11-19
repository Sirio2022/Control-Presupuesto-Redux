import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetApp } from '../redux/nuevoPresupuestoSlice';
import FormatearCantidad from '../helpers/FormatearCantidad';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Swal from 'sweetalert2';

export default function ControlPresupuesto() {
  const [gastado, setGastado] = useState(0);
  const [disponible, setDisponible] = useState(0);

  const { presupuesto, gastos } = useSelector((state) => state.Presupuesto);

  const dispatch = useDispatch();

  useEffect(() => {
    const gastado = gastos.reduce((total, gasto) => {
      return total + gasto.cantidad;
    }, 0);
    setTimeout(() => {
      setGastado(gastado);
    }, 500);

    const disponible = presupuesto - gastado;
    setTimeout(() => {
      setDisponible(disponible);
    }, 500);
  }, [gastos, presupuesto]);

  const porcentaje = presupuesto ? (gastado / presupuesto) * 100 : 0;

  const handleClick = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se borrará todo el presupuesto y los gastos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b83f6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar todo',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetApp());
      }
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#dc2626' : '#3b83f6',
            trailColor: '#d6d6d6',
            textColor: porcentaje > 100 ? '#dc2626' : '#3b83f6',
          })}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleClick}>
          Resetear APP
        </button>
        <p>
          <span>Presupuesto: </span> {FormatearCantidad(presupuesto)}
        </p>

        <p>
          <span>Gastado: </span> {FormatearCantidad(gastado)}
        </p>

        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {FormatearCantidad(disponible)}
        </p>
      </div>
    </div>
  );
}
