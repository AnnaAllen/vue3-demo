// 1. 基础类
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message // 引用任意一个类成员时都使用this
  }
  greet() {
    return 'hello ' + this.greeting
  }
}
let greeting = new Greeter('world')
console.log(greeting.greet());

// 2. 继承
class Animal {
  name: string
  constructor(theName: string) { this.name = theName}
  move(distanceMeters: number = 0) {
    console.log(this.name + ' move: ' + distanceMeters);
  }
}
class Snake extends Animal {
  constructor(name: string) { super(name) } // 派生类包含了一个构造函数，必须要调用super()，才能使用基础类的成员
  move(distanceMeters = 5): void {
    console.log('snake');
    super.move(distanceMeters)
  }
}
class Horse extends Animal {
  constructor(name: string) { super(name) }
  move(distanceMeters = 50): void {
    console.log('horse');
    super.move(distanceMeters)
  }
}
let lili = new Snake('Lili')
let hiyuri = new Horse('Hiyuri')
lili.move()
hiyuri.move(40)

// 3. public、private、proteccted
class Animal2 {
  public name: string // 在ts中默认所有成员为public
  public constructor(theName: string) { this.name = theName}
  public move(distanceMeters: number = 0) {
    console.log(this.name + ' move: ' + distanceMeters);
  }
}

class Animal3 {
  private name: string // private让该属性无法在外部访问
  constructor(theName: string) { this.name = theName}
  move(distanceMeters: number = 0) {
    console.log(this.name + ' move: ' + distanceMeters);
  }
}
class Cat extends Animal3{
  constructor() { super('Anna') } // cat不能调用访问animal中的name，但是他们共享同一个name
}
class Dog {
  private name: string
  constructor(theName: string) { this.name = theName} // dog的name是自己的，跟其他类的不同
}

class Person {
  protected name: string
  constructor(name: string) { this.name = name}
}
class Employee extends Person  {
  private department: string
  constructor(name: string, department: string) {
    super(name) // 保护属性可以在继承类中访问， 但无法在继承类外部调用
    this.department = department
  }
  getElevatorPitch() {
    return this.name + ' in ' + this.department
  }
}
let test = new Employee('Anna', 'dep')
console.log(test.getElevatorPitch());

// 4. 抽象类
abstract class Department {
  constructor(public name: string) {}
  printName(): void {
    console.log('Department ' + this.name);
  }
  abstract printMeeting(): void
}
class AccountingDepartment extends Department {
  constructor() {
    super('accounting and auditing')
  }
  printMeeting(): void {
    console.log('the accounting');
  }
  generateReports(): void {
    console.log('generating....');
  }
}
let department: Department
// department = new Department() 报错：抽象类不能作为实例创建
department = new AccountingDepartment()
department.printName()
department.printMeeting()
// department.generateReports() 报错：generateReports没有在抽象类中声明

// 5. 高级技巧
class Greeter2 {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'hello ' + this.greeting
  }
}
let greeter: Greeter2
greeter = new Greeter2('world')
console.log(greeter.greet());

class Greeter3 {
  static standardGreeting = 'hello there'
  greeting: string
  greet() {
    if(this.greeting) {
      return 'hello ' + this.greeting
    } else {
      return Greeter3.standardGreeting
    }
  }
}
let greeter3: Greeter3
greeter3 = new Greeter3()
console.log(greeter3.greet());

let greeterMaker: typeof Greeter3 = Greeter3 // [let greeterMaker: typeof Greeter3] = Greeter3, typeof Greeter3指使用Greeter3的类型
greeterMaker.standardGreeting = 'hey there'

let greeter3_2: Greeter3 = new greeterMaker()
console.log(greeter3_2.greet());


