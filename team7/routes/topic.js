var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');
var db = require('./db');


router.get('/create', function (request, response) {
  if (!auth.isOwner(request, response)) {
    response.redirect('/');
    return false;
  }
  db.query(`SELECT * FROM topic`, function (error, topics) {
    db.query(`SELECT * FROM author`, function (error2, authors) {
      console.log(topics)
      var title = 'WEB - create';
      var list = template.list(topics);
      var html = template.HTML(title, list, `
      <form action="/topic/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
          ${template.authorselect(authors)}
        <p>
          <input type="submit">
        </p>
      </form>
    `, '', auth.statusUI(request, response));
      response.send(html);
    });
  });
});

router.post('/create_process', function (request, response) {
  if (!auth.isOwner(request, response)) {
    response.redirect('/');
    return false;
  }
  var post = request.body;
  var title = post.title;
  var author = post.author
  var description = post.description;
  db.query(`INSERT INTO topic (title, description,created, author_id) 
  VALUES(?, ?, NOW(), ?)`, [title, description, author], function (error, result) {
    if (error) {
      throw error;
    }; response.redirect(`/topic/${result.insertId}`);
  });
});

router.get('/update/:pageId', function (request, response) {
  const pageId = request.params.pageId
  if (!auth.isOwner(request, response)) {
    response.redirect('/');
    return false;
  }
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
          <form action="/topic/update_process" method="post">
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
          `<a href="/topic/create">create</a> <a href="/topic/update/${topic[0].id}">update</a>`,
          auth.statusUI(request, response)
        );
        response.send(html);
      });
    });
  });
});


router.post('/update_process', function (request, response) {
  if (!auth.isOwner(request, response)) {
    response.redirect('/');
    return false;
  }
  var post = request.body;
  db.query('UPDATE topic SET title=?, description=?, author_id=? WHERE id=?',
    [post.title, post.description, post.author, post.id], function (error, result) {
      response.redirect(`/topic/${post.id}`)
    });
});

router.post('/delete_process', function (request, response) {
  if (!auth.isOwner(request, response)) {
    response.redirect('/');
    return false;
  }
  var post = request.body;
  db.query('DELETE FROM topic WHERE id=?', [post.id], function (error, result) {
    response.redirect(`/`)
  });
});

router.get('/:pageId', function (request, response, next) {
  var pageId = request.params.pageId
  console.log(pageId)
  db.query(`SELECT * FROM topic`, function (err, topics, next) {
    if (err) {
      next(err);
    } else {
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
          ` <a href="/topic/create">create</a>
                   <a href="/topic/update/${pageId}">update</a>
                   <form action="delete_process" method="post">
                     <input type="hidden" name="id" value="${pageId}">
                     <input type="submit" value="delete">
                   </form>`
        );
        response.send(html);
      });
    }
  });
});
module.exports = router;