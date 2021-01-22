// eslint-disable-next-line strict
const Controller = require('egg').Controller;
/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  // eslint-disable-next-line no-useless-constructor
  constructor(ctx) {
    super(ctx);
  }

  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账户/密码/类型
   * @router post /user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(ctx.rule.createUserRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.user.create(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }


  /**
   * @summary 删除单个用户
   * @description 删除单个用户
   * @router delete /api/user/{id}
   * @request path string *id eg:1 用户ID
   * @response 200 baseResponse 创建成功
   */
  async destroy() {
    const { ctx, service } = this;
    // 校验参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    await service.user.destroy(id);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx });
  }

  /**
   * @summary 修改用户
   * @description 获取用户信息
   * @router put /api/user/{id}
   * @request path string *id eg:1 用户ID
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async update() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(ctx.rule.createUserRequest);
    // 组装参数
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    await service.user.update(id, payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx });
  }

  /**
   * @summary 获取单个用户
   * @description 获取用户信息
   * @router get /api/user/{id}
   * @request url baseRequest
   * @response 200 baseResponse 创建成功
   */
  async show() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.user.show(id);
    // // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }


  /**
   * @summary 获取所有用户(分页/模糊)
   * @description 获取用户信息
   * @router get /api/user
   * @request query integer *currentPage eg:1 当前页
   * @request query integer *pageSize eg:1 单页数量
   * @response 200 baseResponse 创建成功
   */
  async index() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    const res = await service.user.index(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
    // const skip = ((Number(payload.currentPage)) - 1) * Number(payload.pageSize);
    //
    // const option = {
    //   limit: Number(payload.pageSize), // 返回数据量
    //   offset: skip, // 数据偏移量
    // };
    // const results = await this.app.mysql.select('user');
    // ctx.body = results;
  }
}


module.exports = UserController;
