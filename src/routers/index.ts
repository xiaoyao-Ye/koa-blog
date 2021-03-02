import Router from '@koa/router';

import AuthController from '../controllers/auth';

const unprotectedRouter = new Router();

unprotectedRouter.post('/auth/login', AuthController.login);
unprotectedRouter.post('/auth/register', AuthController.register);

const protectedRouter = new Router();

export { protectedRouter, unprotectedRouter };
