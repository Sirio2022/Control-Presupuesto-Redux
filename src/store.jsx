import { configureStore } from '@reduxjs/toolkit';
import NuevoPresupuesto from './redux/nuevoPresupuestoSlice.jsx';

const store = configureStore({
  reducer: {
    Presupuesto: NuevoPresupuesto,
  },
});

export default store;
