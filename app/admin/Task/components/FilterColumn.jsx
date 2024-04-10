const FilterColumn = (props) => {
    return(
        //crear un select para filtrar las tareas con los datos de tareas
        <form className="max-w-sm mx-auto">
            <select
            className="uppercase text-xs text-center bg-secondary border border-gray-300 text-white text-sm rounded-lg block w-full  "
            onChange={(e) => {
                //filtrar las tareas por el tipo de filtro seleccionado
                if (e.target.value === "all") {
                    props.setTask(props.originalTask);
                } else if (props.filterType === "colaborador_id" || props.filterType === "id") {
                    //filtrar las tareas por el colaborador,el seleccionado se convierte a entero
                    props.setTask(
                        props.originalTask.filter((task) => task[props.filterType] === parseInt(e.target.value))
                    );
                }else{
                    //filtrar las tareas por el tipo de filtro seleccionado
                    props.setTask(
                        props.originalTask.filter((task) => task[props.filterType] === e.target.value)
                    );
                
                }
            }}
        >
            <option  selected>{props.filterType== "colaborador_id"? "colaborador": props.filterType}</option>
            <option value="all">Todos</option>
            {/* Mapeo de la lista de tareas */}
            {props.task.map((item) => (
                <option key={item.id} value={item[props.filterType]}>
                    {/* se filtra la lista de colaborades por el id del colaborador para luego recorrerlo por nombre */}
                    {props.filterType =="colaborador_id"?
                    props.collaborators
                        .filter((colaborador) => colaborador.id === item[props.filterType])
                        .map((colaborador) => colaborador.nombre)
                    :item[props.filterType]}
                </option>
            ))}
        </select>
        </form>
        
    );
}
export default FilterColumn;