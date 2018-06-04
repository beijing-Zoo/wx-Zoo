const Koa = require('koa')
const app = new Koa()
// const debug = require('debug')('koa-weapp-demo')
// const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
//const config = require('./config')
const route = require('koa-route');
const serve = require("koa-static");
const path = require('path');  
const db = require('./connectDB');

//请求静态资源
const staticRes = serve(path.join(__dirname + '/public'));
app.use(staticRes);


const main = ctx => {
  ctx.response.body = 'Hello World';
};

const recommend = async function(ctx,next) {
	console.log(db.findAll(1));
	ctx.response.body = await db.findAll(1);//数据库操作
};


// 使用响应处理中间件
//app.use(response)

// 解析请求体
app.use(bodyParser())



// 引入路由分发
//const router = require('./routes')
//app.use(router.routes())

// 启动程序，监听端口
// app.listen(config.port, () => debug(`listening on port ${config.port}`))
app.use(route.get('/main', main));
app.use(route.get('/recommend',recommend));
app.listen(8080, function () {

  console.log("监听8080端口")

});
