import React from "react";
import { type SelectInputProps } from "../types/types";

/**
 * Componente de input tipo select (desplegable) para formularios.
 * 
 * @component
 * @param {SelectInputProps} props - Props del componente
 * @param {string} props.label - Texto de la etiqueta que se muestra junto al select
 * @param {string} props.id - Identificador único del select y del label
 * @param {string[]} [props.options=[]] - Lista de opciones disponibles en el select
 * @param {string} props.value - Valor seleccionado actualmente
 * @param {(event: React.ChangeEvent<HTMLSelectElement>) => void} props.onChange - Función que se ejecuta al cambiar el valor
 * @returns {JSX.Element} Renderiza un label y un select con opciones
 * 
 * @example
 * <SelectInput
 *   label="Elige un color"
 *   id="color"
 *   options={['Rojo', 'Verde', 'Azul']}
 *   value={selectedColor}
 *   onChange={handleColorChange}
 * />
 */
const SelectInput: React.FC<SelectInputProps> = ({
  label,
  id,
  options = [],
  value,
  onChange,
}) => {
  return (
    <div className="separador">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange}>
        {/* Opción por defecto deshabilitada */}
        <option value="" disabled>
          ...
        </option>

        {/* Renderizado dinámico de opciones */}
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
