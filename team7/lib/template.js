module.exports = {
  HTML:function(title, list, body, control, authStatusUI='<a href="/auth/login">login</a> | <a href="/auth/register">Register</a>'){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      ${authStatusUI}
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/topic/${filelist[i].id}">${filelist[i].title}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
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
  }
}
