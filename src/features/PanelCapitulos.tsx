/**
 * Módulo «Capítulos»: redacción guiada, capítulo por capítulo.
 */
import { useState } from 'react';
import { Eraser, FileStack, Wand2 } from 'lucide-react';

import { AreaTexto, Boton, Insignia, Llamado, Tarjeta, cx } from '../brand/ui';
import { CAPITULOS, ORIGENES } from '../domain/rit';
import { useEstado } from '../store';

export function PanelCapitulos() {
  const { contenidos, escribir, cargarModelo, cargarTodosLosModelos, limpiar } = useEstado();
  const [activo, setActivo] = useState(CAPITULOS[0]!.id);
  const capitulo = CAPITULOS.find((c) => c.id === activo)!;
  const texto = contenidos[activo] ?? '';

  return (
    <div className="space-y-6">
      <Llamado tono="alerta" titulo="Los modelos son texto base">
        Cada modelo desarrolla la estructura que exige la norma, pero{' '}
        <strong>requiere adaptación profesional al caso concreto</strong>: horarios reales, cargos
        reales, términos que la empresa pueda cumplir. Un reglamento copiado sin ajustar se vuelve
        prueba en contra en la primera inspección.
      </Llamado>

      <div className="flex flex-wrap gap-2">
        <Boton variante="secundario" onClick={cargarTodosLosModelos}>
          <FileStack size={15} /> Cargar todos los modelos vacíos
        </Boton>
        <Boton variante="fantasma" onClick={limpiar}>
          <Eraser size={15} /> Limpiar todo
        </Boton>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
        <nav aria-label="Capítulos del reglamento">
          <ul className="space-y-1">
            {CAPITULOS.map((c, i) => {
              const redactado = (contenidos[c.id] ?? '').trim().length >= 80;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setActivo(c.id)}
                    aria-current={c.id === activo ? 'true' : undefined}
                    className={cx(
                      'w-full rounded-xl border px-3 py-2.5 text-left transition-colors',
                      c.id === activo
                        ? 'border-marca bg-indigo/8'
                        : 'border-borde bg-superficie-3 hover:border-borde-fuerte',
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={cx(
                          'grid size-5 shrink-0 place-items-center rounded-full font-mono text-[0.6rem] font-semibold',
                          redactado
                            ? 'bg-senal text-white'
                            : c.obligatorio
                              ? 'bg-alerta/15 text-alerta'
                              : 'bg-superficie-2 text-texto-3',
                        )}
                      >
                        {redactado ? '✓' : i + 1}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">
                        {c.titulo}
                      </span>
                    </span>
                    <span className="eyebrow mt-1 block truncate">
                      {c.numeral !== null ? `Num. ${c.numeral} · ` : ''}
                      {ORIGENES[c.origen].norma}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <Tarjeta
          titulo={capitulo.titulo}
          descripcion={capitulo.norma}
          acciones={
            <Boton variante="secundario" tamano="sm" onClick={() => cargarModelo(capitulo.id)}>
              <Wand2 size={14} /> Cargar modelo
            </Boton>
          }
        >
          <div className="mb-4 flex flex-wrap gap-2">
            <Insignia tono={capitulo.obligatorio ? 'riesgo' : 'neutro'}>
              {capitulo.obligatorio ? 'obligatorio' : 'complementario'}
            </Insignia>
            <Insignia tono="marca">{ORIGENES[capitulo.origen].rotulo}</Insignia>
            {capitulo.numeral !== null && (
              <Insignia tono="info">CST art. 108, num. {capitulo.numeral}</Insignia>
            )}
          </div>

          <Llamado tono="info" className="mb-4">
            {capitulo.guia}
          </Llamado>

          <div className="mb-4">
            <p className="eyebrow mb-2">Debe contener</p>
            <ul className="flex flex-wrap gap-1.5">
              {capitulo.debeContener.map((r) => (
                <li key={r}>
                  <Insignia tono="neutro">{r}</Insignia>
                </li>
              ))}
            </ul>
          </div>

          <AreaTexto
            rows={14}
            value={texto}
            aria-label={`Texto del capítulo ${capitulo.titulo}`}
            placeholder="Redacte aquí el capítulo, o cargue el modelo y adáptelo."
            onChange={(e) => escribir(capitulo.id, e.target.value)}
            className="font-mono text-sm"
          />

          <p className="mt-2 text-xs text-texto-3">
            {texto.trim().length} caracteres ·{' '}
            {texto.trim().length >= 80 ? 'desarrollado' : 'aún insuficiente'}
          </p>
        </Tarjeta>
      </div>
    </div>
  );
}
