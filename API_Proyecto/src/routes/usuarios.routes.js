import { Router } from "express";
import { seleccionarusuario, loginUsuario, crearusuario, actualizarusuario, eliminarusuario } from "../controllers/usuarios.controller.js";

const routes_usuarios=new Router();

routes_usuarios.get('/usuarios', seleccionarusuario);

routes_usuarios.post('/login', loginUsuario);
routes_usuarios.post('/usuarios', crearusuario);

routes_usuarios.put('/usuarios', actualizarusuario);

routes_usuarios.delete('/usuarios/:id', eliminarusuario);

export default routes_usuarios;