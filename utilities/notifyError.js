import toast  from 'react-hot-toast';//libreria para mostrar notificaciones tipo "toast"

export const notifyError = (msg) => toast.error(msg);//funcion para mostrar notificaciones de error
// msg es el mensaje que se mostrara en la notificacion