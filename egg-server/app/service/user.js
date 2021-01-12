// eslint-disable-next-line strict
const Service = require('egg').Service;

class UserService extends Service {

  /**
   * 创建用户
   * @param {*} payload
   */
  async create(payload) {
    const { ctx } = this;
    payload.password = await ctx.genHash(payload.password);
    const result = await this.app.mysql.insert('user', { user_tel: payload.mobile, user_password: payload.password, user_name: payload.realName });
    return result;
  }

  /**
   * 删除用户
   * @param {*} _id
   */
  async destroy(_id) {
    const { ctx } = this;
    const user = await ctx.service.user.find(_id);
    if (!user) {
      ctx.throw(404, 'user not found');
    }
    const result = await this.app.mysql.delete('user', {
      user_id: _id,
    });
    return result;
  }

  /**
   * 修改用户
   * @param {*} _id
   * @param {*} payload
   */
  async update(_id, payload) {
    const { ctx } = this;
    const user = await ctx.service.user.find(_id);
    if (!user) {
      ctx.throw(404, 'user not found');
    }
    payload.password = await ctx.genHash(payload.password);
    const row = {
      user_name: payload.realName,
      user_password: payload.password,
      user_tel: payload.mobile,
    };
    const options = {
      where: {
        user_id: _id,
      },
    };
    await this.app.mysql.update('user', row, options); // 更新 posts 表中的记录
  }

  /**
   * 查看单个用户
   */
  async show(_id) {
    // const user = await this.ctx.service.user.find(_id);
    // if (!user) {
    //   this.ctx.throw(404, 'user not found');
    // }
    // return this.ctx.model.User.findById(_id).populate('role');
    const user = await this.app.mysql.get('user', { user_id: _id });
    return { user };
  }

  /**
   * 查看用户列表
   * @param {*} payload
   */
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload;
    let res = [];
    let count = 0;
    const skip = ((Number(currentPage)) - 1) * Number(pageSize || 10);
    if (isPaging) {
      if (search) {
        res = await this.ctx.model.User.find({ mobile: { $regex: search } }).populate('role').skip(skip)
          .limit(Number(pageSize))
          .sort({ createdAt: -1 })
          .exec();
        count = res.length;
      } else {
        res = await this.ctx.model.User.find({}).populate('role').skip(skip)
          .limit(Number(pageSize))
          .sort({ createdAt: -1 })
          .exec();
        count = await this.ctx.model.User.count({}).exec();
      }
    } else {
      if (search) {
        res = await this.ctx.model.User.find({ mobile: { $regex: search } }).populate('role').sort({ createdAt: -1 })
          .exec();
        count = res.length;
      } else {
        res = await this.ctx.model.User.find({}).populate('role').sort({ createdAt: -1 })
          .exec();
        count = await this.ctx.model.User.count({}).exec();
      }
    }
    // 整理数据源 -> Ant Design Pro
    const data = res.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc);
      jsonObject.key = i;
      jsonObject.password = 'Are you ok?';
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt);
      return jsonObject;
    });

    return { count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) };
  }

  /**
   * 删除多个用户
   * @param {*} payload
   */
  async removes(payload) {
    return this.ctx.model.User.remove({ _id: { $in: payload } });
  }

  /**
   * 根据手机号查找
   * @param {*} mobile
   */
  async findByMobile(mobile) {
    return this.app.mysql.get('user', { user_tel: mobile });
  }

  /**
   * 查找用户
   * @param {*} id
   */
  async find(id) {
    return this.app.mysql.get('user', { user_id: id });
  }

  /**
   * 更新用户信息
   * @param {*} id
   * @param {*} values
   */
  async findByIdAndUpdate(id, values) {
    return this.ctx.model.User.findByIdAndUpdate(id, values);
  }

}


module.exports = UserService;
