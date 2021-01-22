// eslint-disable-next-line strict
const Service = require('egg').Service;

class TalkingService extends Service {

  /**
   * 创建吐槽
   * @param {*} payload
   */
  async create(payload) {
    const result = await this.app.mysql.insert('talking', {
      content: payload.content,
      createDate: this.app.mysql.literals.now,
      isAnonymous: payload.isAnonymous,
      article_id: payload.article_id,
      article_name: payload.article_name,
      like_count: 0,
    });
    return result;
  }

  /**
   * 删除吐槽
   * @param {*} _id
   */
  async destroy(_id) {
    const { ctx } = this;
    const talking = await ctx.service.talking.find(_id);
    if (!talking) {
      ctx.throw(404, 'talking not found');
    }
    const result = await this.app.mysql.delete('talking', {
      tk_id: _id,
    });
    return result;
  }

  /**
   * 修改吐槽
   * @param {*} _id
   * @param {*} payload
   */
  async update(_id, payload) {
    const { ctx } = this;
    const talking = await ctx.service.talking.find(_id);
    if (!talking) {
      ctx.throw(404, 'talking not found');
    }
    const row = {
      content: payload.content,
      createDate: this.app.mysql.literals.now,
      isAnonymous: payload.isAnonymous,
      article_id: payload.article_id,
      article_name: payload.article_name,
    };
    const options = {
      where: {
        tk_id: _id,
      },
    };
    const result = await this.app.mysql.update('talking', row, options); // 更新 talking 表中的记录
    return result;
  }

  /**
   * 查看单个吐槽
   */
  async show(_id) {
    const { ctx } = this;

    const talking = await this.app.mysql.get('talking', { tk_id: _id });
    if (talking) {
      talking.createDate = ctx.helper.formatTime(talking.createDate);
    }

    return { talking };
  }

  /**
   * 查看吐槽列表
   * @param {*} payload
   */
  async index(payload) {
    const { ctx } = this;

    const { currentPage, pageSize, search } = payload;
    let count = 0;
    const skip = ((Number(currentPage)) - 1) * Number(pageSize || 10);
    // if (isPaging) {
    //   if (search) {
    //     res = await this.ctx.model.User.find({ mobile: { $regex: search } }).populate('role').skip(skip)
    //       .limit(Number(pageSize))
    //       .sort({ createdAt: -1 })
    //       .exec();
    //     count = res.length;
    //   } else {
    //     res = await this.ctx.model.User.find({}).populate('role').skip(skip)
    //       .limit(Number(pageSize))
    //       .sort({ createdAt: -1 })
    //       .exec();
    //     count = await this.ctx.model.User.count({}).exec();
    //   }
    // } else {
    //   if (search) {
    //     res = await this.ctx.model.User.find({ mobile: { $regex: search } }).populate('role').sort({ createdAt: -1 })
    //       .exec();
    //     count = res.length;
    //   } else {
    //     res = await this.ctx.model.User.find({}).populate('role').sort({ createdAt: -1 })
    //       .exec();
    //     count = await this.ctx.model.User.count({}).exec();
    //   }
    // }
    // // 整理数据源 -> Ant Design Pro
    // const data = res.map((e, i) => {
    //   const jsonObject = Object.assign({}, e._doc);
    //   jsonObject.key = i;
    //   jsonObject.password = 'Are you ok?';
    //   jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt);
    //   return jsonObject;
    // });


    const option = {
      limit: Number(payload.pageSize), // 返回数据量
      offset: skip, // 数据偏移量
    };
    const results = await this.app.mysql.select('talking', option);

    results.map((value, index) => {
      results[index].createDate = ctx.helper.formatTime(results[index].createDate);
    });

    const table = await this.app.mysql.select('talking');
    count = table.length;

    return { count, list: results, pageSize: Number(pageSize), currentPage: Number(currentPage) };
  }

  /**
   * 根据创建时间查找
   * @param {*} mobile
   */
  async findByMobile(createDate) {
    return this.app.mysql.get('talking', { createDate });
  }

  /**
   * 查找吐槽
   * @param {*} id
   */
  async find(id) {
    return this.app.mysql.get('talking', { tk_id: id });
  }

}


module.exports = TalkingService;
