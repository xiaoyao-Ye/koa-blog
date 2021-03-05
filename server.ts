import Koa from 'koa'
import cors from '@koa/cors'
import { logger } from './src/middleware/loggers'
import json from 'koa-json'
import koaBody from 'koa-body'
import jwt from 'koa-jwt';
import { JWT_SECRET } from './src/config/index';
import { formatResult } from './src/middleware/formatResult';

import { createConnection } from 'typeorm';

import { unprotectedRouter, protectedRouter } from './src/routers'


createConnection().then(() => {
  const app = new Koa()

  app.use(koaBody())
  app.use(cors())
  app.use(json())
  app.use(logger())

  app.use(formatResult);

  // 无需 JWT Token 即可访问
  app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

  // 注册 JWT 中间件
  app.use(jwt({ secret: JWT_SECRET }).unless({ method: 'GET' }));

  // 需要 JWT Token 才可访问
  app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());


  // 监听error
  app.on('error', (err, ctx) => {
    // 在这里可以对错误信息进行一些处理，生成日志等。
    console.error('server error', err, ctx);
  })

  app.listen(1024, () => console.log('server is runing... http://localhost:1024'))
}).catch((err) => console.log('TypeORM connection error: ', err))

