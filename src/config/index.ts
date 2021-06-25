const apiPrefix = '/api'
const port = process.env.PORT || 1024
const JWT_SECRET = '//yeyaoyao.icu'

export { apiPrefix, port, JWT_SECRET }


// 继承Context重新创建interface, 新增自定义属性
import { Context, Request } from "koa";
interface request extends Request {
  body?: any;
  // [xxx: string]: any
}

export interface Ctx extends Context {
  request: request
}
