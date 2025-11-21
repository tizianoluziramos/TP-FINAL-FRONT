export interface Cotizacion {
  nombre: string;
  fechaCotizacion: string;
  propiedad: string;
  ubicacion: string;
  estadoPropiedad: string;
  metrosCuadrados: number;
  poliza: string;
  edad: number;
}

export interface GraficoProps {
  historial: Cotizacion[];
}

export interface SelectInputProps {
  label: string;
  id: string;
  options?: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface DatoProps {
  tipo: string;
  factor: number;
}
