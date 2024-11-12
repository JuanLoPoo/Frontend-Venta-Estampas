// Catalogo.js
import React, { useState } from 'react';
import EstampaDetalle from './EstampaDetalle'; 
import { useAuth } from './Autenticacion'; // Importa el hook de autenticación
import { useNavigate } from 'react-router-dom'; // Para la navegación
import DragonImg from '../Imagenes/Dragon.jpg';
import TigreImg from '../Imagenes/Tigre.jpg';
import LoboImg from '../Imagenes/Lobo.jpg';
import './Catalogo.css';

const Catalogo = () => {
  const [estampas] = useState([
    { id: 1, nombre: 'Estampa Dragón', precio: 50000, imagen: DragonImg, descripcion: 'Descripción de la estampa dragón.', disponibilidad: 500 },
    { id: 2, nombre: 'Estampa Tigre', precio: 60000, imagen: TigreImg, descripcion: 'Descripción de la estampa tigre.', disponibilidad: 300 },
    { id: 3, nombre: 'Estampa Lobo', precio: 48000, imagen: LoboImg, descripcion: 'Descripción de la estampa lobo.', disponibilidad: 800 },
  ]);

  const [estampaSeleccionada, setEstampaSeleccionada] = useState(null);
  const { isAuthenticated, userRole } = useAuth(); // Obtener estado de autenticación y rol
  const navigate = useNavigate();

  const handleSeleccionarEstampa = (estampa) => {
    if (!isAuthenticated) {
      // Mensaje para usuarios no autenticados
      if (window.confirm("Debes iniciar sesión como cliente para comprar. ¿Deseas ir a la página de inicio de sesión?")) {
        navigate('/Iniciar-sesion');
      }
    } else if (userRole === 'artista' || userRole === 'admin') {
      // Mensaje para roles no permitidos
      alert("No puedes realizar compras con este usuario. Solo los clientes pueden comprar.");
    } else {
      // Si está autenticado como cliente, permite la selección de la estampa
      setEstampaSeleccionada(estampa);
    }
  };

  const handleCerrarDetalle = () => {
    setEstampaSeleccionada(null);
  };

  return (
    <div>
      {estampaSeleccionada ? (
        <EstampaDetalle estampa={estampaSeleccionada} onClose={handleCerrarDetalle} />
      ) : (
        <div>
          <h1>Catalógo de Estampas</h1>
          <div className="catalogo">
            {estampas.map((estampa) => (
              <div className="catalogo-item" key={estampa.id} onClick={() => handleSeleccionarEstampa(estampa)}>
                <img src={estampa.imagen} alt={estampa.nombre} className="catalogo-imagen" />
                <h2 className="catalogo-titulo">{estampa.nombre}</h2>
                <p className="catalogo-precio">Precio: ${estampa.precio.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogo;

