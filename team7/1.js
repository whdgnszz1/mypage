function solution(n) {
  let answer = ''
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      answer += '*'
    }
    answer += '\n'
  }
  return answer
}
console.log(solution(5))