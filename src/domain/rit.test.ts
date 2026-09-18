import { describe, expect, it } from 'vitest';

import {
  CAPITULOS,
  ORIGENES,
  avanceDe,
  capituloPorId,
  debeAdoptarReglamento,
  generarMarkdown,
  romano,
  validar,
  type Contenidos,
  type Empresa,
} from './rit';

const EMPRESA: Empresa = {
  razonSocial: 'Empresa de Prueba S.A.S.',
  nit: '900.000.000-1',
  ciudad: 'Bogotá D.C.',
  sector: 'comercial',
  trabajadores: 25,
  fechaVigencia: '2026-10-01',
};

/** Contenidos que satisfacen todos los requisitos de cada capítulo. */
const completos: Contenidos = Object.fromEntries(
  CAPITULOS.map((c) => [
    c.id,
    `${c.modelo} Este capítulo desarrolla: ${c.debeContener.join(', ')}. ` +
      'Se redacta con el detalle que exige la norma y se socializa con los trabajadores.',
  ]),
);

describe('catálogo de capítulos', () => {
  it('cita norma y guía en cada capítulo', () => {
    for (const c of CAPITULOS) {
      expect(c.norma, c.id).toMatch(/CST|Ley|Decreto|Resolución|C\. P\./);
      expect(c.guia.length, c.id).toBeGreaterThan(40);
      expect(c.modelo.length, c.id).toBeGreaterThan(80);
      expect(c.debeContener.length, c.id).toBeGreaterThan(0);
    }
  });

  it('usa identificadores únicos', () => {
    const ids = CAPITULOS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('asigna a cada capítulo un origen declarado', () => {
    for (const c of CAPITULOS) expect(ORIGENES[c.origen], c.id).toBeDefined();
  });

  it('cubre el contenido mínimo del art. 108 del CST', () => {
    const numerales = CAPITULOS.map((c) => c.numeral).filter((n): n is number => n !== null);
    // Numerales imprescindibles del contenido mínimo.
    for (const n of [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 13, 16, 17, 18]) {
      expect(numerales, `numeral ${n}`).toContain(n);
    }
  });

  it('incorpora las obligaciones posteriores al art. 108', () => {
    const origenes = new Set(CAPITULOS.map((c) => c.origen));
    for (const o of ['ley2466', 'ley1010', 'ley2365', 'ley2191'] as const) {
      expect(origenes, o).toContain(o);
    }
  });

  it('marca como obligatorio todo lo que la ley exige', () => {
    for (const id of ['identificacion', 'jornada', 'recargos', 'disciplinario', 'acoso-sexual']) {
      expect(capituloPorId(id).obligatorio, id).toBe(true);
    }
  });

  it('rechaza un capítulo inexistente', () => {
    expect(() => capituloPorId('inventado')).toThrow(RangeError);
  });
});

describe('obligación de adoptar reglamento (CST art. 105)', () => {
  it('obliga a la empresa comercial con más de cinco trabajadores', () => {
    expect(debeAdoptarReglamento('comercial', 6).obligado).toBe(true);
    expect(debeAdoptarReglamento('comercial', 5).obligado).toBe(false);
  });

  it('obliga a la industrial con más de diez', () => {
    expect(debeAdoptarReglamento('industrial', 11).obligado).toBe(true);
    expect(debeAdoptarReglamento('industrial', 10).obligado).toBe(false);
  });

  it('obliga a la agrícola con más de veinte', () => {
    expect(debeAdoptarReglamento('agricola', 21).obligado).toBe(true);
    expect(debeAdoptarReglamento('agricola', 20).obligado).toBe(false);
  });

  it('recomienda adoptarlo aun sin obligación', () => {
    const r = debeAdoptarReglamento('comercial', 3);
    expect(r.obligado).toBe(false);
    expect(r.explicacion).toMatch(/sigue siendo recomendable/);
  });
});

describe('validación del contenido', () => {
  it('no encuentra faltantes en un reglamento completo', () => {
    expect(validar(completos).filter((h) => h.gravedad === 'faltante')).toHaveLength(0);
  });

  it('señala los capítulos obligatorios vacíos', () => {
    const h = validar({});
    const obligatorios = CAPITULOS.filter((c) => c.obligatorio).length;
    expect(h.filter((x) => x.gravedad === 'faltante')).toHaveLength(obligatorios);
  });

  it('no exige los capítulos opcionales', () => {
    const faltantes = validar({}).filter((h) => h.gravedad === 'faltante');
    expect(faltantes.some((h) => h.capituloId === 'datos')).toBe(false);
    expect(faltantes.some((h) => h.capituloId === 'trabajo-casa')).toBe(false);
  });

  it('marca como incompleto un capítulo demasiado breve', () => {
    const h = validar({ identificacion: 'La empresa.' });
    expect(h.some((x) => x.capituloId === 'identificacion' && x.gravedad === 'incompleto')).toBe(
      true,
    );
  });

  it('detecta la jornada diurna anterior a la Ley 2466', () => {
    const h = validar({
      ...completos,
      recargos: 'Trabajo diurno es el comprendido entre las 6:00 a. m. y las 9:00 p. m. '.repeat(3),
    });
    const d = h.find((x) => x.gravedad === 'desactualizado')!;
    expect(d.mensaje).toMatch(/7:00 p\. m\./);
  });

  it('detecta el recargo dominical del 75 %', () => {
    const h = validar({
      ...completos,
      recargos:
        'El trabajo dominical se remunera con un recargo del 75 % sobre el valor ordinario de la hora. '.repeat(
          2,
        ),
    });
    expect(h.some((x) => x.mensaje.includes('progresión de la Ley 2466'))).toBe(true);
  });

  it('detecta la jornada de 48 horas semanales', () => {
    const h = validar({
      ...completos,
      jornada:
        'La jornada ordinaria será de 48 horas a la semana distribuidas de lunes a sábado. '.repeat(
          2,
        ),
    });
    expect(h.some((x) => x.mensaje.includes('42 horas'))).toBe(true);
  });

  it('detecta la mención a la aprobación del Ministerio', () => {
    const h = validar({
      ...completos,
      publicacion:
        'El presente reglamento se somete a aprobación previa del Ministerio del Trabajo antes de su publicación en la empresa. '.repeat(
          2,
        ),
    });
    expect(h.some((x) => x.mensaje.includes('Ley 1429 de 2010'))).toBe(true);
  });

  it('detecta restricciones laborales basadas en el sexo', () => {
    const h = validar({
      ...completos,
      'labores-especiales':
        'Queda prohibido a las mujeres el trabajo en labores de carga y en horario nocturno dentro de la empresa. '.repeat(
          2,
        ),
    });
    expect(h.some((x) => x.mensaje.includes('inexequibles'))).toBe(true);
  });

  it('no marca como desactualizado un texto vigente', () => {
    const h = validar(completos);
    expect(h.filter((x) => x.gravedad === 'desactualizado')).toHaveLength(0);
  });
});

describe('avance de redacción', () => {
  it('cuenta cero sobre un documento vacío', () => {
    const a = avanceDe({});
    expect(a.redactados).toBe(0);
    expect(a.obligatorios).toBe(0);
    expect(a.total).toBe(CAPITULOS.length);
  });

  it('cuenta todos los capítulos redactados', () => {
    const a = avanceDe(completos);
    expect(a.redactados).toBe(CAPITULOS.length);
    expect(a.obligatorios).toBe(CAPITULOS.filter((c) => c.obligatorio).length);
  });

  it('no cuenta un capítulo apenas esbozado', () => {
    expect(avanceDe({ identificacion: 'Breve.' }).redactados).toBe(0);
  });
});

describe('generación del articulado', () => {
  const documento = generarMarkdown(EMPRESA, completos);

  it('incluye el encabezado con los datos de la empresa', () => {
    expect(documento).toContain('REGLAMENTO INTERNO DE TRABAJO');
    expect(documento).toContain('Empresa de Prueba S.A.S.');
    expect(documento).toContain('900.000.000-1');
  });

  it('lleva siempre la advertencia de modelo base', () => {
    expect(documento).toMatch(/Modelo base/);
    expect(documento).toMatch(/adaptación profesional al caso/);
    expect(documento).toMatch(/No constituye concepto jurídico/);
  });

  it('numera los artículos de forma consecutiva', () => {
    const numeros = [...documento.matchAll(/\*\*ARTÍCULO (\d+)\.\*\*/g)].map((m) => Number(m[1]));
    expect(numeros).toEqual(numeros.map((_, i) => i + 1));
  });

  it('cita el fundamento normativo de cada capítulo', () => {
    const fundamentos = [...documento.matchAll(/Fundamento: /g)];
    expect(fundamentos).toHaveLength(CAPITULOS.length);
  });

  it('omite los capítulos sin redactar', () => {
    const parcial = generarMarkdown(EMPRESA, { identificacion: completos.identificacion! });
    expect([...parcial.matchAll(/\*\*ARTÍCULO /g)]).toHaveLength(1);
  });

  it('advierte sobre la obligación de adoptar según el sector', () => {
    expect(documento).toMatch(/está obligada a adoptar reglamento/);
    const pequena = generarMarkdown({ ...EMPRESA, trabajadores: 3 }, completos);
    expect(pequena).toMatch(/La adopción es voluntaria/);
  });

  it('recuerda que no requiere aprobación del Ministerio', () => {
    expect(documento).toMatch(/no requiere aprobación/);
    expect(documento).toMatch(/Ley 1429 de 2010/);
  });
});

describe('numeración romana', () => {
  it('convierte los valores usados en los capítulos', () => {
    expect(romano(1)).toBe('I');
    expect(romano(4)).toBe('IV');
    expect(romano(9)).toBe('IX');
    expect(romano(20)).toBe('XX');
  });

  it('degrada al número árabe fuera de rango', () => {
    expect(romano(99)).toBe('99');
  });
});
