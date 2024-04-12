import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Se importa el componente Toaster de react-hot-toast para mostrar notificaciones
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reto Técnico",
  description: "Sitio web para administración de tareas",
};
// Componente principal del layout raíz
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  // Se Renderiza el componente Toaster en el layout
  // para que las notificaciones se muestren en toda la aplicación
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Toaster
        position="top-right"
        reverseOrder={false}
        />
        {children}</body>
    </html>
  );
}
