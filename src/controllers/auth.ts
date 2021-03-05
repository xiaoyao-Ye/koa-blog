import { Context } from 'koa';
import { getManager } from 'typeorm';
import { User } from '../db/user'
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index';
import { result } from '../middleware/formatResult'

export default class AuthController {
  /**
   * @api { post } /auth/login
   * @param account: 登录账号
   * @param password: 登录密码
   */
  public static async login(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const { account, password } = ctx.request.body;

    const user = await userRepository
      .createQueryBuilder()
      .where({ account })
      .addSelect('User.password')
      .getOne()

    if (!user) {
      result(ctx, null, '账号不存在')
    } else if (await argon2.verify(user.password, password)) {
      ctx.status = 200;
      const data = { token: jwt.sign({ id: user.id }, JWT_SECRET) }
      result(ctx, data)
    } else {
      result(ctx, null, '密码错误')
    }
  }

  public static async register(ctx: Context) {
    const userRepository = getManager().getRepository(User)
    const { account, password, email } = ctx.request.body;
    const user = await userRepository
      .createQueryBuilder()
      .where({ account })
      .getOne()

    if (user) return result(ctx, null, '用户名已存在!')

    const newUser = new User();
    newUser.account = account;
    newUser.password = await argon2.hash(password);
    newUser.email = email;
    const userinfo = await userRepository.save(newUser);

    result(ctx, userinfo, 'SQL OR TYPEORM, UPDATE ERR')
  }
}
