import {useState } from "react";

export const Search = ({
    placeholder,//propiedad que recibe el texto que se mostrara en el input por defecto
    onChange //propiedad que recibe la funcion que se ejecutara cuando el valor del input cambie
}) => {
    const [valueState, setValueState] = useState("");//estado que almacena el valor del input
    //funcion que se ejecuta cuando el valor del input cambia
    const handleChange = (e) => {
        const newValue = e.target.value;
        setValueState(newValue);//actualiza el estado con el nuevo valor
        if (onChange) {//si la propiedad onChange no es nula
            onChange(newValue);//ejecuta la funcion onChange con el nuevo valor
        }
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder={placeholder}//muestra el texto que recibe la propiedad placeholder
                value={valueState}//muestra el valor del estado
                onChange={handleChange}//ejecuta la funcion handleChange cuando el valor del input cambia
                className="border-2 rounded-xl p-2 pl-12"
            />
            {/*icono de busqueda*/}
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </span>
        </div>
    );
}
