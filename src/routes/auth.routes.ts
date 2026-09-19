import { Router } from 'express';
import { AuthController } from 'controllers';
import {
  validateLogin,
  validateRegister
} from 'middleware/auth.validation';

const authRouter: Router = Router();

authRouter.post('/login', validateLogin, AuthController.login.bind(AuthController));
authRouter.post('/register', validateRegister, AuthController.register.bind(AuthController));
authRouter.post('/logout', AuthController.logout.bind(AuthController));
authRouter.post('/refresh-token', AuthController.refreshToken.bind(AuthController));

export default authRouter;