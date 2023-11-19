import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  presupuesto: localStorage.getItem('presupuesto' || 0),
  isValidPresupuesto: false,
  modalIsOpen: false,
  animarModal: false,
  gastos: localStorage.getItem('gastos')
    ? JSON.parse(localStorage.getItem('gastos'))
    : [],
  gastoEditar: {},
  filtro: '',
  gastosFiltrados: [],
};

const nuevoPresupuestoSlice = createSlice({
  name: 'Presupuesto',
  initialState,
  reducers: {
    agregarPresupuestoAction(state, action) {
      state.presupuesto = action.payload;
    },
    cambiarValidPresupuestoAction(state, action) {
      state.isValidPresupuesto = action.payload;
    },
    cambiarModalIsOpenAction(state, action) {
      state.modalIsOpen = action.payload;
    },
    cambiarAnimarModalAction(state, action) {
      state.animarModal = action.payload;
    },
    almacenarGastosAction(state, action) {
      state.gastos = [...state.gastos, action.payload];
    },
    almacenarGastoEditarAction(state, action) {
      state.gastoEditar = action.payload;
    },
    limpiaGastoEditarAction(state) {
      state.gastoEditar = {};
    },
    editarGastoAction(state, action) {
      state.gastos = state.gastos.map((gasto) =>
        gasto.id === action.payload.id ? action.payload : gasto
      );
    },
    eliminarGastoAction(state, action) {
      state.gastos = state.gastos.filter(
        (gasto) => gasto.id !== action.payload
      );
    },
    filtrarGastosAction(state, action) {
      state.filtro = action.payload;
    },
    gastosFiltradosAction(state, action) {
      state.gastosFiltrados = action.payload;
    },
    resetAppAction() {
      localStorage.clear();
      window.location.reload();
    },
  },
});

export const {
  agregarPresupuestoAction,
  cambiarValidPresupuestoAction,
  cambiarModalIsOpenAction,
  cambiarAnimarModalAction,
  almacenarGastosAction,
  almacenarGastoEditarAction,
  limpiaGastoEditarAction,
  editarGastoAction,
  eliminarGastoAction,
  filtrarGastosAction,
  gastosFiltradosAction,
  resetAppAction,
} = nuevoPresupuestoSlice.actions;

export default nuevoPresupuestoSlice.reducer;

export const selectPresupuesto = (presupuesto) => (dispatch) => {
  dispatch(agregarPresupuestoAction(presupuesto));
};

export const selectValidPresupuesto = (isValid) => (dispatch) => {
  dispatch(cambiarValidPresupuestoAction(isValid));
};

export const selectModalIsOpen = (isOpen) => (dispatch) => {
  dispatch(cambiarModalIsOpenAction(isOpen));
};

export const selectAnimarModal = (animar) => (dispatch) => {
  dispatch(cambiarAnimarModalAction(animar));
};

export const agregarGasto = (gasto) => (dispatch) => {
  dispatch(almacenarGastosAction(gasto));
};

export const editarGasto = (gasto) => (dispatch) => {
  dispatch(almacenarGastoEditarAction(gasto));
};

export const limpiaGastoEditar = () => (dispatch) => {
  dispatch(limpiaGastoEditarAction());
};

export const editarGastoCreator = (gasto) => (dispatch) => {
  dispatch(editarGastoAction(gasto));
};

export const eliminarGasto = (id) => (dispatch) => {
  dispatch(eliminarGastoAction(id));
};

export const filtrarGastos = (filtro) => (dispatch) => {
  dispatch(filtrarGastosAction(filtro));
};

export const gastosFiltradosFunction = (gastos) => (dispatch) => {
  dispatch(gastosFiltradosAction(gastos));
};

export const resetApp = () => (dispatch) => {
  dispatch(resetAppAction());
};
