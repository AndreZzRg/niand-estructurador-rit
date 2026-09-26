import { useState, type JSX } from 'react';

import { Portada } from './brand/Portada';
import { APP, MODULOS, Shell, type ModuloId, type Vista } from './brand/Shell';
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
  // Se abre en la portada: quien llega ve primero de qué se compone la
  // herramienta, en vez de caer dentro del primer módulo sin contexto.
  const [vista, setVista] = useState<Vista>('portada');
  const Panel = vista === 'portada' ? null : PANELES[vista];

  return (
    <Shell vista={vista} onVista={setVista}>
      {Panel ? (
        <Panel />
      ) : (
        <Portada
          titulo={APP.nombre}
          descripcion={APP.resumen}
          modulos={MODULOS}
          onAbrir={(id) => setVista(id as ModuloId)}
        />
      )}
    </Shell>
  );
}
