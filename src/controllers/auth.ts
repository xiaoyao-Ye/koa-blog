import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index';

export default class AuthController {
  /**
   * login
   */
  public static login(ctx: Context) {
    console.log('111');

    ctx.status = 200;
    ctx.body = '/auth/login'
  }
}
