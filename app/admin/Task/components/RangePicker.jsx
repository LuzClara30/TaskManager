import { Input } from "@/components/Input";
//Componente que permite filtrar las tareas por un rango de fechas
export const RangePicker = ({currentTask, setTask, originalTask }) => {
    return (
      <div className="relative">
          <div className="flex justify-between">
            <div className="w-1/2">
              <Input
                id="fechaInicio"
                type="date"
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
              <Input
                id="fechaFin"
                type="date"
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
  