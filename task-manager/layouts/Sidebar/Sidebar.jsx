"use client"//código ejecutado del lado del cliente (navegador)

import { useState } from "react";// hook useState gestiona el estado dentro del componente.

import SideButton from "./SideButton";
import NavItem from "./NavItem";

import menus from "./items.json";
//Explicación del código:
//Representa el contendor principal de la barra lateral que aloja el botón de apertura y cierre del menú y los elementos de navegación.
//El estado 'open' controla si la barra lateral esta abierta o cerrada.
//El ancho se ajusta de manera dinámica según el estado de 'open'.
const Sidebar = () => {
  const [open, setOpen] = useState(true);//definición del estado open y setOpen para controlar la apertura y cierre del menú lateral.
  return (
    <aside
      className={`${
        open ? "min-w-fit md:w-1/3 xl:w-1/5" : "w-20" 
      } bg-primary min-h-screen  duration-150 overflow-hidden text-gray-100 px-3
      rounded-md`}
    >
      <SideButton onClick={() => setOpen(!open)} open={open} /> {/*Botón para abrir y cerrar el menú lateral*/}
      <div className="flex flex-col justify-center ">
        {menus?.map((item, i) => <NavItem key={i} item={item} open={open} />)} {/*Iteración de los elementos del menú lateral*/}
      </div>
    </aside>
  );
};

export default Sidebar;