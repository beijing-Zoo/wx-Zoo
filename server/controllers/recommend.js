const recommend = async function (ctx, next) {
  console.log(db.findAll(1));
  ctx.response.body = await db.findAll(1);//数据库操作
};