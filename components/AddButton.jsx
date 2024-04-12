export const AddButton = ({ addElement, name }) => {// Botón para agregar un elemento
    return (
      <button
        type="button"
        className="inline-flex px-4 py-2 mb-4 border border-transparent font-medium 
        rounded-md shadow-sm text-white bg-secondary hover:bg-primary 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
         gap-2"
        onClick={addElement}// Ejecuta la función addElement cuando se hace clic en el botón
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        {/* texto que se nuestra eb el botón */}
        {name}
      </button>
    );
  };
  