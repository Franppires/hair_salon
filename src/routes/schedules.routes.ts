import { Router } from 'express';
import { SchedulesController } from '../controllers/SchedulesController';
import { AuthMiddleware } from '../middleware/AuthMiddleware';

class SchedulesRoutes {
  private router: Router;
  private schedulesController: SchedulesController; //modo privado para poder usar 
  private authMiddleware: AuthMiddleware

  constructor() {
    this.router = Router();
    this.schedulesController = new SchedulesController(); 
    this.authMiddleware = new AuthMiddleware()
  }

  getRoutes(): Router {
    this.router.post(
      '/',
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.schedulesController.store.bind(this.schedulesController) //bind garante a permanência dos dados
    );
    this.router.get(
      '/', 
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.schedulesController.index.bind(this.schedulesController)
    )
    this.router

    return this.router;
  }
}

export { SchedulesRoutes };
