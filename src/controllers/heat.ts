import { Ctx } from '../config/index'
import { heat } from "../db/heat";
import { getRepository } from "typeorm";
import { result } from "../middleware/formatResult";


export default class HeatContronller {
  public static async add(ctx: Ctx) {
    const repository = getRepository(heat);
    const { articleId, userId } = ctx.request.body;
    // 判断articleId是否存在,存在则往下走
    const newHeat = new heat();
    newHeat.articleId = articleId;
    newHeat.userId = userId;
    repository.save(newHeat);
    result(ctx, {});
  }

  public static async cancel(ctx: Ctx) {
    const { articleId, userId } = (ctx.request).body;
    const res = await getRepository(heat)
      .createQueryBuilder()
      .where({ articleId, userId })
      .delete()
      .execute();
    console.log(res.affected! > 0);
    if (res.affected! > 0) {
      result(ctx, {});
    } else {
      result(ctx, {}, '没有点赞记录')
    }

  }
}
