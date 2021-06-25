import { Ctx } from '../config/index';
import { articleLeavingMessage } from '../db/articleLeavingMessage';
import { getManager } from 'typeorm';
import { result } from '../middleware/formatResult';

export default class LeavingMessageController {
  public static async msgAdd(ctx: Ctx) {
    const repository = getManager().getRepository(articleLeavingMessage);
    const { userId, articleId, content, leavingMsgDate } = ctx.request.body;
    !articleId && result(ctx, null, '评论的文章id不能为空')
    const curArticle = await repository.createQueryBuilder().where({ articleId }).getOne();
    !curArticle && result(ctx, null, '没有找到id对应的文章!')
    const edit = repository.createQueryBuilder()
      .update().where({ articleId })
      .set({ userId, content, leavingMsgDate })

    result(ctx, edit)
  }

  public static async msgList(ctx: Ctx) {
    const repository = getManager().getRepository(articleLeavingMessage);
    const { pageSize = 10, pageNum = 1 } = ctx.request.body;
    const listCount = await repository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize
    })

    result(ctx, { list: listCount[0], total: listCount[1] })
  }
}
