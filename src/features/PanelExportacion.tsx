/**
 * Módulo «Exportación»: Markdown, HTML y respaldo de los datos.
 */
import { useRef, useState } from 'react';
import { Copy, Download, FileCode, FileJson, Upload } from 'lucide-react';

import { Boton, Dato, Llamado, Tarjeta } from '../brand/ui';
import { CAPITULOS, avanceDe, generarMarkdown, validar } from '../domain/rit';
import { exportarJSON, exportarTexto, leerArchivo } from '../lib/exportar';
import { useEstado } from '../store';

export function PanelExportacion() {
  const { empresa, contenidos, setEmpresa, escribir } = useEstado();
  const archivo = useRef<HTMLInputElement>(null);
  const [copiado, setCopiado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markdown = generarMarkdown(empresa, contenidos);
  const hallazgos = validar(contenidos);
  const avance = avanceDe(contenidos);
  const obligatorios = CAPITULOS.filter((c) => c.obligatorio).length;
  const listo = avance.obligatorios === obligatorios && hallazgos.length === 0;

  const importar = async (f: File) => {
    setError(null);
    try {
      const datos = JSON.parse(await leerArchivo(f)) as {
        empresa?: Partial<typeof empresa>;
        contenidos?: Record<string, string>;
      };
      if (datos.empresa) setEmpresa(datos.empresa);
      for (const [id, texto] of Object.entries(datos.contenidos ?? {})) escribir(id, texto);
    } catch {
      setError('El archivo no tiene el formato de respaldo de esta aplicación.');
    }
  };

  const html = [
    '<!doctype html>',
    '<html lang="es-CO"><head><meta charset="utf-8">',
    `<title>Reglamento Interno de Trabajo — ${empresa.razonSocial || 'Empresa'}</title>`,
    '<style>body{font-family:Georgia,serif;max-width:42rem;margin:3rem auto;padding:0 1.5rem;line-height:1.65;color:#14122B}',
    'h1{text-align:center;font-size:1.5rem}h2{font-size:1rem;text-transform:uppercase;letter-spacing:.04em;margin-top:2.5rem}',
    'blockquote{border-left:3px solid #4338CA;padding-left:1rem;color:#5B5B6B;font-size:.9rem}',
    '.pie{margin-top:4rem;border-top:1px solid #ccc;padding-top:1rem;font-size:.8rem;color:#5B5B6B}</style>',
    '</head><body>',
    markdown
      .split('\n')
      .map((linea) => {
        if (linea.startsWith('# ')) return `<h1>${linea.slice(2)}</h1>`;
        if (linea.startsWith('## ')) return `<h2>${linea.slice(3)}</h2>`;
        if (linea.startsWith('> ')) return `<blockquote>${linea.slice(2)}</blockquote>`;
        if (linea.trim() === '---') return '<hr>';
        if (linea.trim() === '') return '';
        return `<p>${linea.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>`;
      })
      .join('\n'),
    '<div class="pie">Estructurado con niand-estructurador-rit · NiAnd Labs. Modelo base que requiere revisión jurídica profesional.</div>',
    '</body></html>',
  ].join('\n');

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Dato
          rotulo="Estado del documento"
          valor={listo ? 'Listo para revisión' : 'En construcción'}
          tono={listo ? 'ok' : 'alerta'}
        />
        <Dato
          rotulo="Capítulos obligatorios"
          valor={`${avance.obligatorios} / ${obligatorios}`}
          tono={avance.obligatorios === obligatorios ? 'ok' : 'riesgo'}
        />
        <Dato
          rotulo="Hallazgos pendientes"
          valor={hallazgos.length}
          tono={hallazgos.length ? 'alerta' : 'ok'}
        />
      </div>

      {!listo && (
        <Llamado tono="alerta" titulo="El documento todavía no está completo">
          Puede exportarlo igual —sirve como borrador de trabajo—, pero revise primero el módulo de{' '}
          <strong>validación</strong>. Un reglamento incompleto adoptado formalmente es peor que no
          tenerlo: acredita que la empresa conocía la obligación.
        </Llamado>
      )}

      <Tarjeta titulo="Exportar el articulado">
        <div className="flex flex-wrap gap-2">
          <Boton onClick={() => exportarTexto(markdown, 'reglamento-interno', 'md')}>
            <Download size={15} /> Markdown
          </Boton>
          <Boton
            variante="secundario"
            onClick={() => exportarTexto(html, 'reglamento-interno', 'html')}
          >
            <FileCode size={15} /> HTML para imprimir
          </Boton>
          <Boton
            variante="secundario"
            onClick={() => {
              void navigator.clipboard
                .writeText(markdown)
                .then(() => {
                  setCopiado(true);
                  setTimeout(() => setCopiado(false), 1800);
                })
                .catch(() => undefined);
            }}
          >
            <Copy size={15} /> {copiado ? 'Copiado' : 'Copiar'}
          </Boton>
        </div>

        <p className="mt-4 text-sm text-texto-2">
          El <strong>Markdown</strong> se abre en cualquier editor y se convierte a Word con una
          sola orden. El <strong>HTML</strong> está listo para imprimir con márgenes de documento
          formal.
        </p>
      </Tarjeta>

      <Tarjeta
        titulo="Respaldo de los datos"
        descripcion="Para continuar en otro equipo o navegador."
      >
        <div className="flex flex-wrap gap-2">
          <Boton
            variante="secundario"
            onClick={() => exportarJSON({ empresa, contenidos }, 'respaldo-rit')}
          >
            <FileJson size={15} /> Exportar datos
          </Boton>
          <Boton variante="fantasma" onClick={() => archivo.current?.click()}>
            <Upload size={15} /> Importar
          </Boton>
          <input
            ref={archivo}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void importar(f);
              e.target.value = '';
            }}
          />
        </div>

        {error && (
          <Llamado tono="riesgo" className="mt-4">
            {error}
          </Llamado>
        )}

        <p className="mt-4 text-sm text-texto-2">
          Nada de esto sale de su navegador. Si borra los datos del sitio sin exportar, el trabajo
          se pierde sin recuperación.
        </p>
      </Tarjeta>

      <Tarjeta
        titulo="Después de exportar"
        descripcion="Lo que falta para que el reglamento exista de verdad."
      >
        <ol className="space-y-2 text-sm text-texto-2">
          {[
            'Revisión jurídica profesional del articulado completo.',
            'Adopción formal por el representante legal.',
            'Publicación en dos lugares visibles del sitio de trabajo (CST, art. 120).',
            'Socialización con todos los trabajadores, con acta y registro de asistencia.',
            'Entrega de copia o acuse de lectura individual, que es lo que permite oponerlo en un proceso disciplinario.',
            'Archivo del acta: es la prueba que pide una inspección.',
          ].map((paso, i) => (
            <li key={paso} className="flex gap-3">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-marca font-mono text-[0.65rem] font-semibold text-marca-contraste">
                {i + 1}
              </span>
              {paso}
            </li>
          ))}
        </ol>
      </Tarjeta>
    </div>
  );
}
