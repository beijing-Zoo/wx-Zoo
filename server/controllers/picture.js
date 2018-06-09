module.exports = function (ctx, next) {
  const staticRes = serve(path.join(__dirname + '/public'));
  ctx.state.data = staticRes;
}