//Componente que muestra la lista de colaboradores en una tabla
export const CollaboratorsList = ({currentCollaborators}) => {

  return (
    <div className="relative overflow-x-auto">
      {/* Tabla que muestra la lista de los colaboradores */}
      <table className="w-full text-md text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
          {/* Columna ID para la identificación del colaborador */}
            <th scope="col" className="px-6 py-3">ID</th> 
          {/* Columna Nombre para el nombre del colaborador */}
            <th scope="col" className="px-6 py-3">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapeo de la lista de colaboradores */}
          {currentCollaborators.map(item => ( 
            <tr className="bg-white border-b  " key={item.id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">{item.id}</th>
              <td className="px-6 py-4">{item.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
