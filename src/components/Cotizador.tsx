import React, { useState } from "react";
import SelectInput from "./SelectInput";
import {
  datosPropiedad,
  datosUbicacion,
  datosEstadoPropiedad,
  costoM2,
} from "../data/datos";
import type { Cotizacion } from "../types/types";
import CotizadorClass from "../classes/Cotizador.class";
import { alerta } from "../utils/notifications";
import { guardarCotizacion } from "../utils/historial";

const Cotizador: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [propiedad, setPropiedad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [metros2, setMetros2] = useState(20);
  const [edad, setEdad] = useState(30); // Edad agregada
  const [valorPoliza, setValorPoliza] = useState("0.00");
  const [btnCargando, setBtnCargando] = useState(false);
  const [btnGuardarVisible, setBtnGuardarVisible] = useState(false);
  const [errorNombre, setErrorNombre] = useState("");
  const [estadoPropiedad, setEstadoPropiedad] = useState("");

  const datosCompletos = () =>
    nombre.trim() !== "" &&
    propiedad &&
    ubicacion &&
    estadoPropiedad &&
    metros2 >= 20 &&
    edad >= 18;

  // Función de cotización
  const cotizo = async () => {
    setBtnCargando(true);

    // Simula tiempo de carga
    await new Promise((res) => setTimeout(res, 1500));

    const factorProp =
      datosPropiedad.find((d) => d.tipo === propiedad)?.factor || 1;
    const factorUbic =
      datosUbicacion.find((d) => d.tipo === ubicacion)?.factor || 1;
    const factorEstado =
      datosEstadoPropiedad.find((d) => d.tipo === estadoPropiedad)?.factor || 1;
    const coti = new CotizadorClass(
      costoM2,
      factorProp,
      factorUbic,
      factorEstado,
      metros2,
      edad
    );
    setValorPoliza(coti.cotizarPoliza());

    alerta("", "Cotización realizada con éxito.", "success");
    setBtnGuardarVisible(true);
    setBtnCargando(false);
  };

  // Ejecutar cotización si los datos son completos
  const realizarCotizacion = () => {
    if (!datosCompletos()) {
      alerta("", "Debes completar todos los datos en pantalla.", "warning");
      return;
    }
    cotizo();
  };

  // Guardar cotización en historial
  const guardarEnHistorial = () => {
    const cotizacion: Cotizacion = {
      nombre,
      fechaCotizacion: new Date().toLocaleString(),
      propiedad,
      ubicacion,
      estadoPropiedad,
      metrosCuadrados: metros2,
      poliza: valorPoliza,
      edad, // Guardamos edad también
    };

    guardarCotizacion(cotizacion);
    setBtnGuardarVisible(false);
  };

  return (
    <div className="center div-cotizador">
      <h2 className="center separador">
        Completa los datos solicitados para cotizar
      </h2>

      {/* Nombre */}
      <div className="separador">
        <label htmlFor="nombre">Nombre completo:</label>
        <input
          type="text"
          id="nombre"
          placeholder="Ej: Juan Pérez"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            setErrorNombre(
              e.target.value.trim() === "" ? "Este campo es requerido" : ""
            );
          }}
          onBlur={() => {
            if (nombre.trim() === "") setErrorNombre("Este campo es requerido");
          }}
          style={{ borderColor: errorNombre ? "gold" : undefined }}
        />
      </div>

      {/* Edad */}
      <div className="separador">
        <label htmlFor="edad">Edad del propietario:</label>
        <input
          type="number"
          id="edad"
          value={edad}
          min={18}
          max={120}
          onChange={(e) => setEdad(Number(e.target.value))}
        />
      </div>

      {/* Tipo de propiedad */}
      <SelectInput
        label="Tipo de propiedad"
        id="propiedad"
        options={datosPropiedad.map((d) => d.tipo)}
        value={propiedad}
        onChange={(e) => setPropiedad(e.target.value)}
      />

      {/* Ubicación */}
      <SelectInput
        label="Ubicación de la propiedad"
        id="ubicacion"
        options={datosUbicacion.map((d) => d.tipo)}
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
      />

      <SelectInput
        label="Estado de la propiedad"
        id="estadoPropiedad"
        options={["Nueva", "Buen estado", "A refaccionar", "Muy deteriorada"]}
        value={estadoPropiedad}
        onChange={(e) => setEstadoPropiedad(e.target.value)}
      />

      {/* Metros cuadrados */}
      <div className="separador">
        <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
        <input
          type="number"
          id="metros2"
          value={metros2}
          min={20}
          max={500}
          onChange={(e) => setMetros2(Number(e.target.value))}
        />
      </div>

      {/* Botón Cotizar */}
      <div className="center separador">
        <button
          className="button button-outline"
          onClick={realizarCotizacion}
          disabled={btnCargando}
        >
          {btnCargando ? (
            <img
              src="images/Ellipsis-1.1s-44px.gif"
              width="40px"
              alt="Cargando"
            />
          ) : (
            "Cotizar"
          )}
        </button>
      </div>

      {/* Resultado */}
      <div className="center separador">
        <p className="importe">
          Precio estimado: $ <span>{valorPoliza}</span>
          {btnGuardarVisible && (
            <span
              className="guardar"
              title="Guarda en historial"
              onClick={guardarEnHistorial}
            >
              💾
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Cotizador;
