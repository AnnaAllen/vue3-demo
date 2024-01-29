/*
  * T帮助我们捕获用户传入的类型
  * 函数返回T：捕获了类型后又使用了该类型作为函数的返回类型
  * 泛型参数不一定写T，写其他也可以
*/
function identity<T>(arg: T): T {
  return arg;
}
let myIdentity: <T>(arg: T) => T = identity

let output = identity<string>('myStirng') // * 使用<>括起来表示，T为string并作为一个参数传给函数
let output2 = identity('myStirng') // * 隐式类型推导，编译器检查括号中的类型并将类型赋值给T

// 可表示函数接收的arg是：元素类型为T的数组，返回的也是元素类型为T的数组
function loggingIdetity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg
}
// 也可以改写成
function loggingIdetity2<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);
  return arg
}

// 把泛型参数当做整个接口的一个参数
interface GenericIdentityFn<T> {
  (arg: T): T
}
function identity2<T>(agr: T): T {
  return agr
}
let myIdentity2: GenericIdentityFn<number> = identity

// 泛型类
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}
let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) { return x + y }

let stringNumberic = new GenericNumber<string>()
stringNumberic.zeroValue = ''
stringNumberic.add = function (x, y) { return x + y }
console.log(stringNumberic.add(stringNumberic.zeroValue, "test"));

// 泛型约束
interface lengthwise {
  length: number
}
function loggingIdentity2<T extends lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg
}

// 在泛型里使用类类型
function create<T>(c: { new(): T }): T {
  return new c()
}

class BeeKeeper {
  hasMask: boolean
}
class ZooKeeper {
  nametag: string
}
class Animal {
  numLegs: number
}
class Bee extends Animal {
  keeper: BeeKeeper
}
class Lion extends Animal {
  keeper: ZooKeeper
}
function createInstance<A extends Animal>(c: new () => A): A {
  return new c()
}
createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMask