import { Context } from 'koa';
import { getManager } from 'typeorm';
import { Article } from '../db/article'
import { result } from '../middleware/formatResult';

export default class ArticleController {
  public static async articleAdd(ctx: Context) {
    const repository = getManager().getRepository(Article)
    const { title, content } = ctx.request.body
    const article = new Article()
    article.title = title
    article.content = content
    await repository.save(article)
    result(ctx, {})
  }

  public static async articleList(ctx: Context) {
    const repository = getManager().getRepository(Article)
    const { pageSize = 10, pageNum = 1 } = ctx.request.body
    const listCount = await repository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize
    })
    // 查询列表,得到总数
    // 得到当前一共可以分几页: 总数/页数大小
    // 判断当前请求页是否在范围之内(1~总可分页数),范围之外要对应报错或处理成范围之内
    //
    const data = {
      list: listCount[0],
      total: listCount[1]
    }

    result(ctx, data, '暂无文章数据')

  }

  public static async articleDetails(ctx: Context) {
    // 根据id取详情,每成功调用一次,readCount++;
    // 查文章评论表,过滤当前文章id的,得到浏览量
    // 查文章点赞表,过滤当前文章id的,得到点赞量
    const {id} = ctx.request.body;
    !id && result(ctx, null, '404: 没有这条记录!');

  }

  public static async articleUpdate(ctx: Context) {
    const repository = getManager().getRepository(Article)
    const { id, title, content } = ctx.request.body
    if (!id) return result(ctx, null, '文章id不能为空')
    // 正常情况下这里还要判断文章的各个字段是否为空!
    const isExist = await repository.createQueryBuilder().where({ id }).getOne();
    if (!isExist) return result(ctx, null, '没有找到此id有对应的数据')
    const edit = await repository.createQueryBuilder().update(Article).where({ id }).set({ title, content }).execute();

    result(ctx, edit, '修改失败了,稍后试试!')
  }

  public static async articleDelete(ctx: Context) {
    const repository = getManager().getRepository(Article)
    const { id } = ctx.request.body
    const isExist = await repository.createQueryBuilder().where({ id }).getOne();
    if (!isExist) return result(ctx, null, '没有找到此id有对应的数据')

    const del = await repository.createQueryBuilder().where({ id }).delete().from(Article).execute()
    result(ctx, del && {})
  }
}
