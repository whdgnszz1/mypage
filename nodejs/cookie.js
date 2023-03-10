var http = require('http')
var cookie = require('cookie');


http.createServer(function (request, response) {
  var cookies = {};
  if (request.headers.cookie !== undefined) {
     cookies = cookie.parse(request.headers.cookie);
  };
  console.log(cookies)
  response.writeHead(200, {
    'Set-Cookie': [
      'yummy_cookie=choco', 
      'tasty_cookie=strawberry',
      `Permanent=cookies; Max-age=${60*60*24*30}`,
      'Secure=Secure; Secure',
      'HttpOnly=HttpOnly; HttpOnly', //자바스크립트를 통해서 접근할 수 없는 옵션
      'Path=Path; Path=/cookie',
      'Domain=Domain; Domain=o2.org'
    ]
  });
  response.end('Cookie!')
}).listen(3000);