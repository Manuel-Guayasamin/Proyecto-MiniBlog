import { Router } from "express";
import { seleccionarblog, seleccionarblogp, crearblog, actualizarblog, eliminarblog, actualizarcontenido, seleccionarbloga } from "../controllers/blogs.controller.js";

const routes_blogs=new Router();

routes_blogs.get('/blogs', seleccionarblog);
routes_blogs.get('/blogsp', seleccionarblogp);
routes_blogs.get('/blogsa/:usuario', seleccionarbloga);

routes_blogs.post('/blogs', crearblog);

routes_blogs.put('/blogs', actualizarblog);
routes_blogs.put('/blogsc', actualizarcontenido);

routes_blogs.delete('/blogs/:id', eliminarblog);

export default routes_blogs;