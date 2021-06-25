import Router from '@koa/router';

import AuthController from '../controllers/auth';
import ArticleController from '../controllers/article';
import LeavingMessageController from '../controllers/leavingMessage';
import HeatContronller from '../controllers/heat';

const unprotectedRouter = new Router();

unprotectedRouter.post('/auth/login', AuthController.login);
unprotectedRouter.post('/auth/register', AuthController.register);

unprotectedRouter.post('/msg/add', LeavingMessageController.msgAdd);
unprotectedRouter.post('/msg/list', LeavingMessageController.msgList);

unprotectedRouter.post('/heat/add', HeatContronller.add);
unprotectedRouter.post('/heat/cancel', HeatContronller.cancel);

const protectedRouter = new Router();
protectedRouter.post('/article/add', ArticleController.articleAdd);
protectedRouter.post('/article/list', ArticleController.articleList);
protectedRouter.post('/article/update', ArticleController.articleUpdate);
protectedRouter.post('/article/delete', ArticleController.articleDelete);

export { unprotectedRouter, protectedRouter };
