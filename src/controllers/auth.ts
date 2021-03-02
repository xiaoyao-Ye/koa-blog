import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index';

export default class AuthController {
  /**
   * @api { post } /auth/login
   * @param loginname: 登录账号
   * @param password: 登录密码
   */
  public static login(ctx: Context) {
    ctx.status = 200;
    ctx.body = '/auth/login'
  }

  public static register(ctx: Context) {
    ctx.status = 200;
    ctx.body = '/auth/register'
  }
}
