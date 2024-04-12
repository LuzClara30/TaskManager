"use client";
import React from 'react';
import FilterColumn from './components/FilterColumn';
import { useState, useEffect } from 'react';
import {TaskList} from './components/TaskList';
import {getAllTasks} from './services/task.services';
import { AddButton } from "@/components/AddButton";
import { AddEditTaskModal } from './components/AddEditTaskModal';
import {createTask, updateTask, deleteTask} from './services/task.services';
import { notifyError } from '@/utilities/notifyError';
import { notifySuccess } from '@/utilities/notifySucess';
import {RangePicker} from './components/RangePicker';
const page = () => {
  //Estados para almacenar los datos del formulario, debe coincidir con los campos de la tabla
  const [formData, setFormData] = useState({
    descripcion: "",
    colaborador_id: "",
    estado: "",
    prioridad: "",
    fecha_inicio: "",
    fecha_fin: "",
    notas: ""
  });
  
const [tasks, setTasks] = useState([]);//Estado para almacenar la lista de tareas
const [taskId, setTaskId] = useState("");//Estado para almacenar el id de la tarea seleccionada
const [isLoading, setIsLoading] = useState(true); //Estado para mostrar el spinner de carga
const [originalTasks, setOriginalTasks] = useState([]); //componente para realizar la busqueda
const [isOpen, setIsOpen] = useState(false); //Estado para mostrar el modal de agregar tarea
//Función para ordenar las tareas por fecha de inicio de manera ascendente
const ordenarPorFechaInicio= (lista)=> {
  //.sort es un método de los arreglos que permite ordenar los elementos de un arreglo
  //Recibe una función de comparación que indica como ordenar los elementos
  //La función de comparación recibe dos elementos del arreglo a comparar
  //Si la función de comparación devuelve un valor negativo, a se ordena antes que b
  //Si la función de comparación devuelve un valor positivo, b se ordena antes que a
  return lista.sort((a, b) => {//Ordenar las tareas por fecha de inicio
      const fechaA = new Date(a.fecha_inicio);//Convertir la fecha de inicio a objeto Date
      const fechaB = new Date(b.fecha_inicio);//Convertir la fecha de inicio a objeto Date
      return fechaA - fechaB;//Restar las fechas para obtener la diferencia
  });
}
//UseEffect para obtener la lista de tareas al montar el componente
useEffect(() => {
    const getTasks = async () => {
        const data = await getAllTasks();//Llamada a la función que obtiene la lista de tareas desde el api
        setOriginalTasks(ordenarPorFechaInicio(data));
        setTasks(ordenarPorFechaInicio(data));//Almacenar la lista de tareas en el estado
        setIsLoading(false);//Para indicar que ya se cargaron los tareas
    }
    getTasks();
}, []);
//Función para abrir y cerrar el modal de agregar tarea
const onClose = () => {
    setIsOpen(!isOpen);
    //Limpiar el formulario y la variable taskId para evitar errores al momento de abrir el modal para crear una nueva tarea
    setTaskId("");
    setFormData({
        descripcion: "",
        colaborador_id: "",
        estado: "",
        prioridad: "",
        fecha_inicio: "",
        fecha_fin: "",
        notas: ""
    });
};
//Función para editar una tarea
//Recibe la tarea a editar como parámetro
const editTask = async (task) => {
  //Extraer los datos de la tarea
  const {id, descripcion, colaborador_id, estado, prioridad, fecha_inicio, fecha_fin, notas} = task;
  //Actualizar el estado taskId con el id de la tarea seleccionada para que al abrir el modal sepa que se va a editar una tarea y cargue los datos de la tarea
  setTaskId(id);
  //Se debe convertir la fecha de inicio y fin a objeto Date para que el input type date pueda mostrar la fecha en el formato correcto
  const fecha_inicial = new Date(fecha_inicio);
  const fecha_final = new Date(fecha_fin);
    // Obtener la fecha en formato "YYYY-MM-DD"
    const fechaI = fecha_inicial.toISOString().split("T")[0];
    const fechaF = fecha_final.toISOString().split("T")[0];
    //Actualizar el estado formData con los datos de la tarea seleccionada
  setFormData({
    descripcion: descripcion,
    colaborador_id: colaborador_id,
    estado: estado,
    prioridad: prioridad,
    fecha_inicio: fechaI,
    fecha_fin: fechaF,
    notas: notas
  });
  //Abrir el modal
  setIsOpen(!isOpen);
};
//Función para eliminar una tarea
//Recibe la tarea a eliminar como parámetro
const eliminateTask = async (task) => {
  try {
    // Llama a la función deleteTask con el id proporcionado
    await deleteTask(task.id);
    // Actualiza la lista de tareas eliminando la tarea con el id proporcionado
    if(task.estado !== "EN PROCESO"){//Validar que no se pueda eliminar una tarea en proceso, está validación ocurre en un trigger desde la base de datos, 
    //pero es importante validar en el frontend para evitar errores en la vista de los datos por parte del usuario
      //Eliminar la tarea de la lista de tareas
      setTasks((prevTasks) =>
      prevTasks.filter((item) => item.id !== task.id)
    );
    //Eliminar la tarea de la lista de tareas original
    setOriginalTasks((prevTasks) =>
      prevTasks.filter((item) => item.id !== task.id)
      
    );
    //Mostrar un mensaje de éxito
    notifySuccess(`Tarea ${task.descripcion} eliminada exitosamente`);
    }
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la eliminación
    console.error(
      `Error al eliminar la tarea con id ${id}:`,
      error.message
    );
  }
};
//Funciones de l modal de crear y editar tarea
//Función para manejar el cambio de los inputs del formulario
 const handleInputChange = (id, value) => {
  //Actualizar el estado formData con los datos ingresados en el formulario
  setFormData({
    ...formData,
    [id]: value,
  });
};
//Función para manejar el envío del formulario
const handleSubmit = async (e) => {
  e.preventDefault();//Prevenir el comportamiento por defecto del formulario
  //Validar que los campos no estén vacíos
  if (
    [
     formData.descripcion,
      formData.prioridad,
      formData.fecha_inicio,
      formData.fecha_fin,
    ].includes("")
  ) {
    notifyError("Todos los campos son obligatorios expecto colaborador y estado(defecto: pendiente)");

    return;
  }
//Si taskId no está vacío, significa que se va a editar una tarea
  if (taskId !== "") {
    try {
      // Llama a la función updateTask con el id de la tarea y los datos del formulario
      const data = await updateTask(taskId, {
        descripcion: formData.descripcion,
        colaborador_id: formData.colaborador_id,
        estado: formData.estado,
        prioridad: formData.prioridad,
        fecha_inicio: formData.fecha_inicio,
        fecha_fin: formData.fecha_fin,
        notas: formData.notas,
      });
      // Actualiza la lista de tareas con la tarea editada
      if (data) {
        const TaskSaved = data;
        //Actualizar la tarea en la lista de tareas
        const updatedTask = tasks?.map(
          (taskState) =>
          //Si el id de la tarea en el estado es igual al id de la tarea editada, se actualiza la tarea
            taskState.id === TaskSaved.id
              ? TaskSaved//Actualizar la tarea
              : taskState//Mantener la tarea sin cambios
        );
        setTasks(ordenarPorFechaInicio(updatedTask));//Actualizar la lista de tareas
        setOriginalTasks(ordenarPorFechaInicio(updatedTask));//Actualizar la lista de tareas original
        notifySuccess(
          `Tarea ${formData.descripcion} editada exitosamente`
        );
        onClose();
        // Limpiar el formulario y la variable taskId para evitar errores al momento de abrir el modal para crear una nueva tarea
        setFormData({
          descripcion: "",
          colaborador_id: "",
          estado: "",
          prioridad: "",
          fecha_inicio: "",
          fecha_fin: "",
          notas: ""
      });
        setTaskId("");
      }
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la agregación
      console.log({ error });
    }
    return;
  }
  //Si taskId está vacío, significa que se va a crear una tarea
  try {
    // Llama a la función createTask con los datos del formulario
    const data = await createTask({
      descripcion: formData.descripcion,
      colaborador_id: formData.colaborador_id,
      estado: formData.estado,
      prioridad: formData.prioridad,
      fecha_inicio: formData.fecha_inicio,
      fecha_fin: formData.fecha_fin,
      notas: formData.notas,
    });
    //Agregar a la lista de tareas
    const updatedTask = [...tasks, data];
    setTasks(ordenarPorFechaInicio(updatedTask));//Actualizar la lista de tareas
    setOriginalTasks(ordenarPorFechaInicio(updatedTask));//Actualizar la lista de tareas original

    onClose();//Cerrar el modal
    // La tarea se ha creado con éxito
    notifySuccess(
      `Tarea ${formData.descripcion} creada exitosamente`
    );
    // Limpiar el formulario y la variable taskId para evitar errores al momento de abrir el modal para crear una nueva tarea
    setFormData({
      descripcion: "",
      colaborador_id: "",
      estado: "",
      prioridad: "",
      fecha_inicio: "",
      fecha_fin: "",
      notas: ""
  });
    setTaskId("");
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la agregación
    console.log({ error });
  }
};
  return(
    <section className="w-full">
    <h1 className="font-bold text-2xl mb-5 mt-5 text-secondary">Administración de Tareas</h1>
    <section className="justify-items-start">
    <AddButton addElement={() => onClose()} name="Agregar Tarea" />
    <AddEditTaskModal
        taskId={taskId}//Enviar el id de la tarea seleccionada al modal
        isOpen={isOpen}//Enviar el estado isOpen al modal
        onClose={onClose}//Enviar la función onClose al modal la cual cambia el estado isOpen y setea el taskId y formData en vacío
        handleInputChange={handleInputChange}//esta función se encarga de manejar los cambios en los inputs del formulario
        handleSubmit={handleSubmit}//esta función se encarga de manejar el envío del formulario
        formData={formData}//Enviar los datos del formulario al modal
      />
      <RangePicker
        currentTask={tasks}
        setTask={setTasks}
        originalTask={originalTasks}
      />
    </section>
    <section className="shadow-lg p-5">
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
       {/* Renderizar la lista de tareas o un mensaje si no hay tareas */}
      {tasks?.length ? (
        <TaskList
        currentTask={tasks}
        editTask={editTask}
        eliminateTask={eliminateTask}
        setTask={setTasks}//Enviar la función setTask al componente
        originalTask={originalTasks}//Enviar la lista de tareas original al componente
        />
   
      ) : (
        !isLoading && (
          <p className="text-center">
            A&uacute;n no hay tareas agregadas
          </p>
        )
      )}
    </section>
  </section>
  );
}

export default page;