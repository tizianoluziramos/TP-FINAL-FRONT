export default class CotizadorClass {
  /** Costo por metro cuadrado */
  costoM2: number;

  /** Factor según tipo de propiedad */
  factorPropiedad: number;

  /** Factor según ubicación de la propiedad */
  factorUbicacion: number;

  /** Factor según estado de la propiedad */
  factorEstado: number;

  /** Metros cuadrados de la propiedad */
  metros2: number;

  /** Edad de la propiedad (años) */
  edad: number;

  /**
   * Constructor de la clase CotizadorClass.
   * @param costoM2 - Costo por metro cuadrado
   * @param factorPropiedad - Factor basado en tipo de propiedad
   * @param factorUbicacion - Factor basado en ubicación
   * @param factorEstado - Factor basado en estado de la propiedad
   * @param metros2 - Superficie en metros cuadrados
   * @param edad - Edad de la propiedad en años
   */
  constructor(
    costoM2: number,
    factorPropiedad: number,
    factorUbicacion: number,
    factorEstado: number,
    metros2: number,
    edad: number,
  ) {
    this.costoM2 = Number(costoM2);
    this.factorPropiedad = Number(factorPropiedad);
    this.factorUbicacion = Number(factorUbicacion);
    this.factorEstado = Number(factorEstado);
    this.metros2 = Number(metros2);
    this.edad = Number(edad);
  }

  /**
   * Calcula el factor de ajuste basado en la edad de la propiedad.
   * Este método es privado y solo se usa internamente para la cotización.
   * @returns El factor de ajuste según la edad
   */
  private factorEdad(): number {
    if (this.edad < 25) return 1.2;      // +20% para propiedades menores de 25 años
    if (this.edad <= 40) return 1.0;     // 25-40 años sin cambio
    if (this.edad <= 60) return 0.9;     // 41-60 años -10%
    return 1.1;                           // mayores de 60 años +10%
  }

  /**
   * Calcula la cotización de la póliza según todos los factores y metros cuadrados.
   * @returns El valor cotizado como string con 2 decimales
   */
  cotizarPoliza(): string {
    const resultado =
      this.costoM2 *
      this.factorPropiedad *
      this.factorUbicacion *
      this.factorEstado *
      this.factorEdad() *
      this.metros2;

    return resultado.toFixed(2);
  }
}
