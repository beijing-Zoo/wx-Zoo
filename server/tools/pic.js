const http = require('http');
const urlLib = require('url');
var str = ""
var server = http.createServer(function (req, res) {
  var GET = urlLib.parse(req.url, true);
  if (GET.query.user == "huang" && GET.query.pass == 123)
    console.log("success");
  else
    console.log("fail");
});

//监听-端口
server.listen(8080); 