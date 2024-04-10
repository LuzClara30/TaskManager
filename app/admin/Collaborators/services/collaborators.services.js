import { axiosClient } from "@/config/axiosClient";
import { notifyError } from "@/utilities/notifyError";
//Obtener todos los colaboradores
export const getAllCollaborators = async () => {
    try {
        const { data } = await axiosClient.get("users");
        return (data);
    } catch (error) {
        notifyError(error.response?.data.error);
    }
    }
