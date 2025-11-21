import React, { useEffect, useState } from "react";
import Grafico from "../components/Grafico";
import { type Cotizacion } from "../types/types";

const Historial: React.FC = () => {
  const [historial, setHistorial] = useState<Cotizacion[]>([]);
  const [filtro, setFiltro] = useState("");
  const [ordenColumna, setOrdenColumna] = useState<keyof Cotizacion | null>(
    null
  );
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [pagina, setPagina] = useState(1);
  const ITEMS_POR_PAGINA = 5;

  useEffect(() => {
    const datos: Cotizacion[] = JSON.parse(
      localStorage.getItem("historialCotizaciones") || "[]"
    );
    setHistorial(datos);
  }, []);

  const filtrarHistorial = historial.filter(
    (c) =>
      c.propiedad.toLowerCase().includes(filtro.toLowerCase()) ||
      c.ubicacion.toLowerCase().includes(filtro.toLowerCase())
  );

  const borrarTodo = () => {
    if (historial.length === 0) return;

    const confirmar = window.confirm(
      "¿Estas seguro que quieres borrar todo el historial?"
    );

    if (confirmar) {
      localStorage.removeItem("historialCotizaciones");
      setHistorial([]);
    }
  };

  const ordenarHistorial = [...filtrarHistorial].sort((a, b) => {
    if (!ordenColumna) return 0;
    const valorA = a[ordenColumna];
    const valorB = b[ordenColumna];
    if (typeof valorA === "number" && typeof valorB === "number") {
      return ordenAsc ? valorA - valorB : valorB - valorA;
    }
    return ordenAsc
      ? String(valorA).localeCompare(String(valorB))
      : String(valorB).localeCompare(String(valorA));
  });

  const totalPaginas = Math.ceil(ordenarHistorial.length / ITEMS_POR_PAGINA);
  const datosPaginados = ordenarHistorial.slice(
    (pagina - 1) * ITEMS_POR_PAGINA,
    pagina * ITEMS_POR_PAGINA
  );

  const cambiarOrden = (columna: keyof Cotizacion) => {
    if (ordenColumna === columna) {
      setOrdenAsc(!ordenAsc);
    } else {
      setOrdenColumna(columna);
      setOrdenAsc(true);
    }
  };

  const borrarFila = (idx: number) => {
    if (window.confirm("¿Desea borrar esta cotizacion?")) {
      const nuevaLista = [...historial];
      nuevaLista.splice(idx, 1);
      localStorage.setItem("historialCotizaciones", JSON.stringify(nuevaLista));
      setHistorial(nuevaLista);
    }
  };

  return (
    <div className="center div-cotizador">
      <h1 className="center separador" style={{ color: "black" }}>
        Historial 📋
      </h1>

      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <input
          type="text"
          placeholder="Buscar por propiedad o ubicacion..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ height: "2.5rem", width: "70%", minWidth: "300px" }}
        />
      </div>

      {historial.length > 1 && <Grafico historial={ordenarHistorial} />}

      <table>
        <thead>
          <tr>
            <th onClick={() => cambiarOrden("nombre")}>Nombre</th>
            <th onClick={() => cambiarOrden("edad")}>Edad</th>
            <th onClick={() => cambiarOrden("fechaCotizacion")}>Fecha 📅</th>
            <th onClick={() => cambiarOrden("propiedad")}>Propiedad 🏠</th>
            <th onClick={() => cambiarOrden("ubicacion")}>Ubicación 📍</th>
            <th onClick={() => cambiarOrden("estadoPropiedad")}>Estado 🏚️</th>
            <th onClick={() => cambiarOrden("metrosCuadrados")}>Metros² 📐</th>
            <th onClick={() => cambiarOrden("poliza")}>Póliza 💰</th>
            <th>Acciones ⚙️</th>
          </tr>
        </thead>
        <tbody>
          {datosPaginados.length > 0 ? (
            datosPaginados.map((fila, idx) => (
              <tr key={idx}>
                <td>{fila.nombre}</td>
                <td>{fila.edad}</td>
                <td>{fila.fechaCotizacion}</td>
                <td>{fila.propiedad}</td>
                <td>{fila.ubicacion}</td>
                <th onClick={() => cambiarOrden("estadoPropiedad")}>
                  Estado 🏚️
                </th>
                <td>{fila.metrosCuadrados}</td>
                <td>$ {Number(fila.poliza).toLocaleString()}</td>
                <td>
                  <button
                    className="button button-outline text-rojo"
                    onClick={() =>
                      borrarFila(idx + (pagina - 1) * ITEMS_POR_PAGINA)
                    }
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-rojo">
                No hay cotizaciones realizadas
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-2 my-3">
          <button
            className="button button-outline"
            onClick={() => setPagina(pagina - 1)}
            disabled={pagina === 1}
          >
            Anterior
          </button>
          <span>
            Página {pagina} de {totalPaginas}
          </span>
          <button
            className="button button-outline"
            onClick={() => setPagina(pagina + 1)}
            disabled={pagina === totalPaginas}
          >
            Siguiente
          </button>
        </div>
      )}

      <div className="d-flex justify-content-between my-3">
        <div>
          <button
            className="button button-outline"
            onClick={() => window.history.back()}
          >
            VOLVER
          </button>
        </div>
        <div>
          <button
            className="btn btn-outline-danger"
            onClick={borrarTodo}
            disabled={historial.length === 0}
          >
            Borrar Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Historial;
