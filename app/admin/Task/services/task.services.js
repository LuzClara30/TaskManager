import { axiosClient } from "@/config/axiosClient";
import { notifyError } from "@/utilities/notifyError";
//Obtener todas las tareas
export const getAllTasks = async () => {
    try {
        const response = await axiosClient.get("/task");
        return response.data;
    } catch (error) {
        notifyError(error.response?.data.error)
    }
    }
//Obtener una tarea
export const getTask = async (id) => {
    try {
        const response = await axiosClient.get(`/task/${id}`);
        return response.data;
    } catch (error) {
        notifyError(error.response?.data.error);
    }
    }
//Crear una tarea
export const createTask = async (task) => {
    try {
        const response = await axiosClient.post("/task", task);
        return response.data;
    } catch (error) {
        notifyError(error.response?.data.error)
    }
    }
//Actualizar una tarea
export const updateTask = async (id, task) => {
    try {
        console.log(task);
        const response = await axiosClient.put(`/task/${id}`, task);
        return response.data;
    } catch (error) {
        notifyError(error.response?.data.error)
    }
    }
//Eliminar una tarea
export const deleteTask = async (id) => {
    try {
        const response = await axiosClient.delete(`/task/${id}`);
        return response.data;
        
    } catch (error) {
        notifyError(error.response?.data.error)
    }
    }