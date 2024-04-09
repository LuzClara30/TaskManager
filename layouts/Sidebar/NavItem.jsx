import Image from "next/image";//componente Image de Next.js para la optimización de imágenes.
import Link from "next/link";//componente Link de Next.js para la navegación entre páginas.
//Explicación del código:
//Representa un elemento de navegación en la barra lateral.
//cada elemento puede contener un SVG, un enlace y un nombre.
//la visibilidad y la posición de los elementos cambia según el estado de 'open'.
//Si la barra lateral está abierta, los elementos se muestran y se desplazan a la izquierda.
//Si la barra lateral está cerrada, los elementos se ocultan y se desplazan a la derecha.
const NavItem = ({item: { svg, href, name }, open}) => {
  return (
    <Link
      href={href} // especifica la ruta a la que apunta el enlace.
      className={`mt-5 flex  font-medium p-2 hover:bg-secondary rounded-xl duration-200`}
    >
      <Image
        className={`flex w-7 h-7 min-h-max mr-2 invert duration-300 ${
          !open && "translate-x-1 sm:translate-x-1.5" // estilo condicional basado en el estado de 'open' TRUE O FALSE
        }`}
        src={svg} //src de la imagen
        width={28} //Ancho de la imagen
        height={28} //Alto de la imagen
        alt={`${name}-icon.svg`} //Texto alternativo de la imagen
      />
      <span
        className={`whitespace-pre duration-300 ${
          !open && "opacity-0 translate-x-16 overflow-hidden"// estilo condicional basado en el estado de 'open'
        }`}
      >
        {name}
      </span>
    </Link>
  );
};

export default NavItem;