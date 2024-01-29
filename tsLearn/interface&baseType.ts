interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`)
}

const point = { x: 12, y: 26 };
logPoint(point);

// * 数组
let list: number[] = [1, 2, 3]
let list1: Array<number> = [1, 2, 3]

// *  元组
let x: [string, number]
x = ['aaa', 10]

// * 枚举 enum
// 枚举可以由值，反过来找到名称
enum str { aa, bb = 1 }
let a: str = str.aa
let strName: string = str[1]

// * Any
/*
 * 对数据类型不确定时可以使用any
 * 甚至还可以在any类型的值变量上调用方法
 */
let notsure: any = 4
notsure = 'message'
notsure = false
notsure.toFixed()

let notsureList: any[] = [1, 'www', false]
notsureList[1] = 100 // 还可以给string赋值number

// * void
// 函数没有任何返回时，其返回类型为void
let voidFun = (): void => { }

// * 断言
// 下断言有两种形式，一种是尖括号，一种是as语法
// 断言可以绕开编译阶段检查
let someValue: any = 'this is a string'
let strLength: number = (<string>someValue).length
let strLength2: number = (someValue as string).length

// interface
// * 1. 描述js对象拥有的外形
interface labelValue {
  name: string,
  price: number,
  desc?: string, // 可选属性
  readonly id: string // 只读属性
}
// 如下labelObj必须包含有labelValue的属性，否则会报错
let printLabel = (labelObj: labelValue): void => {
  console.log(labelObj);
}
let myLabel = { name: 'charade', price: 395, id: 'shdjshdkj' }
printLabel(myLabel)

// * 2. 使用interface定义函数
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc
mySearch = (source: string, subString: string) => {
  let result = source.search(subString)
  return result > -1
}

// * 3. 还可以使用呢interface来描述索引
// 数组
interface StringArray {
  [index: number]: string
}
let myArray: StringArray
myArray = ['hiyuri', 'lili']
myArray[0]
myArray['0'] // 使用number来索引时，js会将number转化为string再去索引对象
// 对象
interface test {
  readonly [index: string]: number
  length: number
}
let mytest: test = { 'dsad': 1, length: 676 }

// * 4. 描述类，强制一个类去符合某种契约
interface ClockInterface {
  currentTime: Date
}
class Clock implements ClockInterface {
  currentTime: Date;

  setTime(d: Date) {
    this.currentTime = d // ts的严格类型检查，若不对变量进行初始化会报错
  }
  constructor(h: number, m: number) {
    this.currentTime = new Date()
  }
}

interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface2
}
interface ClockInterface2 {
  tick(): any
}
const createClock = (ctor: ClockConstructor, hour: number, minute: number): ClockInterface2 => {
  return new ctor(hour, minute)
}
class DigitalClock implements ClockInterface2 {
  constructor(h: number, m: number) { }
  tick() {
    console.log('11111');
  }
}
class AnalogClock implements ClockInterface2 {
  constructor(h: number, m: number) { }
  tick() {
    console.log('wawawa');
  }
}
let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)
digital.tick()
analog.tick()

// * 5. interface继承
interface Shape {
  color: string
}
interface Square extends Shape {
  sideLength: number
}
let square = <Square>{}
square.color = 'red'
square.sideLength = 20

interface PenStroke {
  penWidth: number
}
interface Square2 extends Shape, PenStroke {
  side: number
}
let square2 = <Square2>{}
square2.color = 'pink'
square2.penWidth = 80
square2.side = 10

// * 6. interface混合类型
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}
const getCounter = (): Counter => {
  let counter = <Counter>function (start: number) { };
  // let counter : <Counter>(start: number) => {}
  // let counter = (start: number) => {} 
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}
let c = getCounter()
c(10)
c.reset()
c.interval = 5.0
console.log(c);


// * 7. interface继承类
class Control {
  private state: any
}
interface SelectableControl extends Control {
  select(): void
}
class Button extends Control implements SelectableControl {
  select() { }
}
class TextBox extends Control {
  select() { }
}