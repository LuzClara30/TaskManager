export const EditButton = ({ editElement }) => {// Botón para editar un elemento
    return (
       <button
         type="button"
         className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-tertiary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200"
         onClick={editElement}// Ejecuta la función editElement cuando se hace clic en el botón
       >
        Editar
       </button>
    );
   };
   
