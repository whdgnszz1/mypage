var express = require('express');
var router = express.Router();

var template = require('./template.js');
var db = require('./db');

const login = require('./login.js');
const membership = require('./membership.js');


router.get('/login', function (request, response) {
    var title = '로그인';
    var html = login.HTML(title,`
            <form action="/auth/login_process" method="post">
            <label for="username">Username</label><br />
            <p><input class="login" type="text" name="username" placeholder="아이디"></p>
            <label for="password">Password</label><br />
            <p><input class="login" type="password" name="pwd" placeholder="비밀번호"></p>
            <p><input class="btn" type="submit" value="log-in"></p>
            <button class="signupBtn" type="button" onclick="window.open('/auth/register')">sign up</button>
            </form>            
        `, '');
    response.send(html);
});

router.post('/login_process', function (request, response) {
    var username = request.body.username;
    var password = request.body.pwd;
    if (username && password) {             
        
        db.query('SELECT * FROM usertable WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {     
                request.session.is_logined = true;     
                request.session.nickname = username;
                request.session.save(function () {
                    response.redirect(`/`);
                });
            } else {              
                response.send(`<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); 
                document.location.href="/auth/login";</script>`);    
            }            
        });

    } else {
        response.send(`<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요!"); 
        document.location.href="/auth/login";</script>`);    
    }
});


router.get('/logout', function (request, response) {
    request.session.destroy(function (err) {
        response.redirect('/');
    });
});



router.get('/register', function(request, response) {
    var title = '회원가입';    
    var html = membership.HTML(title, `
    <h2>회원가입</h2>
    <form action="/auth/register_process" method="post">
    <p><input class="login" type="text" name="username" placeholder="아이디"></p>
    <p><input class="login" type="password" name="pwd" placeholder="비밀번호"></p>    
    <p><input class="login" type="password" name="pwd2" placeholder="비밀번호 재확인"></p>
    <p><input class="btn" type="submit" value="제출"></p>
    </form>            
    <p><a href="/auth/login">로그인화면으로 돌아가기</a></p>
    `, '');
    response.send(html);
});
 

router.post('/register_process', function(request, response) {    
    var username = request.body.username;
    var password = request.body.pwd;    
    var password2 = request.body.pwd2;

    if (username && password && password2) {
        
        db.query('SELECT * FROM usertable WHERE username = ?', [username], function(error, results) {
            if (error) throw error;
            if (results.length <= 0 && password == password2) {     
                db.query('INSERT INTO usertable (username, password) VALUES(?,?)', [username, password], function (error, data) {
                    if (error) throw error2;
                    response.send(`<script type="text/javascript">alert("회원가입이 완료되었습니다!");
                    document.location.href="/";</script>`);
                });
            } else if (password != password2) {                    
                response.send(`<script type="text/javascript">alert("입력된 비밀번호가 서로 다릅니다."); 
                document.location.href="/auth/register";</script>`);    
            }
            else {                                                
                response.send(`<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); 
                document.location.href="/auth/register";</script>`);    
            }            
        });

    } else {       
        response.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); 
        document.location.href="/auth/register";</script>`);
    }
});

module.exports = router;