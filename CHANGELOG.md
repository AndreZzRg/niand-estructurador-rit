# Registro de cambios

Todos los cambios relevantes de **Estructurador de RIT** se documentan aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el
versionado sigue [Versionado Semántico](https://semver.org/lang/es/).

## [No publicado]

### Corregido

- **El paso «Pruebas con cobertura» de la integración continua fallaba.**
  `src/lib/almacen.ts` y `src/lib/exportar.ts` no tenían pruebas y quedaban en
  0 %, lo que arrastraba la cobertura global por debajo de los umbrales
  declarados en `vite.config.ts` y hacía fallar `npm run test:coverage` en cada
  ejecución, aunque `vitest run` a secas pasara.

### Agregado

- Cobertura de pruebas de `src/lib`: validación por esquema y versión del
  almacenamiento, descarte del contenido corrupto, aislamiento de claves entre
  aplicaciones, y escape CSV conforme al RFC 4180 en la exportación.

---

## [1.0.0] — 2026-09-17

Primera versión pública del laboratorio.

### Agregado

- Módulo **Perfil de la empresa**.
- Módulo **Capítulos**.
- Módulo **Validación de contenido mínimo**.
- Módulo **Vista previa del articulado**.
- Módulo **Exportación**.
- Documentación completa en `docs/`: arquitectura, marco normativo, despliegue,
  guía de uso, decisiones de arquitectura y descargo de responsabilidad.
- Integración continua en tres versiones de Node (20, 22 y 24) con formato, análisis
  estático, verificación de tipos, pruebas con cobertura y construcción de producción.
- Despliegue automático en GitHub Pages desde `main`.
- Análisis de seguridad con CodeQL y actualización de dependencias con Dependabot.
- Sistema de diseño NiAnd Labs con modo claro y oscuro y contraste AA.

### Normativo

- Reglas derivadas de **Código Sustantivo del Trabajo, art. 108**: Contenido mínimo obligatorio del Reglamento Interno de Trabajo.
- Reglas derivadas de **Código Sustantivo del Trabajo, arts. 104 a 125**: Régimen del reglamento, publicación y sanciones.
- Reglas derivadas de **Ley 2466 de 2025**: Jornada nocturna, recargos, licencias y debido proceso disciplinario.
- Reglas derivadas de **Ley 2191 de 2022**: Derecho a la desconexión laboral.
- Reglas derivadas de **Ley 1010 de 2006 y Ley 2365 de 2024**: Mecanismos de prevención del acoso laboral y sexual.

> Verificación normativa: 17 de septiembre de 2026.

[No publicado]: https://github.com/AndreZzRg/niand-estructurador-rit/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/AndreZzRg/niand-estructurador-rit/releases/tag/v1.0.0
