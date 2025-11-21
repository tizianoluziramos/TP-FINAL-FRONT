import type { Cotizacion } from "../types/types";
import { toast } from "./notifications";

export const guardarCotizacion = (cotizacion: Cotizacion) => {
  const historial: Cotizacion[] = JSON.parse(
    localStorage.getItem("historialCotizaciones") || "[]"
  );
  historial.push(cotizacion);
  localStorage.setItem("historialCotizaciones", JSON.stringify(historial));
  toast();
};
