// module.exports = {
//     HTML: function (title) {
//         return `
//       <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>회원가입 페이지</title>
//     <link rel="stylesheet" href="../temlate/member.css">
//     <script src="/lib_login/membership.js"></script>
//     <script src="/temlate/member.js"></script>
    
// </head>

// <body>

// <h2>회원가입</h2>
// <form action="/auth/register_process" method="post">
// <div class="form-control">
// <input id="id" class="login" type="text" name="username" placeholder="아이디">
// <small>에러문구</small>
// </div>

// <div class="form-control">
// <input class="login" type="password" name="pwd" placeholder="비밀번호">  
// <small>에러문구</small>
// </div>

// <div class="form-control">
// <input class="login" type="password" name="pwd2" placeholder="비밀번호 재확인">
// <small>에러문구</small>
// </div>

// <div class="form-control">
//                 <input id="username" class="input" placeholder="이름" type="text">
//                 <small>에러문구</small>
//             </div>

//             <div  class="form-control">
//             <label for="">생년월일</label>
//             <input  type="text">
//             <select name="">
//                 <option value="" selected="selected">월</option>
//                 <option value="">1</option>
//                 <option value="">2</option>
//                 <option value="">3</option>
//                 <option value="">4</option>
//                 <option value="">5</option>
//                 <option value="">6</option>
//                 <option value="">7</option>
//                 <option value="">8</option>
//                 <option value="">9</option>
//                 <option value="">10</option>
//                 <option value="">11</option>
//                 <option value="">12</option>
//             </select>

//             <input type="text">
//         </div>

//         <div  class="form-control">
//         <label for="gender">성별</label>
//         <select id="gender" class="input" name="">
//             <option value="성별" selected="selected">성별</option>
//             <option value="남자">남자</option>
//             <option value="여자">여자</option>
//             <option value="선택안함">선택안함</option>
//         </select>
//     </div>

//     <div class="form-control">
//     <label for="email">이메일 인증</label>
//     <input class="input" type="email">
//     <input type="button" value="인증코드 받기">
//     <!-- <small>에러문구</small> -->
// </div>

// <div class="form-control">
//                 <label for="submit">이메일코드</label>
//                 <input class="input" type="text">
//                 <small>에러문구</small>
//             </div>

// <p><input class="btn" type="submit" value="가입하기"></p>
// </form>            
// <p><a href="/auth/login">로그인화면으로 돌아가기</a></p>
// <script src="member.js"></script>
// </body>

// </html>
//       `;
//     }
// }