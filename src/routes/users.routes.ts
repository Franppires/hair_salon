import { Router } from 'express';
import { UsersControllers } from '../controllers/usersControllers';

class UsersRoutes {
    private router: Router
    private usersControllers: UsersControllers
    
    constructor() { 
        this.router = Router()
        this.usersControllers = new UsersControllers()
    } 

    getRoutes() { //buscar rotas 
        this.router.post('/', 
        this.usersControllers.store.bind(this.usersControllers), 
        )
        return this.router
    }
}

export { UsersRoutes }