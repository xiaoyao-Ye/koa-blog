import { Context } from 'koa';
import { leavingMessage } from '../db/leavingMessage';
import { getManager } from 'typeorm';
import { result } from '../middleware/formatResult';

export default class LeavingMessageController {
  public static async msgAdd(ctx: Context) {
    const repository = getManager().getRepository(leavingMessage);
    const { userId, content } = ctx.request.body;
    const msg = new leavingMessage();
    msg.userId = userId;
    msg.content = content;
    repository.save(msg);

    result(ctx, {})
  }

  public static async msgList(ctx: Context) {
    const repository = getManager().getRepository(leavingMessage);
    const { pageSize = 10, pageNum = 1 } = ctx.request.body;
    const listCount = await repository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize
    })

    result(ctx, { list: listCount[0], total: listCount[1] })
  }
}
