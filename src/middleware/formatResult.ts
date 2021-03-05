import { Context } from "koa";

const msgList: any = {
  200: '成功!',
  401: '您没有权限哦~请先确认是否已登录!',
  404: '资源不存在,请检查 请求路径/请求方式 是否正确呀!',
  450: 'format err',
  500: '服务器内部错误了￣□￣｜｜'
}

export function resErr(code: number = 500, err?: string,) {
  return { code, data: null, msg: err || msgList[code] }
}

export function resData(data: any) {
  return { code: 200, data, msg: '成功!' }
}

/**
 * 响应数据处理封装
 * @param ctx koa对象
 * @param data code正常时返回的数据
 * @param err 错误消息
 * @param cb 回调函数
 */
export function result(ctx: Context, data: any, err?: string, cb?: Function) {
  if (!data) {
    ctx.body = resErr(450, err)
  } else {
    ctx.body = resData(data)
    cb && cb(data)
  }
}

// response中间件
export const formatResult = async (ctx: Context, next: any) => {
  try {

    await next();

    if (ctx.status == 404) {
      ctx.body = resErr(404)
      ctx.status = 404
    }
  } catch (err) {

    // 只返回 JSON 格式的响应
    ctx.status = err.status || 500;
    ctx.body = resErr(ctx.status, err.message);
  }
}
