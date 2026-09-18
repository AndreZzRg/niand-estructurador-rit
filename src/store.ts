/**
 * Estado del estructurador de RIT. Guarda el perfil de la empresa y el texto
 * de cada capítulo; el articulado se genera siempre desde el dominio.
 */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { almacenZustand } from './lib/almacen';
import { CAPITULOS, type Contenidos, type Empresa } from './domain/rit';

interface Estado {
  empresa: Empresa;
  contenidos: Record<string, string>;
  setEmpresa: (p: Partial<Empresa>) => void;
  escribir: (capituloId: string, texto: string) => void;
  cargarModelo: (capituloId: string) => void;
  cargarTodosLosModelos: () => void;
  limpiar: () => void;
}

const INICIAL = {
  empresa: {
    razonSocial: '',
    nit: '',
    ciudad: 'Bogotá D.C.',
    sector: 'comercial',
    trabajadores: 15,
    fechaVigencia: '2026-10-01',
  } satisfies Empresa,
  contenidos: {} as Record<string, string>,
};

export const useEstado = create<Estado>()(
  persist(
    (set) => ({
      ...structuredClone(INICIAL),
      setEmpresa: (p) => set((s) => ({ empresa: { ...s.empresa, ...p } })),
      escribir: (capituloId, texto) =>
        set((s) => ({ contenidos: { ...s.contenidos, [capituloId]: texto } })),
      cargarModelo: (capituloId) =>
        set((s) => {
          const cap = CAPITULOS.find((c) => c.id === capituloId);
          return cap ? { contenidos: { ...s.contenidos, [capituloId]: cap.modelo } } : s;
        }),
      cargarTodosLosModelos: () =>
        set((s) => ({
          contenidos: {
            ...Object.fromEntries(CAPITULOS.map((c) => [c.id, c.modelo])),
            ...Object.fromEntries(Object.entries(s.contenidos).filter(([, v]) => v.trim() !== '')),
          },
        })),
      limpiar: () => set({ contenidos: {} }),
    }),
    {
      name: 'estado',
      version: 1,
      storage: createJSONStorage(() => almacenZustand),
      partialize: (s) => ({ empresa: s.empresa, contenidos: s.contenidos }),
    },
  ),
);

export function useContenidos(): Contenidos {
  return useEstado((s) => s.contenidos);
}
