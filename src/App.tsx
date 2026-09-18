import { useState, type JSX } from 'react';

import { Shell, type ModuloId } from './brand/Shell';
import { PanelCapitulos } from './features/PanelCapitulos';
import { PanelExportacion } from './features/PanelExportacion';
import { PanelPerfil } from './features/PanelPerfil';
import { PanelValidacion } from './features/PanelValidacion';
import { PanelVistaPrevia } from './features/PanelVistaPrevia';

const PANELES: Record<ModuloId, () => JSX.Element> = {
  'perfil-de-la-empresa': PanelPerfil,
  capitulos: PanelCapitulos,
  'validacion-de-contenido-minimo': PanelValidacion,
  'vista-previa-del-articulado': PanelVistaPrevia,
  exportacion: PanelExportacion,
};

export default function App() {
  const [modulo, setModulo] = useState<ModuloId>('perfil-de-la-empresa');
  const Panel = PANELES[modulo];

  return (
    <Shell moduloActivo={modulo} onModulo={setModulo}>
      <Panel />
    </Shell>
  );
}
