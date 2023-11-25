import React, { useState } from 'react';
import Blog from './Blogs';
import Usuario from './usuarios';
import '../styles/Inicio.css';

function Inicio() {
  const [paginaActual, setPaginaActual] = useState();

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  const volverAlInicio = () => {
    setPaginaActual(null);
  };

  return (
    <div className='formulario'>
      <div className="titulor">
        <h2>MiniBlog</h2>
      </div>
      
      <div >
        <nav>
          <ul className="botones">
            <button onClick={volverAlInicio}>Inicio</button>
            <button onClick={() => cambiarPagina('blogs')}>Blogs</button>
            <button onClick={() => cambiarPagina('usuarios')}>Usuarios</button>
            <button><a className="nav-link  h5  text-center"  style={{ textDecoration: 'none', color: 'inherit' }}  href=" ">Cerrar Sesión</a></button>
          </ul>
        </nav>
        {paginaActual === 'blogs' && <Blog />}
        {paginaActual === 'usuarios' && <Usuario />}
      </div>
    </div>
  );
}

export default Inicio;