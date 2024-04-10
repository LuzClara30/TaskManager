//Componente que muestra la lista de colaboradores en una tabla
export const CollaboratorsList = ({currentCollaborators}) => {

  return (
    <div className="relative overflow-x-auto">
      {/* Tabla que muestra la lista de los colaboradores */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</th>
              <td className="px-6 py-4">{item.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
