const form = document.getElementById('form')
const id = document.getElementById('id')
const passWord = document.getElementById('password')
const rePassword = document.getElementById('rePassword')
const username = document.getElementById('username')

// 정규식
// id, pw
const regIdPw = /^[a-zA-Z0-9]{4,12}$/;
// 이름
const regName = /^[가-힣a-zA-Z]{2,15}$/;
// 이메일
const regMail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
// 년도
const regYear = /^[1-2]{1}[0-9]{0,4}$/;

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// function matchPassword(){
//     if(passWord.value === rePassword.value){
//         showSuccess(rePassword, '비밀번호가 일치합니다')
        
//     }
// }
// function mismatchPassword(){
//     if(passWord.value !== rePassword.value){
//         showError(rePassword, '비밀번호가 일치하지 않습니다')
//     }
// }
  

form.addEventListener('submit',function(e) {
    e.preventDefault()
    console.log('click')

    if(username.value === '' ){
        showError(username, '필수 항목입니다')
    }
    if(id.value === ''){
        showError(id, '필수 항목입니다')
    }
    if(passWord.value === ''){
        showError(passWord, '필수 항목입니다')
        
    }
    if(rePassword.value === ''){
        showError(rePassword, '필수 항목입니다')
        
    }
    if(passWord.value == rePassword.value){
        showSuccess(passWord, '비밀번호가 일치합니다')

    }
    if(passWord.value != rePassword.value){
        showError(rePassword, '비밀번호가 일치하지 않습니다~!')

    }
})




