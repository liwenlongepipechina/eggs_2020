// eslint-disable-next-line strict
const Service = require('egg').Service;

class UserAccessService extends Service {
  async login(payload) {
    const { ctx, service } = this;
    const user = await this.app.mysql.get('user', { user_tel: payload.mobile });
    console.log('88888mobile' + payload.moblie);
    if (!user) {
      ctx.throw(404, 'user not found');
    }
    const verifyPsw = await ctx.compare(payload.password, user.user_password);
    if (!verifyPsw) {
      ctx.throw(404, 'user password is error');
    }
    // 生成Token令牌
    return { token: await service.actionToken.apply(user._id) };
  }
  async logout() {
  }

  async current() {
    const { ctx, service } = this;
    // ctx.state.user 可以提取到JWT编码的data
    const _id = ctx.state.user.data._id;
    const user = await service.user.find(_id);
    if (!user) {
      ctx.throw(404, 'user is not found');
    }
    user.password = 'How old are you?';
    return user;
  }
}

module.exports = UserAccessService;
