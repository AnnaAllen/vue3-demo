
// 数组泛型
let list: Array<number> = [1,2,3,4]

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