
function cal(arr) {
  const ii = arr.filter(item=>item % 2 != 0).filter(item=> item > 0)

  return ii
}

console.log(cal([5,0,-5,20,88,17,-32])) //22