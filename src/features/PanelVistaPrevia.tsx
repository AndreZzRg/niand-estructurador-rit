/**
 * Módulo «Vista previa del articulado»: el reglamento tal como quedaría.
 */
import { Printer } from 'lucide-react';

import { Boton, Dato, Llamado, Tarjeta, Vacio } from '../brand/ui';
import { Logo } from '../brand/Logo';
import { CAPITULOS, avanceDe, generarMarkdown, romano } from '../domain/rit';
import { imprimir } from '../lib/exportar';
import { fechaLarga } from '../lib/formato';
import { useEstado } from '../store';

export function PanelVistaPrevia() {
  const { empresa, contenidos } = useEstado();
  const redactados = CAPITULOS.filter((c) => (contenidos[c.id] ?? '').trim().length > 0);
  const avance = avanceDe(contenidos);

  if (redactados.length === 0) {
    return (
      <Vacio titulo="Todavía no hay articulado">
        Redacte al menos un capítulo en el módulo <strong>Capítulos</strong> y la vista previa se
        arma sola.
      </Vacio>
    );
  }

  const palabras = generarMarkdown(empresa, contenidos).split(/\s+/).length;

  return (
    <div className="space-y-6">
      <div className="no-imprimir grid gap-4 sm:grid-cols-3">
        <Dato rotulo="Capítulos en el documento" valor={redactados.length} tono="marca" />
        <Dato rotulo="Artículos" valor={redactados.length} />
        <Dato rotulo="Extensión aproximada" valor={`${palabras} palabras`} />
      </div>

      <div className="no-imprimir">
        <Boton onClick={imprimir}>
          <Printer size={15} /> Imprimir o guardar en PDF
        </Boton>
      </div>

      <Tarjeta className="print:border-0 print:shadow-none">
        <header className="mb-8 border-b border-borde pb-6 text-center">
          <div className="flex justify-center">
            <Logo alto={28} />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold">REGLAMENTO INTERNO DE TRABAJO</h1>
          <p className="mt-2 font-display text-lg">{empresa.razonSocial || '[RAZÓN SOCIAL]'}</p>
          <p className="text-sm text-texto-2">
            NIT {empresa.nit || '[NIT]'} · {empresa.ciudad}
          </p>
          <p className="mt-1 text-sm text-texto-2">
            Vigencia a partir del {fechaLarga(empresa.fechaVigencia)}
          </p>
        </header>

        <Llamado tono="alerta" className="mb-8" titulo="Modelo base">
          Este articulado se generó a partir de la estructura del artículo 108 del Código Sustantivo
          del Trabajo y de las obligaciones incorporadas por la Ley 2466 de 2025.{' '}
          <strong>
            Requiere adaptación profesional al caso concreto y revisión jurídica antes de su
            adopción.
          </strong>{' '}
          No constituye concepto jurídico.
        </Llamado>

        <article className="space-y-8">
          {redactados.map((c, i) => (
            <section key={c.id}>
              <h2 className="font-display text-base font-bold tracking-wide uppercase">
                Capítulo {romano(i + 1)} — {c.titulo}
              </h2>
              <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">
                <strong>ARTÍCULO {i + 1}.</strong> {contenidos[c.id]!.trim()}
              </p>
              <p className="eyebrow mt-2">Fundamento: {c.norma}</p>
            </section>
          ))}
        </article>

        <footer className="mt-10 border-t border-borde pt-6 text-sm">
          <h2 className="font-display text-base font-bold tracking-wide uppercase">
            Adopción y publicación
          </h2>
          <p className="mt-3 leading-relaxed text-texto-2">
            El presente reglamento fue adoptado por {empresa.razonSocial || '[RAZÓN SOCIAL]'} y rige
            a partir del {fechaLarga(empresa.fechaVigencia)}. Se publica en dos lugares visibles del
            sitio de trabajo y se socializa con todos los trabajadores, dejando constancia de
            asistencia. Desde la Ley 1429 de 2010, artículo 17, no requiere aprobación previa del
            Ministerio del Trabajo.
          </p>

          <div className="mt-10">
            <p className="w-64 border-t border-texto pt-1 text-xs">Representante legal</p>
          </div>

          {avance.obligatorios < CAPITULOS.filter((c) => c.obligatorio).length && (
            <p className="mt-6 text-xs text-alerta">
              Advertencia: faltan capítulos obligatorios por desarrollar. Revise el módulo de
              validación antes de adoptar este documento.
            </p>
          )}
        </footer>
      </Tarjeta>
    </div>
  );
}
