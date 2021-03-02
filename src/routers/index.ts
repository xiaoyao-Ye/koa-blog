import Router from '@koa/router';

import AuthController from '../controllers/auth';

const unprotectedRouter = new Router();

unprotectedRouter.post('/auth/login', AuthController.login);

const protectedRouter = new Router();

export { protectedRouter, unprotectedRouter };
