// eslint-disable-next-line strict
module.exports = {
  createTalkingRequest: {
    content: { type: 'string', required: true, description: '吐槽内容', example: '今台天气很不好' },
    isAnonymous: { type: 'string', required: true, description: '是否匿名', example: '1' },
    article_id: { type: 'string', required: true, description: '用户id', example: '1' },
    article_name: { type: 'string', required: true, description: '姓名', example: '李文龙' },
  },
};
