import { Router } from 'express';
import { UsersController } from '../controllers/usersControllers';
import { upload } from '../config/multer';

class UsersRoutes {
    private router: Router
    private usersController: UsersController
    
    constructor() { 
        this.router = Router()
        this.usersController = new UsersController()
    } 

    getRoutes() { //buscar rotas 
        this.router.post(
            '/', 
            this.usersController.store.bind(this.usersController), 
        )
        this.router.put(
            '/', 
            upload.single('avatar_url'),
            this.usersController.update.bind(this.usersController),
        )
        return this.router
    }
}

export { UsersRoutes }