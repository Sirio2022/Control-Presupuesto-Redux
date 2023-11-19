import { useSelector } from 'react-redux';

import NuevoPresupuesto from './nuevoPresupuesto';
import ControlPresupuesto from './ControlPresupuesto';

export default function Header() {
  const { isValidPresupuesto } = useSelector((state) => state.Presupuesto);

  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {isValidPresupuesto ? <ControlPresupuesto /> : <NuevoPresupuesto />}
    </header>
  );
}
