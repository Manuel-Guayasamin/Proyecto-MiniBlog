import { db_pool_connection } from "../db/db_connection.js";
import { response_error, response_not_found, response_success, response_created } from "../responses/responses.js";

export const seleccionarblog= async (req, res)=>{
  try{
    const [rows] = await db_pool_connection.query('select * from tb_blogs');
    console.log(rows);
    if(rows.length<=0){
      return res.status(404).json(response_not_found("Blog no encontrada"));
    }
    res.status(200).json(response_success("Datos oK", rows));
  }catch(error){
    res.status(500).json(response_error("Error al recuperar datos del blog: " + error['sqlMessage']));
  }
};

export const seleccionarbloga= async (req, res)=>{
  try {
    const usuario = req.params.usuario;
    const [rows] = await db_pool_connection.query('SELECT * FROM tb_blogs WHERE autor = ?', [usuario]);
    if (rows.length <= 0) {
      return res.status(404).json(response_not_found("Blog no encontrado"));
    }
    res.status(200).json(response_success("Datos OK", rows));
  } catch (error) {
    res.status(500).json(response_error("Error al recuperar datos del blog: " + error['sqlMessage']));
  }
};

const SOLO_PUBLICOS = 'Publico';
export const seleccionarblogp = async (req, res) => {
  try {
    const [rows] = await db_pool_connection.query('SELECT * FROM tb_blogs WHERE es_publico = ?', [SOLO_PUBLICOS]);
    console.log(rows);
    if (rows.length <= 0) {
      return res.status(404).json(response_not_found("Blog no encontrada"));
    }
    res.status(200).json(response_success("Datos oK", rows));
  } catch (error) {
    res.status(500).json(response_error("Error al recuperar datos del blog: " + error['sqlMessage']));
  }
};

export const crearblog= async (req, res)=>{
  try{
    const{titulo, contenido, autor, fecha_publicacion, es_publico}=req.body;
    const [rows] =await db_pool_connection.query('INSERT INTO tb_blogs (titulo, contenido, autor, fecha_publicacion, es_publico) values (?, ?, ?, ?, ?)',
    [titulo, contenido, autor, fecha_publicacion, es_publico]);
    console.log(rows);
    res.status(201).json(response_created("Datos oK", rows, rows.insertId));
  }catch(error){
    res.status(500).json({message: "Error al crear el blog " + error['sqlMessage']});
  }
};

export const actualizarblog=async(req, res)=>{
  try {
    const{id_blog, titulo, contenido, autor, es_publico}=req.body;
    const [rows] =await db_pool_connection.query('update tb_blogs set titulo=?, contenido=?, autor=?, es_publico=?  WHERE id_blog=?',
    [titulo, contenido, autor, es_publico, id_blog]);
    console.log(rows);
    res.status(200).json(response_success("Datos oK", rows))
  }catch(error){
    res.status(500).json(response_error("Error al actulizar datos del blog : " + error['sqlMessage']));
  }
};

export const actualizarcontenido=async(req, res)=>{
  try {
    const{id_blog, contenido}=req.body;
    const [rows] =await db_pool_connection.query('update tb_blogs set contenido=? WHERE id_blog=?',
    [contenido, id_blog]);
    console.log(rows);
    res.status(200).json(response_success("Datos oK", rows))
  }catch(error){
    res.status(500).json(response_error("Error al actulizar datos del blog : " + error['sqlMessage']));
  }
};

export const eliminarblog=async(req, res)=>{
  try {
    const id_blog = req.params.id;
    const [rows] =await db_pool_connection.query('delete from tb_blogs WHERE id_blog=?', [id_blog]);
    if(rows.affectedRows>0){
      res.status(200).json(response_success("Datos oK", rows))
    }else{
      return res.status(404).json(response_not_found("blog no encontrada"));
    }
  }catch(error){
    res.status(500).json(response_error("Error al eliminar datos del blog : " + error['sqlMessage']));
  }
};