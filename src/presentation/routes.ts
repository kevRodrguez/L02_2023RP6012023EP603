import { Router } from 'express';
import { LibroRoutes } from './libro/routes';
import { CategoriaRoutes } from './categoria/routes';
import { AutorRoutes } from './autor/routes';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    router.use('/api/libros', LibroRoutes.routes);
    router.use('/api/categorias', CategoriaRoutes.routes);
    router.use('/api/autores', AutorRoutes.routes);

    return router;
  }

}

