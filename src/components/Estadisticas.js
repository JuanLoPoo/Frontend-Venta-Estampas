// src/components/Estadisticas.js
import React, { useState, useEffect } from 'react';
import './Estadisticas.css';

const Estadisticas = () => {
  // Datos de ejemplo
  const [ventasTotales, setVentasTotales] = useState(500);
  const [estampasMasVendidas, setEstampasMasVendidas] = useState([
    { nombre: 'Estampa A', cantidad: 120 },
    { nombre: 'Estampa B', cantidad: 95 },
    { nombre: 'Estampa C', cantidad: 80 },
  ]);
  const [gananciasPorCamiseta, setGananciasPorCamiseta] = useState({
    camiseta: 20,
    comision: 5,
  });
  const [clientes, setClientes] = useState(200);
  const [artistas, setArtistas] = useState(10);

  useEffect(() => {
    // Aquí podrías hacer la llamada al backend en el futuro para obtener datos reales.
    // Por ejemplo, utilizando fetch o axios.
  }, []);

  return (
    <div className="estadisticas-container">
      <h1>Estadísticas de la Tienda</h1>
      
      <div className="estadistica">
        <h3>Ventas Totales</h3>
        <p>{ventasTotales} camisetas vendidas</p>
      </div>

      <div className="estadistica">
        <h3>Estampas Más Vendidas</h3>
        <ul>
          {estampasMasVendidas.map((estampa, index) => (
            <li key={index}>{estampa.nombre}: {estampa.cantidad} ventas</li>
          ))}
        </ul>
      </div>

      <div className="estadistica">
        <h3>Ganancia por Camiseta</h3>
        <p>Ganancia por camiseta: ${gananciasPorCamiseta.camiseta}</p>
        <p>Comisión por venta: ${gananciasPorCamiseta.comision}</p>
      </div>

      <div className="estadistica">
        <h3>Número de Clientes</h3>
        <p>{clientes} clientes registrados</p>
      </div>

      <div className="estadistica">
        <h3>Número de Artistas</h3>
        <p>{artistas} artistas registrados</p>
      </div>
    </div>
  );
};

export default Estadisticas;
