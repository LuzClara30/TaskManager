import axios from "axios";
//importar dotenv utilizada para cargar variables de entorno desde un archivo .env
require('dotenv').config();
// Crear una instancia de axios con la URL base de la API
// y exportarla para usarla en otros archivos

//axios.create crea una instancia de axios con una configuración personalizada
export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AXIOS_CLIENT,
});