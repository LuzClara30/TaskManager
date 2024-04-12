import { Input } from "@/components/Input";
//Componente que permite filtrar las tareas por un rango de fechas
export const RangePicker = ({currentTask, setTask, originalTask }) => {
    return (
      <div className="relative">
          <div className="flex justify-between">
            <div className="w-1/2">
              <span className="px-2 uppercase  text-sm font-bold text-secondary">Filtro: Fecha de inicio</span>
              <Input
                id="fechaInicio"
                type="date"
                //Se accede al primer elemento de la lista de tareas para obtener la fecha de inicio de la primera tarea
                value={currentTask[0] && currentTask[0].fecha_inicio.split("T")[0]}
                onChange={(value) => {
                  //filtrar las tareas por el rango de fechas seleccionado
                  //las fechas se convierten a formato YYYY-MM-DD para poder compararlas
                  setTask(
                    originalTask.filter((task) => new Date(task.fecha_inicio).toISOString().split("T")[0] >= new Date(value).toISOString().split("T")[0])
                  );
                }}
              />
            </div>
            <div className="w-1/2 pl-4">
            <span className="px-2 uppercase text-sm font-bold text-secondary">Filtro: Fecha de finalización</span>
              <Input
                id="fechaFin"
                type="date"
                //Se accede al ultimo elemento de la lista de tareas para obtener la fecha de fin de la última tarea
                value={currentTask[currentTask.length - 1] && currentTask[currentTask.length - 1].fecha_fin.split("T")[0]}
                onChange={(value) => {
                  //las fechas se convierten a formato YYYY-MM-DD para poder compararlas
                  setTask(
                    currentTask.filter((task) => new Date(task.fecha_fin).toISOString().split("T")[0] <= new Date(value).toISOString().split("T")[0])
                  );
                }}
              />
            </div>
          </div>
      </div>
    );
  };
  