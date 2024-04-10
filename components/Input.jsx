import { useState, useEffect } from "react";

export const Input = ({
    id, // Identificador único del input
    labelText, // Texto que describe el input
    placeholder, // Texto que se muestra en el input por defecto
    disabled = false,// Indica si el input está deshabilitado
    value = "",// Valor del input
    onChange,// Función que se ejecutará cuando el valor del input cambie
    type = "text",// Tipo de input
    checked,
}) => {
    const [valueState, setValueState] = useState(value);// Estado que almacena el valor del input

    useEffect(() => {
        setValueState(value);
    }, [value]);

    const handleChange = (e) => {// Función que se ejecuta cuando el valor del input cambia
        const newValue = e.target.value;// Nuevo valor del input
        setValueState(newValue);// Actualiza el estado con el nuevo valor
        if (onChange) {// Si la función onChange no es nula
            onChange(newValue);// Ejecuta la función onChange con el nuevo valor
        }
    };

    return (
        <div className="my-5">
            <label
                className={`uppercase block text-md font-bold
                ${disabled ? "text-gray-300" : "text-gray-600"}`}
                htmlFor={id}>
                {labelText}
            </label>
            <input
                id={id}// Identificador único del input
                type={type}// Tipo de input
                placeholder={placeholder}// Texto que se muestra en el input por defecto
                value={valueState}// Valor del input
                onChange={handleChange}// Función que se ejecutará cuando el valor del input cambie
                disabled={disabled}// Indica si el input está deshabilitado
                checked={checked}// Indica si el input está seleccionado
                className={`mt-3 p-3 border rounded-xl bg-gray-50
                ${disabled ? "cursor-not-allowed text-gray-300 w-full md:w-auto" : "w-full"}`} />
        </div>
    );
};
