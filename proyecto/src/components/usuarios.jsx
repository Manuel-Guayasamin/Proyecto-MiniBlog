import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

function Usuario() {
  const urlApi = 'http://localhost:3000/usuarios';
  const [datosUsuarios, setDatosUsuarios] = useState();
  const [usuarioa, setUsuarioa] = useState({id_usuario:'',  nombre_usuario: '', nombre_completo: '', correo_electronico: '',  rol_usuario:'' });
  const [usuarioe, setUsuarioe] = useState(null);
  const [BanderaEditar, setBanderaEditar] = useState(false);
  const [BanderaEliminar, setBanderaEliminar] = useState(false);

  const consultaApi = async () => {
    try {
      const response = await fetch(urlApi);
      const dataResponse = await response.json();
      setDatosUsuarios(dataResponse);
    } catch (error) {
      console.error('Error al obtener datos del API:', error);
    }
  };

  const actualizarUsuario =async () => {
    try {
      const response = await fetch(urlApi, {
        method: 'PUT', headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioa),
      });
      const data = await response.json();
      console.log('Tarea actualizada:', data);
      consultaApi();
      setUsuarioa({id_usuario:'',  nombre_usuario: '', nombre_completo: '', correo_electronico: '',  rol_usuario:''});
      setBanderaEditar(false);
    } catch (error) {
      console.error('Error al actualizar la Tarea:', error);
    }
  };

  const eliminarUsuario = async () => {
    try {
      const response = await fetch(`${urlApi}/${usuarioe.id_usuario}`, {
          method: 'DELETE',
        });
      const data = await response.json();
      if (data.success) {
        consultaApi();
      } else {
        console.error('Error al eliminar el proyecto:', data.message);
      }
      setBanderaEliminar(false);
    } catch (error) {
      console.error('Error en la eliminación del proyecto:', error);
    }
  };

  const seleccionarUsuario = (elemento, tipo) => {
    if (tipo === 'Editar') {
      setUsuarioa(elemento);
      setBanderaEditar(true);
    } if (tipo === 'Eliminar') {
      setUsuarioe(null);
      setBanderaEliminar(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioa((prevUsuarioa) => ({
      ...prevUsuarioa,[name]: value,
    }));
  };

  useEffect(() => {
    consultaApi();
  }, []);

  return (
    <div className='formulario'>
      <div className="titulor">
        <h2>Usuarios</h2>
      </div>

      {datosUsuarios && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de usuario</th>
              <th>Nombre completo</th>
              <th>Correo electronico</th>
              <th>Rol usuario</th>
              <th>Fecha de registro</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {datosUsuarios.data.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.id_usuario}</td>
                <td>{usuario.nombre_usuario}</td>
                <td>{usuario.nombre_completo}</td>
                <td>{usuario.correo_electronico}</td>
                <td>{usuario.rol_usuario}</td>
                <td>{usuario.fecha_registro}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => seleccionarUsuario(usuario, 'Editar')}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => {setUsuarioe(usuario); setBanderaEliminar(true);}}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
      )}

      <Modal isOpen={BanderaEditar}>
        <ModalHeader>
          <div>
            <h4>Editar Usuario</h4>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="from-group">
            <label>ID del usuario</label>
            <input
              type="text"
              className="form-control"
              name="id_usuario"
              value={usuarioa.id_usuario}
            onChange={handleChange}/>
            <br/>

            <label>Nomnbre de usuario</label>
            <input
              type="text"
              className="form-control"
              name="nombre_usuario"
              value={usuarioa.nombre_usuario}
            onChange={handleChange}/>
            <br/>

            <label>Nombre completo</label>
            <input
            type="text"
              className="form-control"
              name="nombre_completo"
              value={usuarioa.nombre_completo}
            onChange={handleChange}/>
            <br/>

            <label>Correo electronico</label>
            <input
              type="text"
              className="form-control"
              name="correo_electronico"
              value={usuarioa.correo_electronico}
            onChange={handleChange}/>
            <br/>

            <label>Rol del usuario</label>
            <select
              className="form-control"
              name="rol_usuario"
              value={usuarioa.rol_usuario}
              onChange={handleChange}>
              <option value="Publico">Publico</option>
              <option value="Privado">Privado</option>
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={actualizarUsuario}>
            Actualizar
          </button>
          <button className="btn btn-danger" onClick={()=>setBanderaEditar(false)}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={BanderaEliminar}>
        <ModalHeader>
          <div>
            <h4>Confirmar Eliminación</h4>
          </div>
        </ModalHeader>
        <ModalBody>
          <p>¿Estás seguro de que deseas eliminar este proyecto?</p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={eliminarUsuario}>
            Sí, Eliminar
          </button>
          <button className="btn btn-secondary" onClick={()=>setBanderaEliminar(false)}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default Usuario;