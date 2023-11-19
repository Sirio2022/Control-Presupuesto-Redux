import PropTypes from 'prop-types';

import {
  LeadingActions,
  TrailingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import {
  editarGasto,
  selectAnimarModal,
  selectModalIsOpen,
  eliminarGasto,
} from '../redux/nuevoPresupuestoSlice';

import FormatearFecha from '../helpers/FormatearFecha';
import FormatearCantidad from '../helpers/FormatearCantidad';

import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastos from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSuscripciones from '../img/icono_suscripciones.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const diccionarioIconos = {
  ahorro: IconoAhorro,
  casa: IconoCasa,
  comida: IconoComida,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones,
};

export default function Gasto({ gasto }) {
  const { gastoEditar } = useSelector((state) => state.Presupuesto);

  const { categoria, nombre, cantidad, id, fecha } = gasto;

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      dispatch(selectModalIsOpen(true));

      setTimeout(() => {
        dispatch(selectAnimarModal(true));
      }, 500);
    }
  }, [gastoEditar, dispatch]);

  const handleEditarGasto = () => {
    dispatch(editarGasto(gasto));
  };
  const leadingActions = () => {
    return (
      <LeadingActions>
        <SwipeAction destructive={false} onClick={handleEditarGasto}>
          Editar
        </SwipeAction>
      </LeadingActions>
    );
  };

  const handleEliminarGasto = () => {
    dispatch(eliminarGasto(id));
  };

  const trailingActions = () => {
    return (
      <TrailingActions>
        <SwipeAction destructive={true} onClick={handleEliminarGasto}>
          Eliminar
        </SwipeAction>
      </TrailingActions>
    );
  };

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={diccionarioIconos[categoria]} alt="icono categoria" />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agragado el: <span>{FormatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">{FormatearCantidad(cantidad)}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}

Gasto.propTypes = {
  gasto: PropTypes.object.isRequired,
};
