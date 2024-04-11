import toast  from 'react-hot-toast';//libreria para mostrar notificaciones tipo "toast"

export const notifySuccess = (msg) => toast.success(msg);//funcion para mostrar notificaciones de exito
// msg es el mensaje que se mostrara en la notificacion
