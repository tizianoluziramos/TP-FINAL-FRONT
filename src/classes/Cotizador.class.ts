export default class CotizadorClass {
  costoM2: number;
  factorPropiedad: number;
  factorUbicacion: number;
  factorEstado: number;
  metros2: number;
  edad: number;

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

  private factorEdad(): number {
    // Aquí defines cómo afecta la edad al cálculo
    if (this.edad < 25) return 1.2; // Ejemplo: +20% para menores de 25
    if (this.edad <= 40) return 1.0; // 25-40 sin cambio
    if (this.edad <= 60) return 0.9; // 41-60 -10%
    return 1.1; // mayores de 60 +10%
  }

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
