/**
 * Estructura del Reglamento Interno de Trabajo.
 *
 * Fundamento:
 * · CST art. 104 a 125 — obligación, contenido, publicación y régimen.
 * · CST art. 108 — contenido mínimo obligatorio, numeral por numeral.
 * · Ley 1429 de 2010, art. 17 — suprimió la aprobación previa del Ministerio
 *   del Trabajo. Hoy el reglamento se adopta y se publica; no se «aprueba».
 * · Ley 2466 de 2025 — jornada nocturna desde las 7:00 p. m., progresión del
 *   recargo dominical y refuerzo del debido proceso disciplinario.
 * · Ley 1010 de 2006, art. 9 — mecanismos de prevención del acoso laboral.
 * · Ley 2365 de 2024 — protocolo de prevención y atención del acoso sexual.
 * · Ley 2191 de 2022 — desconexión laboral.
 * · Ley 1581 de 2012 — tratamiento de datos personales del trabajador.
 * · Ley 2088 de 2021 — trabajo en casa.
 *
 * Quién está obligado: todo empleador que ocupe más de cinco trabajadores de
 * carácter permanente en empresas comerciales, más de diez en las
 * industriales, o más de veinte en las agrícolas, ganaderas o forestales
 * (CST, art. 105). Adoptarlo sin estar obligado es una buena práctica; no
 * tenerlo estándolo es una omisión.
 */

export type Origen =
  'cst108' | 'ley2466' | 'ley1010' | 'ley2365' | 'ley2191' | 'ley1581' | 'sst' | 'otro';

export interface Capitulo {
  readonly id: string;
  /** Numeral del art. 108 del CST, cuando proviene de allí. */
  readonly numeral: number | null;
  readonly titulo: string;
  readonly origen: Origen;
  readonly norma: string;
  readonly obligatorio: boolean;
  /** Qué debe decir el capítulo para considerarse completo. */
  readonly debeContener: readonly string[];
  readonly guia: string;
  /** Texto base que el usuario adapta. Nunca se entrega como definitivo. */
  readonly modelo: string;
}

export const ORIGENES: Record<Origen, { rotulo: string; norma: string }> = {
  cst108: { rotulo: 'Contenido mínimo', norma: 'CST art. 108' },
  ley2466: { rotulo: 'Reforma laboral', norma: 'Ley 2466 de 2025' },
  ley1010: { rotulo: 'Acoso laboral', norma: 'Ley 1010 de 2006' },
  ley2365: { rotulo: 'Acoso sexual', norma: 'Ley 2365 de 2024' },
  ley2191: { rotulo: 'Desconexión', norma: 'Ley 2191 de 2022' },
  ley1581: { rotulo: 'Datos personales', norma: 'Ley 1581 de 2012' },
  sst: { rotulo: 'Seguridad y salud', norma: 'Decreto 1072 de 2015' },
  otro: { rotulo: 'Complementario', norma: '—' },
};

export const CAPITULOS: readonly Capitulo[] = [
  {
    id: 'identificacion',
    numeral: 1,
    titulo: 'Identificación del empleador y del establecimiento',
    origen: 'cst108',
    norma: 'CST art. 108, num. 1',
    obligatorio: true,
    debeContener: ['Razón social', 'NIT', 'Domicilio', 'Establecimientos y sedes'],
    guia: 'Identifique a la empresa y cada sede donde rige el reglamento. Si hay varias sedes con condiciones distintas, dígalo aquí.',
    modelo:
      'El presente reglamento se aplica en [RAZÓN SOCIAL], identificada con NIT [NIT], con domicilio principal en [CIUDAD] y establecimientos en [SEDES]. Sus disposiciones obligan tanto a la empresa como a sus trabajadores, desde la fecha de su publicación.',
  },
  {
    id: 'admision',
    numeral: 2,
    titulo: 'Condiciones de admisión, aprendizaje y periodo de prueba',
    origen: 'cst108',
    norma: 'CST art. 108, num. 2 · arts. 76 a 80',
    obligatorio: true,
    debeContener: ['Documentos de admisión', 'Duración del periodo de prueba', 'Forma escrita'],
    guia: 'El periodo de prueba debe constar por escrito en el contrato. En el término fijo inferior a un año no puede exceder la quinta parte del término pactado ni dos meses.',
    modelo:
      'Quien aspire a desempeñar un cargo en la empresa deberá presentar: documento de identidad, certificados de estudio y de trabajo anteriores, y los demás que la empresa requiera conforme a la ley. El periodo de prueba se pactará por escrito y no excederá de dos meses; en los contratos a término fijo inferiores a un año no será superior a la quinta parte del término pactado.',
  },
  {
    id: 'transitorios',
    numeral: 3,
    titulo: 'Trabajadores accidentales o transitorios',
    origen: 'cst108',
    norma: 'CST art. 108, num. 3 · art. 6',
    obligatorio: true,
    debeContener: ['Definición', 'Derechos aplicables'],
    guia: 'El trabajo ocasional es de corta duración, no mayor de un mes, y sobre labores distintas de las actividades normales del empleador.',
    modelo:
      'Son trabajadores accidentales o transitorios quienes se ocupen en labores de corta duración, no mayor de un mes, y de índole distinta de las actividades normales de la empresa. Tienen derecho, además del salario, al descanso remunerado en dominicales y festivos.',
  },
  {
    id: 'jornada',
    numeral: 4,
    titulo: 'Jornada de trabajo, horarios y descansos',
    origen: 'ley2466',
    norma: 'CST arts. 158 a 167 · Ley 2101 de 2021 · Ley 2466 de 2025',
    obligatorio: true,
    debeContener: [
      'Horas de entrada y salida',
      'Jornada máxima semanal vigente',
      'Tiempos de descanso',
      'Turnos, si los hay',
    ],
    guia: 'La Ley 2101 de 2021 redujo la jornada máxima semanal de forma gradual hasta 42 horas desde julio de 2026. Ajuste el horario y verifique que el reglamento no siga citando 48 horas.',
    modelo:
      'Las horas de entrada y salida serán las siguientes: [HORARIO]. La jornada ordinaria máxima es de [HORAS] horas semanales, conforme a la reducción gradual de la Ley 2101 de 2021. Se concederá un descanso de [TIEMPO] dentro de la jornada, que no se computa como tiempo de trabajo.',
  },
  {
    id: 'recargos',
    numeral: 5,
    titulo: 'Horas extras, trabajo nocturno, dominical y festivo',
    origen: 'ley2466',
    norma: 'CST arts. 160, 168 y 179 · Ley 2466 de 2025',
    obligatorio: true,
    debeContener: [
      'Franja de la jornada nocturna',
      'Recargo nocturno',
      'Recargos de horas extra',
      'Recargo dominical y festivo vigente',
      'Límite de horas extra',
    ],
    guia: 'Este es el capítulo que la Ley 2466 cambió de forma más visible: la jornada diurna termina a las 7:00 p. m. desde el 26 de diciembre de 2025, y el recargo dominical sube al 90 % en julio de 2026 y al 100 % en julio de 2027. Un reglamento que siga diciendo «9:00 p. m.» o «75 %» está desactualizado.',
    modelo:
      'Trabajo diurno es el comprendido entre las 6:00 a. m. y las 7:00 p. m.; trabajo nocturno, el comprendido entre las 7:00 p. m. y las 6:00 a. m. El trabajo nocturno se remunera con un recargo del 35 %. La hora extra diurna se paga con un recargo del 25 % y la nocturna, del 75 %. El trabajo dominical y festivo se remunera con el recargo vigente conforme a la progresión del artículo 179 del CST, modificado por la Ley 2466 de 2025. Las horas extra requieren autorización previa y no podrán exceder de dos diarias ni doce semanales.',
  },
  {
    id: 'descansos',
    numeral: 6,
    titulo: 'Días de descanso legalmente obligatorios',
    origen: 'cst108',
    norma: 'CST arts. 172 a 178 · Ley 51 de 1983',
    obligatorio: true,
    debeContener: ['Descanso dominical', 'Festivos', 'Regla de traslado al lunes'],
    guia: 'La Ley 51 de 1983 traslada al lunes siguiente los festivos que no caen en lunes, salvo los que conservan su fecha.',
    modelo:
      'Serán de descanso obligatorio remunerado los domingos y los días de fiesta que sean reconocidos como tales en la legislación laboral. La empresa aplicará el traslado de festivos previsto en la Ley 51 de 1983.',
  },
  {
    id: 'salario',
    numeral: 7,
    titulo: 'Salario mínimo, convencional y modalidades de pago',
    origen: 'cst108',
    norma: 'CST art. 108, nums. 7 y 8 · arts. 127 y 128',
    obligatorio: true,
    debeContener: [
      'Modalidades de salario',
      'Pagos que no constituyen salario',
      'Lugar y periodicidad de pago',
    ],
    guia: 'Si la empresa pacta pagos no constitutivos de salario, recuerde el límite del 40 % del artículo 30 de la Ley 1393 de 2010 para efectos del IBC.',
    modelo:
      'La empresa pagará a sus trabajadores un salario no inferior al mínimo legal vigente, en las modalidades pactadas en cada contrato. El pago se hará en [LUGAR], por periodos [PERIODICIDAD], mediante consignación en la cuenta que indique el trabajador.',
  },
  {
    id: 'comidas',
    numeral: 9,
    titulo: 'Tiempo y forma de las comidas',
    origen: 'cst108',
    norma: 'CST art. 108, num. 9',
    obligatorio: true,
    debeContener: ['Horario de comidas', 'Lugar destinado'],
    guia: 'Basta con precisar el tiempo y el lugar; el detalle puede quedar en instructivo.',
    modelo:
      'El tiempo destinado a las comidas será de [TIEMPO], dentro del horario de [HORARIO]. La empresa dispone de [LUGAR] para este fin.',
  },
  {
    id: 'labores-especiales',
    numeral: 10,
    titulo: 'Labores peligrosas o insalubres y trabajo de menores',
    origen: 'sst',
    norma: 'CST art. 108, nums. 10 y 12 · Código de la Infancia y la Adolescencia',
    obligatorio: true,
    debeContener: [
      'Labores restringidas',
      'Régimen de menores de edad',
      'Autorización del inspector',
    ],
    guia: 'La redacción antigua que prohibía labores «a las mujeres» está derogada por inconstitucional. Mantenga únicamente las restricciones vigentes: menores de edad y condiciones de riesgo.',
    modelo:
      'Las labores que impliquen riesgo por manipulación de sustancias peligrosas, trabajo en alturas o espacios confinados se ejecutarán solo por personal capacitado y certificado. Los menores de edad solo podrán ser vinculados con autorización del inspector del trabajo y en labores compatibles con su edad, conforme a la ley.',
  },
  {
    id: 'jerarquia',
    numeral: 11,
    titulo: 'Orden jerárquico de los representantes del empleador',
    origen: 'cst108',
    norma: 'CST art. 108, num. 11 · art. 32',
    obligatorio: true,
    debeContener: ['Cargos que representan al empleador', 'Facultades'],
    guia: 'Precise quién puede sancionar, quién puede autorizar horas extra y quién recibe reclamos.',
    modelo:
      'Son representantes del empleador y, como tales, lo obligan frente a los trabajadores: [CARGOS]. Las facultades disciplinarias corresponden a [CARGO].',
  },
  {
    id: 'primeros-auxilios',
    numeral: 13,
    titulo: 'Primeros auxilios y prescripciones de seguridad',
    origen: 'sst',
    norma: 'CST art. 108, nums. 13, 14 y 15 · Decreto 1072 de 2015',
    obligatorio: true,
    debeContener: ['Botiquín', 'Brigada o responsable', 'Reporte de accidentes'],
    guia: 'Enlace este capítulo con el SG-SST; no lo duplique. Basta remitir al procedimiento vigente.',
    modelo:
      'La empresa mantendrá los elementos de primeros auxilios señalados por la normativa vigente y designará al personal responsable. Todo accidente de trabajo deberá reportarse de inmediato al jefe directo y a la ARL dentro de los dos días hábiles siguientes.',
  },
  {
    id: 'disciplinario',
    numeral: 16,
    titulo: 'Faltas, sanciones y procedimiento disciplinario',
    origen: 'ley2466',
    norma: 'CST arts. 111 a 115 · C. P. art. 29 · Ley 2466 de 2025',
    obligatorio: true,
    debeContener: [
      'Catálogo de faltas',
      'Escala de sanciones',
      'Citación a descargos',
      'Derecho a ser asistido',
      'Práctica de pruebas',
      'Decisión motivada',
      'Recursos',
    ],
    guia: 'Es el capítulo que más procesos pierde. Solo pueden imponerse las sanciones previstas aquí, y siempre después de oír al trabajador en descargos. La suspensión no puede exceder ocho días la primera vez ni dos meses en caso de reincidencia.',
    modelo:
      'Antes de imponer cualquier sanción disciplinaria, la empresa citará por escrito al trabajador a diligencia de descargos, con indicación de los hechos imputados y de la norma o cláusula presuntamente infringida. El trabajador podrá hacerse asistir por dos compañeros de trabajo o por dos representantes del sindicato si lo hubiere, aportar y solicitar pruebas. La decisión será motivada, se referirá a lo dicho en descargos y se notificará por escrito. Contra ella procede [RECURSO] ante [INSTANCIA] dentro de los [TÉRMINO] días hábiles siguientes.',
  },
  {
    id: 'reclamos',
    numeral: 17,
    titulo: 'Reclamos: personas ante quienes se presentan y su trámite',
    origen: 'cst108',
    norma: 'CST art. 108, num. 16',
    obligatorio: true,
    debeContener: ['Canal de reclamo', 'Responsable', 'Término de respuesta'],
    guia: 'Un canal sin responsable ni término es un canal inexistente para efectos probatorios.',
    modelo:
      'Los reclamos de los trabajadores se presentarán ante [CARGO], quien los tramitará y responderá por escrito dentro de los [TÉRMINO] días hábiles siguientes a su recepción.',
  },
  {
    id: 'acoso-laboral',
    numeral: null,
    titulo: 'Prevención del acoso laboral y Comité de Convivencia',
    origen: 'ley1010',
    norma: 'Ley 1010 de 2006, arts. 9 y 10 · Resolución 652 de 2012',
    obligatorio: true,
    debeContener: [
      'Conductas constitutivas de acoso',
      'Mecanismo confidencial de denuncia',
      'Conformación del Comité de Convivencia',
      'Periodicidad de sesiones',
    ],
    guia: 'La ley exige de forma expresa que el reglamento prevea mecanismos de prevención y un procedimiento interno confidencial. El comité sesiona por lo menos cada trimestre y deja actas.',
    modelo:
      'La empresa adopta como mecanismo de prevención del acoso laboral el Comité de Convivencia Laboral, conformado de forma paritaria conforme a la Resolución 652 de 2012, que sesionará por lo menos cada tres meses. Toda queja se tramitará de forma confidencial, sin represalias contra quien la presente.',
  },
  {
    id: 'acoso-sexual',
    numeral: null,
    titulo: 'Prevención y atención del acoso sexual laboral',
    origen: 'ley2365',
    norma: 'Ley 2365 de 2024 · Resolución 2764 de 2022',
    obligatorio: true,
    debeContener: [
      'Definición y ámbito',
      'Ruta de atención',
      'Medidas de protección inmediatas',
      'No revictimización',
      'Cobertura de contratistas y entornos digitales',
    ],
    guia: 'El acoso sexual no es conciliable: la función conciliatoria del Comité de Convivencia no aplica. El protocolo debe cubrir contratistas, practicantes y los entornos digitales de trabajo, y garantizar que la persona denunciante conserva su derecho a denunciar penalmente.',
    modelo:
      'La empresa adopta el protocolo de prevención y atención del acoso sexual laboral previsto en la Ley 2365 de 2024, aplicable a trabajadores, contratistas, aprendices y practicantes, incluidos los entornos digitales de trabajo. Recibida una denuncia, se adoptarán medidas de protección inmediatas que en ningún caso podrán afectar la situación laboral de la persona denunciante. El trámite interno no sustituye ni impide la denuncia penal.',
  },
  {
    id: 'desconexion',
    numeral: null,
    titulo: 'Derecho a la desconexión laboral',
    origen: 'ley2191',
    norma: 'Ley 2191 de 2022',
    obligatorio: true,
    debeContener: ['Alcance del derecho', 'Excepciones', 'Procedimiento de queja'],
    guia: 'La ley exige una política con procedimiento de queja. Las excepciones deben ser concretas: «casos de fuerza mayor» sin más es una excepción que se traga la regla.',
    modelo:
      'Los trabajadores tienen derecho a no ser contactados por medio alguno fuera de su jornada, durante sus descansos, licencias y vacaciones. Se exceptúan los cargos de dirección, confianza y manejo y las situaciones de fuerza mayor debidamente justificadas. El incumplimiento podrá reclamarse ante [CARGO], conforme al procedimiento de reclamos de este reglamento.',
  },
  {
    id: 'datos',
    numeral: null,
    titulo: 'Tratamiento de datos personales del trabajador',
    origen: 'ley1581',
    norma: 'Ley 1581 de 2012 · Decreto 1074 de 2015',
    obligatorio: false,
    debeContener: ['Finalidades', 'Datos sensibles', 'Derechos del titular', 'Canal de atención'],
    guia: 'No es contenido mínimo del art. 108, pero su ausencia deja a la empresa sin el respaldo documental de una obligación que sí le es exigible.',
    modelo:
      'La empresa trata los datos personales de sus trabajadores con las finalidades descritas en su política de tratamiento, disponible en [CANAL]. Los datos de salud son sensibles: su suministro es facultativo y su tratamiento se limita a lo estrictamente necesario. El trabajador puede conocer, actualizar, rectificar y suprimir sus datos ante [CANAL].',
  },
  {
    id: 'trabajo-casa',
    numeral: null,
    titulo: 'Trabajo en casa, teletrabajo y trabajo remoto',
    origen: 'otro',
    norma: 'Ley 1221 de 2008 · Ley 2088 de 2021 · Ley 2121 de 2021',
    obligatorio: false,
    debeContener: ['Modalidad aplicable', 'Auxilio de conectividad', 'Condiciones de SST'],
    guia: 'Son tres figuras distintas con reglas distintas. El auxilio de conectividad sustituye al de transporte en el trabajo en casa cuando el trabajador devenga hasta dos salarios mínimos.',
    modelo:
      'Cuando la empresa habilite el trabajo en casa conforme a la Ley 2088 de 2021, se reconocerá el auxilio de conectividad en los términos de la ley y se mantendrán las condiciones de seguridad y salud aplicables.',
  },
  {
    id: 'publicacion',
    numeral: 18,
    titulo: 'Publicación y vigencia',
    origen: 'cst108',
    norma: 'CST arts. 119 a 121 · Ley 1429 de 2010, art. 17',
    obligatorio: true,
    debeContener: ['Forma de publicación', 'Fecha de entrada en vigencia', 'Socialización'],
    guia: 'Desde la Ley 1429 de 2010 el reglamento no requiere aprobación del Ministerio del Trabajo: se adopta, se publica en dos sitios visibles del lugar de trabajo y se socializa. Guarde el acta de socialización con registro de asistencia.',
    modelo:
      'El presente reglamento se publicará en dos lugares visibles del sitio de trabajo y se socializará con todos los trabajadores, dejando constancia de asistencia. Entrará en vigencia a partir del [FECHA] y deroga las disposiciones anteriores que le sean contrarias.',
  },
] as const;

export function capituloPorId(id: string): Capitulo {
  const c = CAPITULOS.find((x) => x.id === id);
  if (!c) throw new RangeError(`Capítulo desconocido: "${id}"`);
  return c;
}

/* ══ Obligatoriedad de adoptar el reglamento ═════════════════════ */

export type Sector = 'comercial' | 'industrial' | 'agricola' | 'servicios';

/**
 * ¿Está obligada la empresa a tener reglamento? (CST, art. 105)
 * Más de 5 trabajadores permanentes en empresas comerciales, más de 10 en las
 * industriales y más de 20 en las agrícolas, ganaderas o forestales.
 */
export function debeAdoptarReglamento(
  sector: Sector,
  trabajadores: number,
): { obligado: boolean; umbral: number; explicacion: string } {
  const umbrales: Record<Sector, number> = {
    comercial: 5,
    servicios: 5,
    industrial: 10,
    agricola: 20,
  };
  const umbral = umbrales[sector];
  const obligado = trabajadores > umbral;
  return {
    obligado,
    umbral,
    explicacion: obligado
      ? `Con ${trabajadores} trabajadores permanentes, la empresa supera el umbral de ${umbral} del artículo 105 del CST: está obligada a adoptar reglamento.`
      : `Con ${trabajadores} trabajadores permanentes no se supera el umbral de ${umbral} del artículo 105 del CST. Adoptarlo sigue siendo recomendable: sin reglamento no hay catálogo de faltas ni escala de sanciones que fundamente un proceso disciplinario.`,
  };
}

/* ══ Documento en construcción ═══════════════════════════════════ */

export interface Empresa {
  readonly razonSocial: string;
  readonly nit: string;
  readonly ciudad: string;
  readonly sector: Sector;
  readonly trabajadores: number;
  readonly fechaVigencia: string;
}

export type Contenidos = Readonly<Record<string, string>>;

export interface Hallazgo {
  readonly capituloId: string;
  readonly titulo: string;
  readonly gravedad: 'faltante' | 'incompleto' | 'desactualizado';
  readonly mensaje: string;
  readonly norma: string;
}

/** Expresiones que delatan un reglamento anterior a la Ley 2466. */
const SENALES_DESACTUALIZACION: ReadonlyArray<{ patron: RegExp; mensaje: string }> = [
  {
    patron: /9:00\s*p\.?\s*m|21:00|nueve de la noche/i,
    mensaje:
      'El texto sigue situando el fin de la jornada diurna a las 9:00 p. m. Desde el 26 de diciembre de 2025 termina a las 7:00 p. m. (Ley 2466 de 2025).',
  },
  {
    // El 75 % sigue siendo correcto para la hora extra nocturna; solo delata
    // desactualización cuando aparece referido al trabajo dominical o festivo.
    patron: /(dominical|festivo)[^.]{0,90}\b75\s*%|\b75\s*%[^.]{0,90}(dominical|festivo)/i,
    mensaje:
      'Aparece un recargo del 75 % asociado al trabajo dominical o festivo. Ese recargo sigue la progresión de la Ley 2466 de 2025: 80 %, 90 % y 100 %.',
  },
  {
    patron: /48\s*horas\s*(a\s*la\s*)?semana|cuarenta y ocho horas/i,
    mensaje:
      'El texto conserva la jornada de 48 horas semanales. La Ley 2101 de 2021 la redujo de forma gradual hasta 42 horas desde julio de 2026.',
  },
  {
    patron: /aprobaci[oó]n\s+(previa\s+)?del\s+Ministerio/i,
    mensaje:
      'El reglamento no requiere aprobación del Ministerio del Trabajo desde la Ley 1429 de 2010, art. 17. Se adopta y se publica.',
  },
  {
    patron: /prohibido\s+a\s+las\s+mujeres|las mujeres no podr[aá]n/i,
    mensaje:
      'Hay una restricción laboral basada en el sexo. Las prohibiciones generales de trabajo femenino fueron declaradas inexequibles; conserve solo las restricciones vigentes por riesgo.',
  },
];

/** Palabras que el capítulo debe mencionar, derivadas de `debeContener`. */
function mencionaTodo(texto: string, requisitos: readonly string[]): readonly string[] {
  const normalizado = texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  return requisitos.filter((r) => {
    const clave = r
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .split(/\s+/)
      .filter((p) => p.length > 4);
    if (clave.length === 0) return false;
    return !clave.some((p) => normalizado.includes(p));
  });
}

export function validar(contenidos: Contenidos): readonly Hallazgo[] {
  const hallazgos: Hallazgo[] = [];

  for (const cap of CAPITULOS) {
    const texto = (contenidos[cap.id] ?? '').trim();

    if (texto.length === 0) {
      if (cap.obligatorio) {
        hallazgos.push({
          capituloId: cap.id,
          titulo: cap.titulo,
          gravedad: 'faltante',
          mensaje: 'El capítulo está vacío y su contenido es obligatorio.',
          norma: cap.norma,
        });
      }
      continue;
    }

    if (texto.length < 80) {
      hallazgos.push({
        capituloId: cap.id,
        titulo: cap.titulo,
        gravedad: 'incompleto',
        mensaje: 'El texto es demasiado breve para desarrollar el contenido exigido.',
        norma: cap.norma,
      });
    }

    const faltantes = mencionaTodo(texto, cap.debeContener);
    if (faltantes.length > 0) {
      hallazgos.push({
        capituloId: cap.id,
        titulo: cap.titulo,
        gravedad: 'incompleto',
        mensaje: `No se detectan estos elementos exigidos: ${faltantes.join(', ')}.`,
        norma: cap.norma,
      });
    }

    for (const senal of SENALES_DESACTUALIZACION) {
      if (senal.patron.test(texto)) {
        hallazgos.push({
          capituloId: cap.id,
          titulo: cap.titulo,
          gravedad: 'desactualizado',
          mensaje: senal.mensaje,
          norma: 'Ley 2466 de 2025 · Ley 2101 de 2021 · Ley 1429 de 2010',
        });
      }
    }
  }

  return hallazgos;
}

export function avanceDe(contenidos: Contenidos): {
  redactados: number;
  obligatorios: number;
  total: number;
} {
  const obligatorios = CAPITULOS.filter((c) => c.obligatorio);
  return {
    redactados: CAPITULOS.filter((c) => (contenidos[c.id] ?? '').trim().length >= 80).length,
    obligatorios: obligatorios.filter((c) => (contenidos[c.id] ?? '').trim().length >= 80).length,
    total: CAPITULOS.length,
  };
}

/* ══ Generación del articulado ═══════════════════════════════════ */

export function generarMarkdown(empresa: Empresa, contenidos: Contenidos): string {
  const { obligado, explicacion } = debeAdoptarReglamento(empresa.sector, empresa.trabajadores);
  let articulo = 0;

  const cuerpo = CAPITULOS.filter((c) => (contenidos[c.id] ?? '').trim().length > 0)
    .map((c, i) => {
      articulo += 1;
      return [
        `## CAPÍTULO ${romano(i + 1)} — ${c.titulo.toUpperCase()}`,
        '',
        `**ARTÍCULO ${articulo}.** ${contenidos[c.id]!.trim()}`,
        '',
        `> *Fundamento: ${c.norma}.*`,
        '',
      ].join('\n');
    })
    .join('\n');

  return [
    '# REGLAMENTO INTERNO DE TRABAJO',
    '',
    `**${empresa.razonSocial || '[RAZÓN SOCIAL]'}**  `,
    `NIT ${empresa.nit || '[NIT]'} — ${empresa.ciudad || '[CIUDAD]'}  `,
    `Vigencia a partir del ${empresa.fechaVigencia}`,
    '',
    '---',
    '',
    '> **Modelo base.** Este documento se generó de forma automática a partir de la',
    '> estructura del artículo 108 del Código Sustantivo del Trabajo y de las obligaciones',
    '> incorporadas por la Ley 2466 de 2025. **Requiere adaptación profesional al caso',
    '> concreto y revisión jurídica antes de su adopción.** No constituye concepto jurídico.',
    '',
    `> ${explicacion}`,
    '',
    '---',
    '',
    cuerpo,
    '---',
    '',
    '## ADOPCIÓN Y PUBLICACIÓN',
    '',
    `El presente reglamento fue adoptado por ${empresa.razonSocial || '[RAZÓN SOCIAL]'} y rige a partir del ${empresa.fechaVigencia}.`,
    'Se publica en dos lugares visibles del sitio de trabajo y se socializa con todos los trabajadores,',
    'dejando constancia de asistencia. Desde la Ley 1429 de 2010, artículo 17, no requiere aprobación',
    'previa del Ministerio del Trabajo.',
    '',
    obligado
      ? '**La empresa está obligada a adoptar reglamento conforme al artículo 105 del CST.**'
      : '*La adopción es voluntaria en este caso, pero necesaria para fundar cualquier proceso disciplinario.*',
    '',
    '',
    '_______________________________',
    'Representante legal',
    '',
    '---',
    '',
    `Estructurado con niand-estructurador-rit · NiAnd Labs · ${empresa.fechaVigencia}`,
  ].join('\n');
}

const ROMANOS = [
  '',
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII',
  'XIII',
  'XIV',
  'XV',
  'XVI',
  'XVII',
  'XVIII',
  'XIX',
  'XX',
] as const;

export function romano(n: number): string {
  return ROMANOS[n] ?? String(n);
}
