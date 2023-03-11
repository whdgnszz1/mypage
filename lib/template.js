module.exports = {
  HTML: function (title, list, body, control, searchlist, authStatusUI = '<a href="/login">login</a>') {
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${authStatusUI}
      <a href="/author">Author</a>
      ${list}
      ${control}
      ${body}
      ${searchlist}
    </body>
    </html>
    `;
  }, list: function (topics) {
    var list = '<ol>';
    var i = 0;
    while (i < topics.length) {
      list = list + `<li><a href="/page/${topics[i].id}">${topics[i].title}</a></li>`;
      i = i + 1;
    }
    list = list + '</ol>';
    return list;
  }, authorselect: function (authors, author_id) {
    var tag = '';
    var i = 0;
    while (i < authors.length) {
      var selected = '';
      if (authors[i].id === author_id) {
        selected = ' selected';
      };
      tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`;
      i++;
    };
    return `<p>
              <select name="author">
                ${tag}
              </select>  
            </p>`
  }, authorTable: function (authors) {
    var tag = '<table>';
    var i = 0;
    while (i < authors.length) {
      tag += `
            <tr>
                <td>${authors[i].name}</td>
                <td>${authors[i].profile}</td>
                <td><a href="/author/update_process">update</a></td>
                <td><a href="/author/delete_process">delete</a></td>
            </tr>
            `
      i++;
    }
    tag += '</table>'
    return tag
  }, searchlist: function (topics) {
    var list = '<table>';
    var i = 0;
    while (i < topics.length) {
      list = list + `
      <tr>
        <td><a href="/?id=${topics[i].id}">${topics[i].title}</a></td>
        <td>${topics[i].author_id}<td>
      </tr>
      `;
      i = i + 1;
    }
    list = list + '</table>';
    return list;
  }
}
