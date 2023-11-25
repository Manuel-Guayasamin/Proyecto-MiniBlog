import { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import '../styles/Blogcliente.css';

function Blogl() {
  const urlApi = 'http://localhost:3000/blogsp';
  const urlApia = 'http://localhost:3000/blogsc';
  const [datosBlogs, setDatosBlogs] = useState();
  const [bloga, setBloga] = useState({id_blog:'', contenido: '' });
  const [BanderaEditar, setBanderaEditar] = useState(false);

  const consultaApi = async () => {
    const response = await fetch(urlApi);
    const dataResponse = await response.json();
    setDatosBlogs(dataResponse);
  };

  const actualizarContenido=async () => {
    try {
      const response = await fetch(urlApia, {
        method: 'PUT', headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bloga),
      });
      const data = await response.json();
      console.log('Tarea actualizada:', data);
      consultaApi();
      setBloga({id_blog:'', contenido: ''});
      setBanderaEditar(false);
    } catch (error) {
      console.error('Error al actualizar la Tarea:', error);
    }
  };

  const seleccionarBlog = (elemento, tipo) => {
    if (tipo === 'Editar') {
      setBloga(elemento);
      setBanderaEditar(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBloga((prevBloga) => ({
      ...prevBloga,[name]: value,
    }));
  };

  useEffect(() => {
    consultaApi();
  }, []);

  return (
    <div className='formulario'>
      <div className="titulor">
        <h2>MiniBlog - Lector</h2>
      </div>

      <div >
        <nav>
          <ul className="botones">
            <button><a className="nav-link  h5  text-center"  style={{ textDecoration: 'none', color: 'inherit' }}  href=" ">Cerrar Sesión</a></button>
          </ul>
        </nav>
      </div>
      
      {datosBlogs && (
        <div>
          {datosBlogs.data.map((blog, index) => (
            <div key={index} className="blog-item">
              <h3>{blog.titulo}</h3>
              <p>{blog.contenido}</p>
              <p>Autor: {blog.autor}</p>
              <p>Fecha de publicacion: {blog.fecha_publicacion}, Última Modificación: {blog.Ultima_modificacion}</p>
              <div>
                <button className="btn btn-primary" onClick={() => seleccionarBlog(blog, 'Editar')}>
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={BanderaEditar}>
        <ModalHeader>
          <div>
            <h4>Editar Contenido</h4>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="from-group">
            <label>Contenido del Blog</label>
            <textarea
              type="text"
              className="form-control"
              name="contenido"
              value={bloga.contenido}
            onChange={handleChange}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={actualizarContenido}>
            Actualizar
          </button>
          <button className="btn btn-danger" onClick={()=>setBanderaEditar(false)}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Blogl;