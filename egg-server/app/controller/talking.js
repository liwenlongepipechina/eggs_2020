// eslint-disable-next-line strict
const Controller = require('egg').Controller;
/**
 * @Controller 吐槽管理
 */
class TalkingController extends Controller {
  // eslint-disable-next-line no-useless-constructor
  constructor(ctx) {
    super(ctx);
  }

  /**
   * @summary 创建吐槽
   * @description 创建用户，记录用户账户/密码/类型
   * @router post /api/talking
   * @request body createTalkingRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(ctx.rule.createTalkingRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.talking.create(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }


  /**
   * @summary 删除单个吐槽
   * @description 删除单个吐槽
   * @router delete /api/talking/{id}
   * @request path string *id eg:1 用户ID
   * @response 200 baseResponse 创建成功
   */
  async destroy() {
    const { ctx, service } = this;
    // 校验参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    await service.talking.destroy(id);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx });
  }

  /**
   * @summary 修改吐槽
   * @description 获取更新后吐槽信息
   * @router put /api/talking/{id}
   * @request path string *id eg:1 用户ID
   * @request body createTalkingRequest *body
   * @response 200 baseResponse 创建成功
   */
  async update() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(ctx.rule.createTalkingRequest);
    // 组装参数
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    await service.talking.update(id, payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx });
  }

  /**
   * @summary 获取单个吐槽信息
   * @description 获取吐槽信息
   * @router get /api/talking/{id}
   * @request url baseRequest
   * @response 200 baseResponse 创建成功
   */
  async show() {
    const { ctx, service } = this;
    // 组装参数
    const { id } = ctx.params;
    // 调用 Service 进行业务处理
    const res = await service.talking.show(id);

    // // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }


  /**
   * @summary 获取所有吐槽(分页/模糊)
   * @description 获取吐槽信息
   * @router get /talking
   * @request query integer *currentPage eg:1 当前页
   * @request query integer *pageSize eg:1 单页数量
   * @response 200 baseResponse 创建成功
   */
  async index() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.query;
    // 调用 Service 进行业务处理
    const res = await service.talking.index(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }
}


module.exports = TalkingController;
