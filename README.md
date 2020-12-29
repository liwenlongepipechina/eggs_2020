# eggs_2020
eggs框架搭建

主要实现功能：
基于插件的Swagger-doc接口定义
统一异常处理
基于扩展的helper响应统一处理
Validate接口格式检查
三层结构
jwt统一鉴权
文件上传

1.创建项目
#创建项目
npm i egg-init -g
egg-init egg-server --type=simple
cd egg-server
npm i
#启动项目
npm run dev  (http://localhost:7001)
#接口文档插件
npm install egg-swagger-doc-feat -s (http://127.0.0.1:7001/swagger-ui.html)
#Validate检查
npm i egg-validate -s 
#mongo数据库
npm i egg-mongoose -s 
#添加service层
npm install egg-bcrypt -s
#注册jwt模块
npm i egg-jwt -s
#文件上传
npm i awit-stream-ready stream-wormhole image-downloader -s

