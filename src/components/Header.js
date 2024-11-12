// src/components/Header.js
import React from 'react';
import './Header.css'; // Importar el CSS para el encabezado
import LogoImg from '../Imagenes/Logo.png'; // Asegúrate de que la ruta sea correcta
import AvatarAdminImg from '../Imagenes/Avatar_Admin_img.png';
import AvatarUsuarioImg from '../Imagenes/Avatar_Usuario_img.png';
import AvatarArtistaImg from '../Imagenes/Avatar_Artista_img.png';
import { useAuth } from './Autenticacion'; // Suponiendo que tienes un hook para autenticación
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

function Header() {
  const { isAuthenticated, userRole, logout } = useAuth(); // Obtén la autenticación
  const navigate = useNavigate(); // Navegación de React Router

  // Manejo de cierre de sesión
  const handleLogout = () => {
    logout();
    navigate('/'); // Redirigir al inicio después de hacer logout
  };

  // Seleccionar la imagen del avatar en función del rol del usuario
  const getAvatarImage = () => {
    if (userRole === 'admin') return AvatarAdminImg;
    if (userRole === 'cliente') return AvatarUsuarioImg;
    if (userRole === 'artista') return AvatarArtistaImg;
    return null;
  };

  return (
    <header className="Header">
      <div className="Header-logo">
        <img src={LogoImg} alt="Logo" className="logo-img" />
      </div>

      <nav className="Header-nav">
        <ul>
          <li><a href="/">Inicio</a></li>
          {/* Mostrar el enlace de "Catálogo" solo si el usuario no es un admin */}
          {userRole !== 'admin' && <li><a href="/Catalogo">Catálogo</a></li>}
          {!isAuthenticated && (
            <>
              <li><a href="/Iniciar-sesion">Iniciar Sesión</a></li>
              <li><a href="/Registrarse">Registrarse</a></li>
            </>
          )}
          <li><a href="/Contacto">Contáctanos</a></li>
          {isAuthenticated && (
            <li className="avatar-container">
              <img
                src={getAvatarImage()} // Seleccionar la imagen de avatar según el rol
                alt="Avatar"
                className="user-avatar"
              />
              <div className="dropdown-menu">
                <ul>
                  <li><a href={`/PerfilUsuario${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`}>Perfil</a></li>
                  {userRole === 'cliente' && (
                    <>
                      <li><a href="/Compras">Compras</a></li>
                      <li><a href="/Carrito">Su carrito</a></li>
                    </>
                  )}
                  {userRole === 'artista' && (
                    <>
                      <li><a href="/SubirEstampa">Subir Estampas</a></li>
                      <li><a href="/EstampasPublicadas">Estampas Publicadas</a></li>
                    </>
                  )}
                  {userRole === 'admin' && (
                    <>
                      <li><a href="/Estadisticas">Estadísticas</a></li>
                    </>
                  )}
                  <li><button onClick={handleLogout}>Log Out</button></li>
                </ul>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
