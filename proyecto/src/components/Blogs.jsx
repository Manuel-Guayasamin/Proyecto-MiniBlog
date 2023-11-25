import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import '../styles/Blogs.css';

function Blog() {
  const urlApi = 'http://localhost:3000/blogs';
  const [datosBlogs, setDatosBlogs] = useState();
  const [blogr, setBlogr] = useState({titulo: '', contenido: '', autor: '',  es_publico: ''});
  const [bloga, setBloga] = useState({id_blog:'', titulo: '', contenido: '', autor: '',  es_publico:'' });
  const [bloge, setBloge] = useState(null);
  const [BanderaInsertar, setBanderaInsertar] = useState(false);
  const [BanderaEditar, setBanderaEditar] = useState(false);
  const [BanderaEliminar, setBanderaEliminar] = useState(false);

  const consultaApi = async () => {
    try {
      const response = await fetch(urlApi);
      const dataResponse = await response.json();
      setDatosBlogs(dataResponse);
    } catch (error) {
      console.error('Error al obtener datos del API:', error);
    }
  };

  const crearblog = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(urlApi, {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
        },body: JSON.stringify(blogr),
      });
      const data = await response.json();
      console.log('Blog creado:', data);
      consultaApi();
      setBlogr({titulo: '', contenido: '', autor: '',  es_publico: ''});
      setBanderaInsertar(false);
    } catch (error) {
      console.error('Error al crear el blog:', error);
    }
  };

  const actualizarBlog =async () => {
    try {
      const response = await fetch(urlApi, {
        method: 'PUT', headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bloga),
      });
      const data = await response.json();
      console.log('Tarea actualizada:', data);
      consultaApi();
      setBloga({id_blog:'', titulo: '', contenido: '', autor: '',  es_publico:''});
      setBanderaEditar(false);
    } catch (error) {
      console.error('Error al actualizar la Tarea:', error);
    }
  };

  const eliminarBlog = async () => {
    try {
      const response = await fetch(`${urlApi}/${bloge.id_blog}`, {
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

  const seleccionarBlog = (elemento, tipo) => {
    if (tipo === 'Insertar') {
      setBanderaInsertar(true);
    } if (tipo === 'Editar') {
      setBloga(elemento);
      setBanderaEditar(true);
    } if (tipo === 'Eliminar') {
      setBloge(null);
      setBanderaEliminar(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogr((prevBlogr) => ({
      ...prevBlogr,[name]: value,
    }));
  };

  const handleChange2 = (e) => {
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
        <h2>Blogs</h2>
      </div>
      <Button
        color='success' large='lg'
        onClick={()=>seleccionarBlog(null, 'Insertar')}>
        Insertar
      </Button>

      {datosBlogs && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Contenido</th>
              <th>Autor</th>  
              <th>Es publico</th>
              <th>Fecha de publicacion</th>
              <th>Última Modificación</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {datosBlogs.data.map((blog, index) => (
              <tr key={index}>
                <td>{blog.id_blog}</td>
                <td>{blog.titulo}</td>
                <td>{blog.contenido}</td>
                <td>{blog.autor}</td>
                <td>{blog.es_publico}</td>
                <td>{blog.fecha_publicacion}</td>
                <td>{blog.Ultima_modificacion}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => seleccionarBlog(blog, 'Editar')}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => {setBloge(blog); setBanderaEliminar(true);}}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
      )}
      <Modal isOpen={BanderaInsertar}>
        <ModalHeader>
          <div>
            <h4>Crear Blog</h4>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="from-group">
            <label>Titulo del Blog</label>
            <input
              type="text"
              className="form-control"
              name="titulo"
              value={blogr.titulo}
            onChange={handleChange}/>
            <br/>

            <label>Contenido del Blog</label>
            <input
            type="text"
              className="form-control"
              name="contenido"
              value={blogr.contenido}
            onChange={handleChange}/>
            <br/>

            <label>Autor</label>
            <input
              type="text"
              className="form-control"
              name="autor"
              value={blogr.autor}
            onChange={handleChange}/>
            <br/>

            <label>Tipo</label>
            <select
              className="form-control"
              name="es_publico"
              value={blogr.es_publico}
              onChange={handleChange}>
              <option value="Publico">Publico</option>
              <option value="Privado">Privado</option>
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={crearblog}>
            Guardar Tarea
          </button>
          <button className="btn btn-danger" onClick={()=>setBanderaInsertar(false)}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={BanderaEditar}>
        <ModalHeader>
            <div>
            <h4>Editar Tarea</h4>
            </div>
        </ModalHeader>
        <ModalBody>
        <div className="from-group">
            <label>ID del Blog</label>
            <input
              type="text"
              className="form-control"
              name="id_blog"
              value={bloga.id_blog}
            onChange={handleChange2}/>
            <br/>

            <label>Titulo del Blog</label>
            <input
              type="text"
              className="form-control"
              name="titulo"
              value={bloga.titulo}
            onChange={handleChange2}/>
            <br/>

            <label>Contenido del Blog</label>
            <input
            type="text"
              className="form-control"
              name="contenido"
              value={bloga.contenido}
            onChange={handleChange2}/>
            <br/>

            <label>Autor</label>
            <input
              type="text"
              className="form-control"
              name="autor"
              value={bloga.autor}
            onChange={handleChange2}/>
            <br/>

            <label>Tipo</label>
            <select
              className="form-control"
              name="es_publico"
              value={bloga.es_publico}
              onChange={handleChange2}>
              <option value="Publico">Publico</option>
              <option value="Privado">Privado</option>
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={actualizarBlog}>
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
          <button className="btn btn-danger" onClick={eliminarBlog}>
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
export default Blog;