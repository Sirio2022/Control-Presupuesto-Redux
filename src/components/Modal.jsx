import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectModalIsOpen,
  selectAnimarModal,
} from '../redux/nuevoPresupuestoSlice';
import CerraModal from '../img/cerrar.svg';
import {
  agregarGasto,
  limpiaGastoEditar,
  editarGastoCreator,
} from '../redux/nuevoPresupuestoSlice';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

export default function Modal() {
  const { gastoEditar } = useSelector((state) => state.Presupuesto);
  const { animarModal } = useSelector((state) => state.Presupuesto);

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
    }
  }, [gastoEditar]);

  const dispatch = useDispatch();
  const ocultarModal = () => {
    dispatch(selectAnimarModal(false));
    dispatch(limpiaGastoEditar());

    setTimeout(() => {
      dispatch(selectModalIsOpen(false));
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes('')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios',
      });
      return;
    }

    if (gastoEditar.id) {
      dispatch(
        editarGastoCreator({
          nombre,
          cantidad,
          categoria,
          id: gastoEditar.id,
          fecha: gastoEditar.fecha,
        })
      );
    } else {
      dispatch(
        agregarGasto({
          nombre,
          cantidad,
          categoria,
          id: uuidv4(),
          fecha: Date.now(),
        })
      );
    }

    dispatch(selectAnimarModal(false));

    setTimeout(() => {
      dispatch(selectModalIsOpen(false));
    }, 500);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerraModal} alt="cerrar-modal" onClick={ocultarModal} />
      </div>

      <form
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
        onSubmit={handleSubmit}
      >
        <legend>{gastoEditar.id ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Ej. Transporte"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Ej. 300"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            onChange={(e) => setCategoria(e.target.value)}
            value={categoria}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="casa">Casa</option>
            <option value="comida">Comida</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={gastoEditar.id ? 'Guardar Cambios' : 'Añadir Gasto'}
        />
      </form>
    </div>
  );
}
