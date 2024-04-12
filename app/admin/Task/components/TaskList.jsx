//Componente que muestra la lista de tareas en una tabla
import { EditButton } from "@/components/EditButton";
import { DeleteButton } from "@/components/DeleteButton";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getAllCollaborators } from "../../Collaborators/services/collaborators.services";
import FilterColumn from "./FilterColumn";
import { useEffect, useState } from "react";
//Componente que muestra la lista de tareas en una tabla
//Recibe los parametros currentTask, editTask y eliminateTask
//currentTask: Lista de tareas
//editTask: Función para editar una tarea
//eliminateTask: Función para eliminar una tarea
export const TaskList = ({
  currentTask,
  editTask,
  eliminateTask,
  setTask,
  originalTask,
}) => {
  const [collaborators, setCollaborators] = useState([]); //Estado para almacenar la lista de colaboradores
  useEffect(() => {
    const getCollaborators = async () => {
      const data = await getAllCollaborators(); //Llamada a la función que obtiene la lista de colaboradores desde el api
      setCollaborators(data); //Almacenar la lista de colaboradores en el estado
    };
    getCollaborators();
  }, []);
  const submit = (task) => {
    confirmAlert({
      title: "Confirmar para eliminar", //Titulo de la alerta
      message: "Esta seguro de eliminar esta tarea?", //Mensaje de la alerta
      buttons: [
        {
          label: "Sí", //Boton de confirmación
          onClick: () => {
            eliminateTask(task);
          },
        },
        {
          label: "Cancelar", //Boton de cancelación
        },
      ],
    });
  };
  return (
    <div className="relative overflow-x-auto">
      {/* Tabla que muestra la lista de los tareas */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {/* Columna ID para la identificación de la tarea */}
            <th scope="col" className="px-6 py-3">
              <FilterColumn
                task={currentTask}
                setTask={setTask}
                originalTask={originalTask}
                filterType={"id"}
              />
            </th>
            {/* Columna Descripción para la descripción de la tarea */}
            <th scope="col" className="px-2 py-3">
              <FilterColumn
                task={currentTask}
                setTask={setTask}
                originalTask={originalTask}
                filterType={"descripcion"}
              />
            </th>
            {/* Columna Colaborador para el colaborador de la tarea */}
            <th scope="col" className="px-2 py-3">
              <FilterColumn
                task={currentTask}
                setTask={setTask}
                originalTask={originalTask}
                filterType={"colaborador_id"}
                collaborators={collaborators}
              />
            </th>
            {/* Columna Estado para el estado de la tarea */}
            <th scope="col" className="px-2 py-3">
              <FilterColumn
                task={currentTask}
                setTask={setTask}
                originalTask={originalTask}
                filterType={"estado"}
              />
            </th>
            {/* Columna Prioridad para la prioridad de la tarea */}
            <th scope="col" className="px-0 py-3">
              <FilterColumn
                task={currentTask}
                setTask={setTask}
                originalTask={originalTask}
                filterType={"prioridad"}
              />
            </th>
            {/* Columna Fecha de inicio para la fecha de inicio de la tarea */}
            <th scope="col" className="px-6 py-3">
              Fecha de inicio
            </th>
            {/* Columna Fecha de fin para la fecha de fin de la tarea */}
            <th scope="col" className="px-6 py-3">
              Fecha de fin
            </th>
            {/* Columna Notas para las opciones de la tarea */}
            <th scope="col" className="px-6 py-3">
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Mapeo de la lista de tareas */}
          {currentTask.map((item) => (
            <tr
              className="bg-white border-b "
              key={item.id}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {item.id}
              </th>
              {/* contenido de cada una de las columnas, los datos deben seguir un orden de creación igual al de las columnas */}
              <td className="px-6 py-4">{item.descripcion}</td>
              {/* Filtrar la lista de colaboradores para obtener el nombre del colaborador con item.colaborador_id */}
              <td className="px-6 py-4">
                {item.colaborador_id !== null
                  ? collaborators
                      .filter(
                        (colaborador) => colaborador.id === item.colaborador_id
                      )
                      .map((colaborador) => colaborador.nombre)
                  : "No asignado"}
              </td>
              <td className="px-6 py-4">{item.estado}</td>
              <td className="px-6 py-4">{item.prioridad}</td>
              <td className="px-6 py-4">
                {/* Se pasa el formato de las fechas a YYYY-MM-DD */}
                {new Date(item.fecha_inicio).toISOString().split("T")[0]}
              </td>
              <td className="px-6 py-4">
                {new Date(item.fecha_fin).toISOString().split("T")[0]}
              </td>
              <td className="px-6 py-4">
                {
                  <div className="flex items-center space-x-2">
                    <EditButton editElement={() => editTask(item)} />
                    <DeleteButton
                      deleteElement={() => {
                        submit(item);
                      }}
                    />
                  </div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
