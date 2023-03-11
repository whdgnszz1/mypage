var db = require('./db');
var template = require('./template');
var url = require('url');
var qs = require('querystring');
var cookie = require('cookie');


const express = require('express')
const app = express() // express()는 함수이며, app에 담김.
const port = 3000


// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({
//   secret: 'adsa$@!#zxv',
//   resave: false,
//   saveUninitialized: true,
//   store:new FileStore(),
// }))

// app.use('/auth', authRouter);


// app.get('/main', (req, res) => {
//   if (!authCheck.isOwner(req, res)) {  
//     res.redirect('/auth/login');
//     return false;
//   }
//   var html = template.HTML('',
//     `<hr>
//         <h2>메인 페이지에 오신 것을 환영합니다</h2>
//         <p>로그인에 성공하셨습니다.</p>`,
//     authCheck.statusUI(req, res)
//   );
//   res.send(html);
// })




function authIsOwner(request, response) {
  var isOwner = false;
  var cookies = {};
  db.query('SELECT * FROM author WHERE email=? AND password=?', [cookie.parse(request.headers.cookie).email, cookie.parse(request.headers.cookie).password], function (error, result) {
    if (request.headers.cookie) {
      cookies = cookie.parse(request.headers.cookie);
    }
    if (cookies.email === result[0].email && cookies.password === result[0].password) {
      isOwner = true;
    }
    console.log(isOwner)

    return isOwner;
  });
}

function authStatusUI() {
  var isOwner = authIsOwner(request, response)
  var authStatusUI = '<a href="/login">login</a>'
  if (isOwner = true) {
    authStatusUI = '<a href="/logout_process">logout</a>'
  } else {
    authStatusUI = '<a href="/login">login</a>'

  }
} 


//route, routing 어떤 길을 따라서 쭉 가다가 갈림길에서 적당한 곳으로 방향을 잡아주는 것
//사용자들이 path를 통해서 들어올 때 path에 따라 적당한 응답을 해주는 것
//express의 라우팅 방식은 request와 response를 각각 구현하기 때문에 훨씬 더 필요한 것끼리 모여있게 된다.
//첫 번째 자리엔 경로, 두 번째 자리엔 경로가 호출됐을 때 호출 될 함수.
app.get('/', function (request, response) {
  // 쿠키가 있다면
  if (request.headers.cookie) {
    var isOwner = authIsOwner(request, response)
    var authStatusUI = '<a href="/login">login</a>'
    if (isOwner = true) {
      authStatusUI = '<a href="/logout_process">logout</a>'
    }
    db.query(`SELECT * FROM topic`, function (error, topics) {
      var title = 'Welcome';
      var description = 'Hello, Node.js';
      var list = template.list(topics);
      var html = template.HTML(title, list,
        `<h2>${title}</h2>${description}
        <p>
          <a href="/account">회원가입</a>
  
        </p>`,
        `<a href="/create">create</a>
         <p>
            <form action="/search_result "method="post">
            <select>
            <option value="제목" name="title">제목</option>        
            <option value="작성자" name="author">작성자</option>
            <option value="제목+작성자">제목+작성자</option>
            </select>
            <input type="text" name="search">
            <input type="submit" value="검색">
         </p>`, '', authStatusUI
      );
      response.send(html);
    });
  }     //쿠키가 없다면
  else {
    db.query(`SELECT * FROM topic`, function (error, topics) {
      var title = 'Welcome';
      var description = 'Hello, Node.js';
      var list = template.list(topics);
      var html = template.HTML(title, list,
        `<h2>${title}</h2>${description}
        <p>
          <a href="/account">회원가입</a>
  
        </p>`,
        `<a href="/create">create</a>
         <p>
            <form action="/search_result "method="post">
            <select>
            <option value="제목" name="title">제목</option>        
            <option value="작성자" name="author">작성자</option>
            <option value="제목+작성자">제목+작성자</option>
            </select>
            <input type="text" name="search">
            <input type="submit" value="검색">
         </p>`, ''
      );
      response.send(html);
    });
  }
});

app.get('/login', function (request, response) {
  db.query(`SELECT * FROM topic`, function (error, topics) {
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(topics);
    var html = template.HTML(title, list,
      `
      <form action="login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="password" placeholder="password"></p>
        <p><input type="submit" value="login"></p>
      </form>`,
      ``, ''
    );
    response.send(html);
  });
})

app.post('/login_process', function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    db.query('SELECT * FROM author WHERE email=? AND password=?', [post.email, post.password], function (error, result) {
      if (result[0].email === post.email && result[0].password === post.password) {
        response.writeHead(302, {
          'Set-Cookie': [
            `email=${post.email}`,
            `password=${post.password}`
          ],
          Location: `/`
        });
        response.end();
      }
    });
  });
})


//pageId를 콜백함수 안에서 가져와야 함.
//express -> guide -> routing -> route parameters
app.get('/page/:pageId', function (request, response) {
  var pageId = request.params.pageId
  console.log(pageId)
  db.query(`SELECT * FROM topic`, function (error, topics) {
    if (error) {
      throw error;
    }
    db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`, [pageId], function (error2, topic) {
      if (error2) {
        throw error2;
      };
      var title = topic[0].title;
      var description = topic[0].description;
      var list = template.list(topics);
      var html = template.HTML(title, list,
        `
            <h2>${title}</h2>
            ${description}
            <p>by ${topic[0].name}</p>
            `,
        ` <a href="/create">create</a>
                 <a href="/update/${pageId}">update</a>
                 <form action="delete_process" method="post">
                   <input type="hidden" name="id" value="${pageId}">
                   <input type="submit" value="delete">
                 </form>`
      );
      response.send(html);
    });
  });
});

app.get('/create', function (request, response) {
  db.query(`SELECT * FROM topic`, function (error, topics) {
    db.query(`SELECT * FROM author`, function (error2, authors) {
      var title = 'WEB - CREATE';
      var list = template.list(topics);
      var html = template.HTML(title, list,
        `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
              ${template.authorselect(authors)}
            <p>
              <input type="submit">
            </p>
          </form>
        `, '');
      response.send(html);
    });
  });
});


app.post('/create_process', function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    db.query(`INSERT INTO topic (title, description,created, author_id) 
      VALUES(?, ?, NOW(), ?)`, [post.title, post.description, post.author], function (error, result) {
      if (error) {
        throw error;
      };
      response.writeHead(302, { Location: `/?id=${result.insertId}` });
      response.end();
    });
  });
});



app.get('/update/:pageId', function (request, response) {
  const pageId = request.params.pageId
  db.query(`SELECT * FROM topic`, function (error, topics) {
    if (error) {
      throw error
    };
    db.query(`SELECT * FROM topic WHERE id=?`, [pageId], function (error2, topic) {
      if (error2) {
        throw error2;
      };
      db.query(`SELECT * FROM author`, function (error3, authors) {
        if (error3) {
          throw error3;
        };
        var list = template.list(topics);
        var html = template.HTML(topic[0].title, list,
          `
          <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${topic[0].id}">
            <p>
              <input type="text" name="title" placeholder="title" value="${topic[0].title}">
            </p>
            <p> 
              <textarea name="description" placeholder="description">${topic[0].description}</textarea>
            </p>
            <p>
              ${template.authorselect(authors, topic[0].author_id)}
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `,
          `<a href="/create">create</a> <a href="/update/${topic[0].id}">update</a>`
        );
        response.send(html);
      });

    });
  });
});

app.post('/update_process', function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    db.query('UPDATE topic SET title=?, description=?, author_id=? WHERE id=?',
      [post.title, post.description, post.author, post.id], function (error, result) {
        response.writeHead(302, { Location: `/page/${post.id}` });
        response.end();
      });
  });
});

app.post('/page/delete_process', function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    db.query('DELETE FROM topic WHERE id=?', [post.id], function (error, result) {
      response.writeHead(302, { Location: `/` });
      response.end();
    });
  });
});

app.get('/search', function (request, response) {
  var title = '';
  var description = '';
  var list = template.list(request.list);
  var html = template.HTML(title, list,
    `<h2>${title}</h2>${description}`,
    '', ''
  );
  response.ssend(html);
});

app.post('/search_result', function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    db.query('SELECT * FROM topic WHERE title rlike ?', [post.search], function (error, result) {
      var list = template.list(result);
      var html = template.HTML(result.title, list, '', '', '');
      response.send(html);
    });
  });

});


app.listen(port, () => {
});


/*
var db = require('./db');
var template = require('./template');
var url = require('url');
var qs = require('querystring');


exports.home = function (request, response) {

};

exports.page = function (request, response) {

};

exports.create = function (request, response) {

};

exports.create_process = function (request, response) {

};


exports.update = function (request, response) {

};

exports.update_process = function (request, response) {

};


exports.deleteprocess = function (request, response) {

};



exports.search = function (request, response) {

};

exports.search_result = function (request, response) {

};
*/