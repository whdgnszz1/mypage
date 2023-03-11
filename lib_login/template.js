module.exports = {
    HTML: function (title, body, authStatusUI) {
      return `
      <!doctype html>
      <html>
      <head>    
        <title>게시판</title>
        <meta charset="utf-8">
       
      </head>
      <body>
        <div>
          ${authStatusUI}
          ${body}
        </div>
      </body>
      </html>
      `;
    }
  }