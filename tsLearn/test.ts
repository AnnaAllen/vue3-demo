// 数组泛型
let list: Array<number> = [1, 2, 3, 4]

// 类型断言
let someString: any = 'Anna'
let myStringLen: number = (someString as string).length
// 或者用<>，myStringLen = (<string>someString).length


let loggingIdentity = <T>(arg: Array<T>): Array<T> => {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}
interface GenericIdentityFn {
  <T>(arg: T[]): T[]
}
// let myIdentity: {<T>(arg: T[]): T[]} = loggingIdentity;
let myIdentity: GenericIdentityFn = loggingIdentity;

// 把泛型参数当作整个接口的一个参数
interface GenericIdentityFn1<T> {
  (arg: T): T
}
function identify<T>(arg: T): T {
  return arg
}
let myIdentity1: GenericIdentityFn1<Number> = identify

// 泛型类
class GNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}
let myGNumber = new GNumber<number>()
myGNumber.zeroValue = 0
myGNumber.add = (x, y) => x + y

const getProperty = (obj: T, key: String) => obj[key]
let x = { a: 1, b: 2, c: 3, d: 4 }
getProperty(x, 'a')


