import { Router } from 'express';
import { ComentariosRoutes,} from './comentarios/routes';
import {publicacionesRoutes } from './publicaciones/routes';
import { UsuarioRoutes } from './usuario/routes';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    router.use('/api/usuario', UsuarioRoutes.routes);
    router.use('/api/publicaciones', publicacionesRoutes.routes);
    router.use('/api/comentarios', ComentariosRoutes.routes);

    return router;
  }

}

