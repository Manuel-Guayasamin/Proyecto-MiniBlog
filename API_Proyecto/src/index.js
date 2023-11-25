import express from "express";
import { PORT, config_core } from "./config/config.js";
import routes_usuarios from "./routes/usuarios.routes.js";
import routes_blogs from "./routes/blogs.routes.js";
import cors from 'cors';

const app = express();

//definir politicas de mi core para el acceso al API
app.use(cors(config_core.application.cors.server));

// permita que los response sea tipo json
app.use(express.json());

// escuche las rutas establecidas
app.use(routes_usuarios);
app.use(routes_blogs);

//reponder a rutas no validas
app.use((req, res, next) =>{
  res.status(404).json({message:"Ruta Invalida"});
});

app.listen(PORT);

console.log("Mi primer API con Node .... Puerto: " + PORT)