const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')
//const serve = require('koa-static');
//const path = require('path');  

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

//请求静态数据
const staticRes = serve(path.join(__dirname + '/public'));
app.use(staticRes);
// 引入路由分发
const router = require('./routes')
app.use(router.routes())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
