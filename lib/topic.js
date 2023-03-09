const express = require('express')
const app = express() // express()는 함수이며, app에 담김.
const port = 3000


//route, routing 어떤 길을 따라서 쭉 가다가 갈림길에서 적당한 곳으로 방향을 잡아주는 것
//사용자들이 path를 통해서 들어올 때 path에 따라 적당한 응답을 해주는 것
//첫 번째 자리엔 경로, 두 번째 자리엔 경로가 호출됐을 때 호출 될 함수.
app.get('/', function (request, respond) {
  return res.send('/')
});

app.get('/page', function (request, respond) {
  return res.send('/page')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
/*
var db = require('./db');
var template = require('./template');
var url = require('url');
var qs = require('querystring');


exports.home = function (request, response) {
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
    response.writeHead(200);
    response.end(html);
  });
};

exports.page = function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query(`SELECT * FROM topic`, function (error, topics) {
    if (error) {
      throw error;
    }
    db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`, [queryData.id], function (error2, topic) {
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
                 <a href="/update?id=${queryData.id}">update</a>
                 <form action="delete_process" method="post">
                   <input type="hidden" name="id" value="${queryData.id}">
                   <input type="submit" value="delete">
                 </form>`
      );
      response.writeHead(200);
      response.end(html);
    })
  });
};

exports.create = function (request, response) {
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
      response.writeHead(200);
      response.end(html);
    });
  });
};

exports.create_process = function (request, response) {
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
};


exports.update = function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query(`SELECT * FROM topic`, function (error, topics) {
    if (error) {
      throw error
    };
    db.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], function (error2, topic) {
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
          `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
        );
        response.writeHead(200);
        response.end(html);
      });

    });
  });
};

exports.update_process = function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    db.query('UPDATE topic SET title=?, description=?, author_id=? WHERE id=?',
      [post.title, post.description, post.author, post.id], function (error, result) {
        response.writeHead(302, { Location: `/?id=${post.id}` });
        response.end();
      });
  });
};


exports.deleteprocess = function (request, response) {
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
};



exports.search = function (request, response) {
  var title = '';
  var description = '';
  var list = template.list(request.list);
  var html = template.HTML(title, list,
    `<h2>${title}</h2>${description}`,
    '', ''
  );
  response.send(html);
};

exports.search_result = function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    db.query('SELECT * FROM topic WHERE title rlike ?', [post.search], function (error, result) {
      var list = template.list(result);
      var html = template.HTML(result.title, list, '', '', '');
      response.end(html);    });
  });

};
*/