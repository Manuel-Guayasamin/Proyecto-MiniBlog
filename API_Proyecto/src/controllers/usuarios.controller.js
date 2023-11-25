import { db_pool_connection } from "../db/db_connection.js";
import { response_error, response_not_found, response_success } from "../responses/responses.js";

export const seleccionarusuario= async (req, res)=>{
  try{
    const [rows] = await db_pool_connection.query('select * from tb_usuarios');
    console.log(rows);
    if(rows.length<=0){
      return res.status(404).json(response_not_found("Tarea no encontrada"));
    }
    res.status(200).json(response_success("Datos oK", rows));
  }catch(error){
    res.status(500).json(response_error("Error al recuperar datos de la tarea: " + error['sqlMessage']));
  }
};

export const loginUsuario = async (req, res) => {
  const { nombre_usuario, contrasena, rol_usuario } = req.body;
  try {
    const [rows] = await db_pool_connection.query('SELECT * FROM tb_usuarios WHERE nombre_usuario = ? AND contrasena = ? AND rol_usuario = ?', [nombre_usuario, contrasena, rol_usuario]);
    if (rows.length <= 0) {
      return res.status(401).json(response_error("Credenciales incorrectas"));
    }
    res.status(200).json(response_success("Inicio de sesión exitoso", { ...rows[0], rol_usuario: rows[0].rol_usuario }));
  } catch (error) {
      es.status(500).json(response_error("Error en el inicio de sesión: " + error['sqlMessage']));
  }
};
  

export const crearusuario= async (req, res)=>{
  try{
    const{nombre_usuario, contrasena, nombre_completo, correo_electronico, rol_usuario}=req.body;
    const [rows] =await db_pool_connection.query('INSERT INTO tb_usuarios (nombre_usuario, contrasena, nombre_completo, correo_electronico, rol_usuario) values (?, ?, ?, ?, ?)',
    [nombre_usuario, contrasena, nombre_completo, correo_electronico, rol_usuario]);
    console.log(rows);
    res.status(201).json(response_created("Datos oK", rows, rows.insertId));
  }catch(error){
    res.status(500).json(response_error("Error al crear el usuario: " + error['sqlMessage']));
  }
};

export const actualizarusuario=async(req, res)=>{
  try {
    const{id_usuario, nombre_usuario, nombre_completo, correo_electronico, rol_usuario}=req.body;
    const [rows] =await db_pool_connection.query('update tb_usuarios set nombre_usuario=?, nombre_completo=?, correo_electronico=?, rol_usuario=?  WHERE id_usuario=?',
    [nombre_usuario, nombre_completo, correo_electronico, rol_usuario, id_usuario]);
    console.log(rows);
    res.status(200).json(response_success("Datos oK", rows))
  }catch(error){
    res.status(500).json(response_error("Error al actulizar datos de la tarea : " + error['sqlMessage']));
  }
};

export const eliminarusuario=async(req, res)=>{
  try {
    const id_usuario = req.params.id;
    const [rows] =await db_pool_connection.query('delete from tb_usuarios WHERE id_usuario=?', [id_usuario]);
    if(rows.affectedRows>0){
      res.status(200).json(response_success("Datos oK", rows))
    }else{
      return res.status(404).json(response_not_found("Tarea no encontrada"));
    }
  }catch(error){
    res.status(500).json(response_error("Error al eliminar datos de la tarea : " + error['sqlMessage']));
  }
};