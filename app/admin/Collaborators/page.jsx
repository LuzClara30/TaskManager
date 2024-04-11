"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { CollaboratorsList } from './components/CollaboratorsList';
import {getAllCollaborators} from './services/collaborators.services';
import { Search } from '../../../components/Search'
const page = () => {
const [collaborators, setCollaborators] = useState([]);//Estado para almacenar la lista de colaboradores
const [isLoading, setIsLoading] = useState(true); //Estado para mostrar el spinner de carga
const [originalCollaborators, setOriginalCollaborators] = useState([]); //componente para realizar la busqueda
//UseEffect para obtener la lista de colaboradores al montar el componente
useEffect(() => {
    const getCollaborators = async () => {
        const data = await getAllCollaborators();//Llamada a la función que obtiene la lista de colaboradores desde el api
        setOriginalCollaborators(data);
        setCollaborators(data);//Almacenar la lista de colaboradores en el estado
        setIsLoading(false);//Para indicar que ya se cargaron los colaboradores
    }
    getCollaborators();
}, []);
//Función para realizar la busqueda de colaboradores
const handleSearch = (searchValue) => {
  if (searchValue === "") {
    setCollaborators(originalCollaborators);// Restaurar la lista original si la búsqueda está vacía
    return;
  }

  const filteredCollaborators = originalCollaborators.filter((user) => {
    return user.nombre.toLowerCase().includes(searchValue.toLowerCase());// Filtrar colaboradores por nombre
  });
  setCollaborators(filteredCollaborators);//Actualizar la lista de colaboradores con los colaboradores filtrados
};

  return(
    <section className="w-full">
    <h1 className="font-bold text-2xl mb-5 mt-5 text-secondary">Colaboradores</h1>
    <section className="flex flex-col sm:flex-row gap-3 items-center">
      <Search
        placeholder="Buscar colaborador"
        onChange={handleSearch}
      />
    </section>
    <section className="shadow-lg p-5 mt-10">
      {/* Muestra un mensaje de carga si isLoading es true */}
      {isLoading && (
        <div className="flex justify-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
       {/* Renderizar la lista de colaboradores o un mensaje si no hay colaboradores */}
      {collaborators?.length ? (
        <CollaboratorsList
        currentCollaborators={collaborators}/>
      ) : (
        !isLoading && (
          <p className="text-center">
            A&uacute;n no hay colaboradores agregados
          </p>
        )
      )}
    </section>
  </section>
  );
}

export default page;