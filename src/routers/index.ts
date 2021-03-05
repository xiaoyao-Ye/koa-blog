import Router from '@koa/router';

import AuthController from '../controllers/auth';
import ArticleController from '../controllers/article';

const unprotectedRouter = new Router();

unprotectedRouter.post('/auth/login', AuthController.login);
unprotectedRouter.post('/auth/register', AuthController.register);

const protectedRouter = new Router();
protectedRouter.post('/article/add', ArticleController.articleAdd);
protectedRouter.post('/article/list', ArticleController.articleList);
protectedRouter.post('/article/update', ArticleController.articleUpdate);
protectedRouter.post('/article/delete', ArticleController.articleDelete);

export { unprotectedRouter, protectedRouter };
