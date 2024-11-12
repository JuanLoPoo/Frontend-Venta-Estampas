// src\components\Carrrito.js
import React from 'react';
import './Carrito.css'; // Asegúrate de importar el CSS

function Carrito({ productos = [] }) {
  return (
    <div>
      <h2>Tu Carrito</h2>
      {productos.length > 0 ? (
        <ul>
          {productos.map((producto, index) => (
            <li key={index}>{producto.nombre}</li>
          ))}
        </ul>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
}

export default Carrito;
