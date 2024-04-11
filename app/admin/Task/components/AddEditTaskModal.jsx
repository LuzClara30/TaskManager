import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { Input } from "@/components/Input";
import { getAllCollaborators } from "../../Collaborators/services/collaborators.services";
export const AddEditTaskModal = ({
  taskId,// Identificador de la tarea, va a permitir saber si se está creando o editando una tarea
  isOpen,// Indica si el modal está abierto o cerrado
  onClose,// Función que se ejecuta cuando se cierra el modal
  handleInputChange,// Función que se ejecuta cuando el valor de un input cambia
  handleSubmit,// Función que se ejecuta cuando se envía el formulario
  formData,// Datos del formulario
}) => {
  // Estado que almacena los colaboradores
  const [collaborators, setCollaborators] = useState([]);
// Función que se ejecuta cuando el componente se monta
  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        // Obtener los colaboradores
        const collaboratorsData = await getAllCollaborators();
        // Actualizar el estado con los colaboradores
        setCollaborators(collaboratorsData);
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    };
    // Llamar a la función para obtener los colaboradores
    fetchCollaborators();
  }, []);
  return (
    // Componente de Headless UI para crear un modal
    // permite mostrar un formulario para crear o editar una tarea además de animar la apertura y cierre del modal
    // El modal se muestra si isOpen es true
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-5 inset-0 overflow-y-auto"
        onClose={onClose}// Función que se ejecuta cuando se cierra el modal
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/*Elemento que se muestra detrás del modal */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* Este elemento sirve para engañar al navegador para que centre el contenido modal. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
            {/* Contenido principal del modal */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4   text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-1/3 sm:p-6">
              <div className="absolute top-0 right-0 mt-4 mr-4">
                {/* Botón para cerrar el modal */}
                <button type="button" onClick={onClose}>
                  {/* Alinear el botón en la esquina superior derecha */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
              {/* Título del modal */}
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                {taskId ? "Editar Tarea" : "Crear Tarea"}
              </Dialog.Title>
              {/* etiqueta y area de texto para agregar la descripción de la tarea */}
              <label
                htmlFor="descripcion"
                className="uppercase block text-md font-bold text-gray-600"
              >
                Descripción
              </label>
              <textarea
                id={formData["descripcion"]}// Identificador del elemento
                name="descripcion"// Nombre del elemento
                value={formData["descripcion"]}// Valor del elemento
                // Función que se ejecuta cuando el valor del elemento cambia
                onChange={(e) =>
                  handleInputChange("descripcion", e.target.value)
                }
                rows="2"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {/*  etiqueta y elemento select para seleccionar el colaborador */}
              <label
                htmlFor="colaborador_id"
                className="uppercase block text-md font-bold text-gray-600"
              >
                Colaborador
              </label>
              <select
                id="colaborador_id"// Identificador del elemento
                name="colaborador_id"// Nombre del elemento
                value={formData["colaborador_id"] || ""}// Valor del elemento
                // Función que se ejecuta cuando el valor del elemento cambia
                onChange={(e) =>
                  handleInputChange("colaborador_id", e.target.value)
                }
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
              >
                {/* Opción por defecto del select */}
                {!formData["colaborador_id"] && (
                  <option value="">Seleccione un colaborador</option>
                )} 
                {/* Mapear los colaboradores para mostrarlos en el select */}
                {collaborators.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.nombre}
                  </option>
                ))}
              </select>
              {/*  etiqueta y elemento select para el estado de la tarea */}
              <label
                htmlFor="estado"
                className="uppercase block text-md font-bold text-gray-600"
              >
                Estado
              </label>
              <select
                id="estado"// Identificador del elemento
                name="estado"// Nombre del elemento
                value={formData["estado"]}// Valor del elemento
                onChange={(e) => handleInputChange("estado", e.target.value)}// Función que se ejecuta cuando el valor del elemento cambia
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
              >
                {/* opción por defecto del select */}
                <option value="" disabled selected>
                  Seleccione un estado
                </option>
                {/* Opciones del select */}
                <option value="PENDIENTE">Pendiente</option>
                <option value="FINALIZADA">Finalizada</option>
                <option value="EN PROCESO">En Proceso</option>
              </select>

              {/* etiqueta y elemento select para la prioridad */}
              <label
                htmlFor="prioridad"
                className="uppercase block text-md font-bold text-gray-600 mt-5"
              >
                Prioridad
              </label>
              <select
                id="prioridad"// Identificador del elemento
                name="prioridad"// Nombre del elemento
                value={formData["prioridad"]}// Valor del elemento
                onChange={(e) => handleInputChange("prioridad", e.target.value)}// Función que se ejecuta cuando el valor del elemento cambia
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
              >
                 {/* opción por defecto del select */}
                <option value="" disabled selected>
                  Seleccione una prioridad
                </option>
                  {/* Opciones del select */}
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
              {/* Elemento input para la fecha de inicio */}
              <Input
                id="fecha_inicio"// Identificador del elemento
                labelText="fecha de inicio"// Etiqueta del elemento
                placeholder={"Ingrese la fecha de inicio"}// Placeholder del elemento
                type="date"// Tipo del elemento
                value={formData["fecha_inicio"]}// Valor del elemento
                onChange={(value) => handleInputChange("fecha_inicio", value)}// Función que se ejecuta cuando el valor del elemento cambia
              />
              {/* Elemento input para la fecha de finalización */}
              <Input
                id="fecha_fin"// Identificador del elemento
                labelText="fecha de finalización"// Etiqueta del elemento
                placeholder={"Ingrese la fecha de finalización"}// Placeholder del elemento
                type="date"// Tipo del elemento
                value={formData["fecha_fin"]}// Valor del elemento
                onChange={(value) => handleInputChange("fecha_fin", value)}// Función que se ejecuta cuando el valor del elemento cambia
              />
              {/* etiqueta y area de texto para agregar la nota de la tarea */}
              <label
                htmlFor="notas"
                className="uppercase block text-md font-bold text-gray-600"
              >
                Notas
              </label>
              <textarea
                id={formData["notas"]}// Identificador del elemento
                name="notas"// Nombre del elemento
                value={formData["notas"]}// Valor del elemento
                onChange={(e) => handleInputChange("notas", e.target.value)}// Función que se ejecuta cuando el valor del elemento cambia
                rows="2"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />

              <div className="mt-5 sm:mt-6">
                {/* Botón para guardar la tarea */}
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary hover:bg-teal-300  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={handleSubmit}// Función que se ejecuta cuando se hace click en el botón
                >
                  Guardar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
