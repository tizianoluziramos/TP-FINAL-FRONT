import { type DatoProps } from "../types/types";

export const datosPropiedad: DatoProps[] = [
  { tipo: "Casa", factor: 1.09 },
  { tipo: "P.H.", factor: 1.05 },
  { tipo: "Depto. Edificio", factor: 1.02 },
  { tipo: "Barrio Privado", factor: 1.19 },
  { tipo: "Oficina", factor: 2.39 },
  { tipo: "Local Comercial", factor: 1.41 },
  { tipo: "Depósito Logística", factor: 1.92 },
];

export const datosUbicacion: DatoProps[] = [
  { tipo: "Ciudad Autónoma de Bs. As.", factor: 1.13 },
  { tipo: "Tandil, Buenos Aires", factor: 1.04 },
  { tipo: "Costa Atlántica", factor: 1.29 },
  { tipo: "Patagonia Argentina", factor: 1.01 },
  { tipo: "Gran Buenos Aires", factor: 1.25 },
  { tipo: "9 de Julio, Pcia de Bs. As.", factor: 1.005 },
  { tipo: "Chivilcoy, Pcia de Bs. As.", factor: 1.012 },
];

export const costoM2: number = 351.86;

export const datosEstadoPropiedad: DatoProps[] = [
  { tipo: "Nueva", factor: 0.9 },
  { tipo: "Buen estado", factor: 1.0 },
  { tipo: "A refaccionar", factor: 1.15 },
  { tipo: "Muy deteriorada", factor: 1.3 },
];