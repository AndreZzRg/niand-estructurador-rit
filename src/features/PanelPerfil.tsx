/**
 * Módulo «Perfil de la empresa»: datos que encabezan el reglamento y que
 * determinan si adoptarlo es obligatorio.
 */
import { Info, ScrollText } from 'lucide-react';

import { Campo, Dato, Entrada, Llamado, Seleccion, Tarjeta } from '../brand/ui';
import { CAPITULOS, ORIGENES, avanceDe, debeAdoptarReglamento } from '../domain/rit';
import type { Sector } from '../domain/rit';
import { useEstado } from '../store';

const SECTORES: ReadonlyArray<[Sector, string]> = [
  ['comercial', 'Comercial'],
  ['servicios', 'Servicios'],
  ['industrial', 'Industrial'],
  ['agricola', 'Agrícola, ganadera o forestal'],
];

export function PanelPerfil() {
  const { empresa, contenidos, setEmpresa } = useEstado();
  const obligacion = debeAdoptarReglamento(empresa.sector, empresa.trabajadores);
  const avance = avanceDe(contenidos);
  const obligatorios = CAPITULOS.filter((c) => c.obligatorio).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <Dato
          rotulo="¿Obligada a tener RIT?"
          valor={obligacion.obligado ? 'Sí' : 'No'}
          tono={obligacion.obligado ? 'riesgo' : 'ok'}
          detalle={`Umbral: más de ${obligacion.umbral} trabajadores`}
        />
        <Dato
          rotulo="Capítulos redactados"
          valor={`${avance.redactados} / ${avance.total}`}
          tono="marca"
        />
        <Dato
          rotulo="Obligatorios cubiertos"
          valor={`${avance.obligatorios} / ${obligatorios}`}
          tono={avance.obligatorios === obligatorios ? 'ok' : 'alerta'}
        />
        <Dato rotulo="Vigencia prevista" valor={empresa.fechaVigencia} />
      </div>

      <Llamado
        tono={obligacion.obligado ? 'alerta' : 'info'}
        titulo="Obligación de adoptar reglamento (CST, art. 105)"
        icono={<ScrollText size={18} />}
      >
        {obligacion.explicacion}
      </Llamado>

      <Llamado
        tono="riesgo"
        titulo="El plazo de la Ley 2466 venció el 25 de junio de 2026"
        icono={<Info size={18} />}
      >
        La Circular 0048 de 2026 del Ministerio del Trabajo precisó que no haber actualizado el
        reglamento <strong>no justifica dejar de aplicar las garantías de debido proceso</strong>:
        la empresa queda obligada igual, pero sin el documento que le permite probar que las aplica.
      </Llamado>

      <Tarjeta
        titulo="Datos de la empresa"
        descripcion="Encabezan el articulado y se usan en la exportación."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo etiqueta="Razón social" requerido>
            {(id) => (
              <Entrada
                id={id}
                value={empresa.razonSocial}
                placeholder="Empresa S.A.S."
                onChange={(e) => setEmpresa({ razonSocial: e.target.value })}
              />
            )}
          </Campo>
          <Campo etiqueta="NIT">
            {(id) => (
              <Entrada
                id={id}
                value={empresa.nit}
                placeholder="900.000.000-1"
                onChange={(e) => setEmpresa({ nit: e.target.value })}
              />
            )}
          </Campo>
          <Campo etiqueta="Ciudad del domicilio principal">
            {(id) => (
              <Entrada
                id={id}
                value={empresa.ciudad}
                onChange={(e) => setEmpresa({ ciudad: e.target.value })}
              />
            )}
          </Campo>
          <Campo etiqueta="Sector" ayuda="Determina el umbral del art. 105 del CST.">
            {(id) => (
              <Seleccion
                id={id}
                value={empresa.sector}
                onChange={(e) => setEmpresa({ sector: e.target.value as Sector })}
              >
                {SECTORES.map(([v, r]) => (
                  <option key={v} value={v}>
                    {r}
                  </option>
                ))}
              </Seleccion>
            )}
          </Campo>
          <Campo etiqueta="Trabajadores permanentes">
            {(id) => (
              <Entrada
                id={id}
                type="number"
                min={1}
                value={empresa.trabajadores}
                onChange={(e) => setEmpresa({ trabajadores: Number(e.target.value) })}
              />
            )}
          </Campo>
          <Campo etiqueta="Fecha de entrada en vigencia">
            {(id) => (
              <Entrada
                id={id}
                type="date"
                value={empresa.fechaVigencia}
                onChange={(e) => setEmpresa({ fechaVigencia: e.target.value })}
              />
            )}
          </Campo>
        </div>
      </Tarjeta>

      <Tarjeta
        titulo="De dónde viene cada capítulo"
        descripcion="El art. 108 fija el contenido mínimo; las demás obligaciones llegaron después."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(ORIGENES).map(([id, info]) => {
            const total = CAPITULOS.filter((c) => c.origen === id).length;
            if (total === 0) return null;
            return (
              <div key={id} className="rounded-xl border border-borde bg-superficie-3 px-4 py-3">
                <p className="eyebrow">{info.norma}</p>
                <p className="mt-0.5 text-sm font-medium">{info.rotulo}</p>
                <p className="cifra mt-1 font-display text-xl font-semibold text-marca">{total}</p>
              </div>
            );
          })}
        </div>
      </Tarjeta>
    </div>
  );
}
