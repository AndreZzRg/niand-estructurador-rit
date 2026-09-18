/**
 * Módulo «Validación de contenido mínimo»: qué falta y qué quedó desactualizado.
 */
import { CircleCheck, TriangleAlert } from 'lucide-react';

import { Dato, Insignia, Llamado, Tabla, Tarjeta, Td, Th, type Tono } from '../brand/ui';
import { CAPITULOS, avanceDe, validar } from '../domain/rit';
import { useEstado } from '../store';

const TONO: Record<'faltante' | 'incompleto' | 'desactualizado', Tono> = {
  faltante: 'riesgo',
  incompleto: 'alerta',
  desactualizado: 'riesgo',
};

const ROTULO = {
  faltante: 'Falta',
  incompleto: 'Incompleto',
  desactualizado: 'Desactualizado',
} as const;

export function PanelValidacion() {
  const contenidos = useEstado((s) => s.contenidos);
  const hallazgos = validar(contenidos);
  const avance = avanceDe(contenidos);
  const obligatorios = CAPITULOS.filter((c) => c.obligatorio).length;

  const cuenta = (g: keyof typeof ROTULO) => hallazgos.filter((h) => h.gravedad === g).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <Dato
          rotulo="Capítulos obligatorios"
          valor={`${avance.obligatorios} / ${obligatorios}`}
          tono={avance.obligatorios === obligatorios ? 'ok' : 'riesgo'}
        />
        <Dato rotulo="Faltantes" valor={cuenta('faltante')} tono="riesgo" />
        <Dato rotulo="Incompletos" valor={cuenta('incompleto')} tono="alerta" />
        <Dato rotulo="Desactualizados" valor={cuenta('desactualizado')} tono="riesgo" />
      </div>

      {cuenta('desactualizado') > 0 && (
        <Llamado
          tono="riesgo"
          titulo="Hay texto anterior a la reforma"
          icono={<TriangleAlert size={18} />}
        >
          Estas señales delatan un reglamento redactado antes de la Ley 2466 de 2025 o de la Ley
          2101 de 2021. Son justo lo que un inspector busca para establecer si el reglamento se
          actualizó de verdad o solo se le cambió la fecha.
        </Llamado>
      )}

      {hallazgos.length === 0 ? (
        <Llamado tono="ok" titulo="Sin hallazgos" icono={<CircleCheck size={18} />}>
          Los capítulos obligatorios están redactados, desarrollan los elementos exigidos y no
          conservan texto anterior a la reforma. Esta validación es estructural:{' '}
          <strong>no sustituye la revisión jurídica</strong> del articulado.
        </Llamado>
      ) : (
        <Tarjeta titulo="Hallazgos" descripcion="Ordenados por capítulo.">
          <Tabla>
            <thead>
              <tr>
                <Th>Capítulo</Th>
                <Th>Hallazgo</Th>
                <Th>Detalle</Th>
              </tr>
            </thead>
            <tbody>
              {hallazgos.map((h, i) => (
                <tr key={`${h.capituloId}-${i}`}>
                  <Td>
                    <span className="font-medium">{h.titulo}</span>
                    <span className="eyebrow block">{h.norma}</span>
                  </Td>
                  <Td>
                    <Insignia tono={TONO[h.gravedad]}>{ROTULO[h.gravedad]}</Insignia>
                  </Td>
                  <Td className="text-sm text-texto-2">{h.mensaje}</Td>
                </tr>
              ))}
            </tbody>
          </Tabla>
        </Tarjeta>
      )}

      <Tarjeta
        titulo="Qué revisa esta validación y qué no"
        descripcion="La franqueza sobre el alcance es parte de la herramienta."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-senal/35 bg-senal/6 p-4">
            <p className="mb-2 font-display text-sm font-semibold">Sí revisa</p>
            <ul className="space-y-1 text-sm text-texto-2">
              <li>· Que cada capítulo obligatorio esté redactado.</li>
              <li>· Que mencione los elementos exigidos por la norma.</li>
              <li>· Que no conserve la jornada diurna hasta las 9:00 p. m.</li>
              <li>· Que no cite el recargo dominical del 75 %.</li>
              <li>· Que no conserve la jornada de 48 horas semanales.</li>
              <li>· Que no mencione la aprobación del Ministerio, ya suprimida.</li>
              <li>· Que no conserve restricciones laborales por sexo.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-alerta/35 bg-alerta/6 p-4">
            <p className="mb-2 font-display text-sm font-semibold">No revisa</p>
            <ul className="space-y-1 text-sm text-texto-2">
              <li>· Si el contenido es jurídicamente correcto.</li>
              <li>· Si las sanciones son proporcionadas a las faltas.</li>
              <li>· Si los términos internos son razonables y cumplibles.</li>
              <li>· Si el articulado contradice una convención colectiva.</li>
              <li>· Si las cláusulas son ineficaces por desmejorar derechos.</li>
            </ul>
            <p className="mt-3 text-xs text-texto-3">
              Todo eso exige revisión jurídica profesional antes de adoptar el reglamento.
            </p>
          </div>
        </div>
      </Tarjeta>
    </div>
  );
}
