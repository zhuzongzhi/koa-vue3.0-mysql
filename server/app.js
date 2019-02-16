const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');

const config = require('./config');
const controller = require('./controller');

const app = new Koa();

// session存储配置
const sessionMysqlConfig= {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
};

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}));

// 配置控制台日志中间件
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname , './../static')
));

// add controllers:
app.use(controller());

// 监听启动端口
app.listen( config.port );
console.log(`the server is start at port ${config.port}`);
