var db = require('./db');
var template = require('./template');
var qs = require('querystring');
var url = require('url');




exports.home = function (request, response) {
    db.query(`SELECT * FROM topic`, function (error, topics) {
        if (error) {
            throw error
        };
        db.query(`SELECT * FROM author`, function (error2, authors) {
            var title = 'author';
            var list = template.list(topics);
            var html = template.HTML(title, list,
                `
                ${template.authorTable(authors)}
                <style>
                    table {
                        border-collapse:collapse;
                    }
                    td{
                        border:1px solid black;
                    }    
                </style>
                <form action="/author/create_process" method="post">
                <p>
                    <input type="text" name="name" placeholder="name">
                </p>
                <p>
                    <textarea name="profile" placeholder="description"></textarea>
                </p>
                <input type="submit">
                </form>
                `,
                ``
            );
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
        db.query(`INSERT INTO author (name, profile) 
        VALUES(?, ?)`, [post.name, post.profile], function (error, result) {
            if (error) {
                throw error;
            };
            response.writeHead(302, { Location: `/author` });
            response.end();
        });
    });
};

exports.update = function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM author`, function (error, authors) {
      if (error) {
        throw error
      };
      db.query(`SELECT * FROM author WHERE id=?`, [queryData.id], function (error2, author) {
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
            <form action="/autnor/update_process" method="post">
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
      db.query('UPDATE author SET name=?, profile=?',
        [post.name, post.profile], function (error, result) {
          response.writeHead(302, { Location: `/author` });
          response.end();
        });
    });
  };
  
  
  exports.delete_process = function (request, response) {
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