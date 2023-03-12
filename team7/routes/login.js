module.exports = {
    HTML: function (title) {
      return `
      <!doctype html>
      <html>
      <head>
        <title>로그인</title>
        <meta charset="utf-8">
        <style>
        form {
            border: 3px solid rgb(0, 119, 255);
            border-radius: 10px;
            width: 500px;
            margin: 200px auto;
            box-sizing: border-box;
          }
          div {
            width: 100%;
            margin: 15px auto;
          }
          label {
            display: block;
            margin-top: 20px;
            margin-left: 29px;
            padding: 10px;
            font-size: 25px;
          }
          
          input {
            width: 80%;
            padding: 10px;
            border: 1px solid #797979;
            margin-left: 40px;
            font-size: 20px;
            border-radius: 3px;
          }
          
          hr {
            margin: 40px;
            border-top: 3px dashed #ccc;
          }
          button {
            padding: 10px;
            width: 100px;
            outline: none;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            background: linear-gradient(90deg, rgb(0, 119, 255), rgb(0, 229, 255));
            font-size: 18px;
            font-weight: bold;
            color: whitesmoke;
            transition: all 0.7s;
          }
          button:hover {
            border: none;
            background: transparent;
            box-shadow: none;
            color: rgb(0, 119, 255);
          }
          button:hover:before {
            height: 100%;
          }
          button:hover:after {
            width: 100%;
          }
          .loginBtn,
          .submit {
            margin: 20px;
            margin-left: 40px;
          }
          
          #result {
            margin-left: 50px;
            margin-bottom: 50px;
            display: block;
            color: red;
            font-weight: bold;
            font-style: italic;
          }
          
        </style>
      </head>
      <body>
      <form action="/auth/login_process" method="post">
      <label for="username">Username</label><br />
      <p><input class="login" type="text" name="username" placeholder="아이디"></p>
      <label for="password">Password</label><br />
      <p><input class="login" type="password" name="pwd" placeholder="비밀번호"></p>
      <button input class="loginBtn" type="submit">log-in</button>
      <button class="signupBtn" type="button" onclick="window.open('/auth/register')">sign up</button>
      </form> 
      </body>
      </html>
      `;
    }
  }