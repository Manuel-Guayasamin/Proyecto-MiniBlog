import { React, useState } from "react";
import Registro from "./Registro.jsx";
import Inicio from './Inicio.jsx';
import Blogl from "./Blogs_Lector.jsx";
import BlogC from "./Blogs_Editor.jsx";
import '../styles/Login.css';

export function Login() {
  
  const url_api = 'http://localhost:3000/login';
  const roles = ['Administrador', 'Editor', 'Lector'];
  const [registroAbierto, setRegistroAbierto] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState({nombre_usuario: '', contrasena: '', rol_usuario: ''});
  const [miLogin, setMiLogin] = useState(false);
  const [miLogine, setMiLogine] = useState(false);
  const [miLoginl, setMiLoginl] = useState(false);
  const [usu, setUsu] = useState("");
  const [mensaje, setMensaje] = useState('');

  const handleInputChange = (e) => {
    setDatosUsuario({ ...datosUsuario, [e.target.name]: e.target.value});
  };

  const handleLogin = async () => {
    const response = await fetch(url_api, {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosUsuario)
    });
    const data_response = await response.json();

    if (response.ok) {
      setMensaje(data_response.message);      
      if(datosUsuario.rol_usuario === 'Administrador'){
        setMiLogin(true);
        setUsu(datosUsuario.nombre_usuario);
      }else if (datosUsuario.rol_usuario === 'Editor') {
        setMiLogine(true);
        setUsu(datosUsuario.nombre_usuario);
      }
      else if (datosUsuario.rol_usuario === 'Lector') {
        setMiLoginl(true);
        setUsu(datosUsuario.nombre_usuario);
      }
    } else {
      setMensaje('Error en el inicio de sesión');
    }
  };
  
  const handleRegistro = () => {
    setRegistroAbierto(true);
  };

  return (
    <div className="container">
      {miLogin ? (<Inicio usu={usu} />) : miLogine ? (<BlogC usu={usu} />) : miLoginl ? (<Blogl usu={usu} />) : registroAbierto ? (<Registro />) : (
        <div className="App">
          <h1>Login</h1>
          <label>Usuario:</label>
          <input type="text" name="nombre_usuario" onChange={handleInputChange} />
          <br />

          <label>Contraseña:</label>
          <input type="password" name="contrasena" onChange={handleInputChange} />
          <br />

          <label>Rol:</label>
          <select name="rol_usuario" onChange={handleInputChange}>
            <option value="">Seleccione su estado</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <br />

          <button onClick={handleLogin}>Iniciar sesión</button>
          <button onClick={handleRegistro}>Registro</button>
          <p>{mensaje}</p>
        </div>
      )}
    </div>
  );
}

export default Login;