import Koa from 'koa'
import cors from '@koa/cors'
import { logger } from './src/middleware/loggers'
import json from 'koa-json'
import koaBody from 'koa-body'
import jwt from 'koa-jwt';
import { JWT_SECRET } from './src/config/index';

import { createConnection } from 'typeorm';

import { unprotectedRouter, protectedRouter } from './src/routers'


createConnection().then(() => {
  const app = new Koa()

  app.use(cors())
  app.use(koaBody())
  app.use(json())
  app.use(logger())

  app.use(async (ctx, next) => {
    try {
      await next();
      if (ctx.status == 404) {
        ctx.status = 404
        ctx.body = {
          code: 404,
          data: ctx,
          msg: '资源不存在,请检查 请求路径/请求方式 是否正确!'
        }
      }
    } catch (err) {
      // 只返回 JSON 格式的响应
      ctx.status = err.status || 500;
      ctx.body = { message: err.message };
    }
  });

  // 无需 JWT Token 即可访问
  app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods)

  // 注册 JWT 中间件
  app.use(jwt({ secret: JWT_SECRET }).unless({ method: 'GET' }));

  // 需要 JWT Token 才可访问
  app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods)

  // 监听error
  app.on('error', (err, ctx) => {
    // 在这里可以对错误信息进行一些处理，生成日志等。
    console.error('server error', err, ctx);
  })

  app.listen(1024, () => console.log('server is runing... http://localhost:1024'))
}).catch((err) => console.log('TypeORM connection error: ', err))

