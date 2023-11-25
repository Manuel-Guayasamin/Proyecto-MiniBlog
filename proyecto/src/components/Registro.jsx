import {useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Registro() {
  const urlApi = 'http://localhost:3000/usuarios';
  const [usuario, setUsuario] = useState({nombre_usuario: '', contrasena: '', nombre_completo: '', correo_electronico: '',  rol_usuario: ''});
  const roles = ['Editor', 'Lector'];

  const crearusuario = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(urlApi, {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
        },body: JSON.stringify(usuario),
      });
      const data = await response.json();
      console.log('Usuario creado:', data);
      setUsuario({nombre_usuario: '', contrasena: '', nombre_completo: '', correo_electronico: '',  rol_usuario: ''});
      window.location.href = '';
    } catch (error) {
      console.error('Error al crear al usuario:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,[name]: value,
    }));
  };

  return (
    <div className='formulario'>
      <div className="titulor">
        <h2>Registrarse</h2>
      </div>
      
      <div className="from-group">
        <label>Nombre del usuario</label>
        <input
          type="text"
          className="form-control"
          name="nombre_usuario"
          value={usuario.nombre_usuario}
        onChange={handleChange}/>
        <br/>

        <label>contrasena del usuario</label>
        <input
          type="text"
          className="form-control"
          name="contrasena"
          value={usuario.contrasena}
        onChange={handleChange}/>
        <br/>

        <label>Nombre completo</label>
        <input
          type="text"
          className="form-control"
          name="nombre_completo"
          value={usuario.nombre_completo}
        onChange={handleChange}/>
        <br/>

        <label>Correo electronico</label>
        <input
          type="text"
          className="form-control"
          name="correo_electronico"
          value={usuario.correo_electronico}
        onChange={handleChange}/>
        <br/>

        <label>Rol del usuario</label>
          <select className="form-control" name="rol_usuario" onChange={handleChange}>
            <option value="">Seleccione su rol</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        <br/>
      </div>
      <button className="btn btn-primary" onClick={crearusuario}>
        Guardar Usuario
      </button>
      <button><a className="btn btn-success"  style={{ textDecoration: 'none', color: 'inherit' }}  href=" ">Cerrar Sesión</a></button>
    </div>
  );
}
export default Registro;