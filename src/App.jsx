import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import {
  selectModalIsOpen,
  selectAnimarModal,
} from './redux/nuevoPresupuestoSlice';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import Filtros from './components/Filtros';

function App() {
  const { isValidPresupuesto, modalIsOpen } = useSelector(
    (state) => state.Presupuesto
  );

  const dispatch = useDispatch();

  const handleNuevoGasto = () => {
    dispatch(selectModalIsOpen(true));

    setTimeout(() => {
      dispatch(selectAnimarModal(true));
    }, 500);
  };

  return (
    <div className={modalIsOpen ? 'fijar' : ''}>
      <Header />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros />
            <ListadoGastos />
          </main>
        </>
      )}

      {isValidPresupuesto && (
        <div className="nuevo-gasto">
          <img
            src={IconoNuevoGasto}
            alt="icono nuevo gasto"
            onClick={handleNuevoGasto}
          />
        </div>
      )}
      {modalIsOpen && <Modal />}
    </div>
  );
}

export default App;
