import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { GraficoProps } from "../types/types";

const Grafico: React.FC<GraficoProps> = ({ historial }) => {
  const datos = historial.map((c) => ({
    propiedad: c.propiedad,
    ubicacion: c.ubicacion,
    poliza: Number(c.poliza),
  }));

  // Paleta de colores — se repite si hay más cotizaciones
  const colores = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#0088fe",
    "#a4de6c",
    "#d0ed57",
    "#ffbb28",
    "#ff8042",
  ];

  return (
    <div style={{ width: "100%", height: 300, marginBottom: "20px" }}>
      <ResponsiveContainer>
        <BarChart data={datos}>
          <XAxis dataKey="propiedad" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="poliza" name="Póliza ($)">
            {datos.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colores[index % colores.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Grafico;
