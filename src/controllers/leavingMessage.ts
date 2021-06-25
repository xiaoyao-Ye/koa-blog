import { Ctx } from '../config/index'
import { leavingMessage } from '../db/leavingMessage';
import { getManager } from 'typeorm';
import { result } from '../middleware/formatResult';

export default class LeavingMessageController {
  /**
   * 添加留言
   * @param userId 用户id
   * @param userName 用户名称
   * @param content 评论内容
   */
  public static async msgAdd(ctx: Ctx) {
    const repository = getManager().getRepository(leavingMessage);
    const { userId, content, userName } = ctx.request.body;
    const msg = new leavingMessage();
    msg.userId = userId;
    msg.content = content;
    msg.userName = userName;
    msg.createdTime = new Date().toString();
    repository.save(msg);

    result(ctx, { context: ctx, request: ctx.request.body, })
  }

  public static async msgList(ctx: Ctx) {
    const repository = getManager().getRepository(leavingMessage);
    const { pageSize = 10, pageNum = 1 } = ctx.request.body;
    const listCount = await repository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize
    })

    result(ctx, { list: listCount[0], total: listCount[1] })
  }
}
