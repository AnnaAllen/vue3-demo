// 1. 函数类型
let add = (x:number, y:number): number => {
  return x + y
}
let myAdd: (x:number, y:number) => number = (x:number, y:number): number => { return x + y }

// 2. 可选参数
let buildName = (firstName: string, lastName?: string) => {
  if(lastName) return firstName
  return firstName + ' ' + lastName
}
// 带有默认值的参数最好放在必须参数后面，如果放在前面就需要传入undefined来使用默认值，否则会报错
let buildName2 = (firstName: string, lastName = 'aaaa') => {
  if(lastName) return firstName
  return firstName + ' ' + lastName
}

// 3. 未知数量的参数
let buildName3 = (...allName: string[]) => {
  return allName.join(' ')
}
let getAllName = buildName3('lili', 'hiyuri', 'risuka')
console.log(getAllName);

// 4. this
interface Card {
  suit: string,
  card: number
}
interface Deck {
  suits: string[],
  card: number[]
  createCardPicker(this: Deck): () => Card
}
let deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  card: Array(52),
  createCardPicker: function(this: Deck) { // 这里不能用箭头函数，箭头函数的this指向为any且无法把this作为参数传入
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)
      return {suit: this.suits[pickedSuit], card: pickedCard % 13}
    }
  }
}
let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()
console.log('Card: ' + pickedCard.card + ' of ' + pickedCard.suit)

// 5. 重载
// 对函数做类型检查
let suits = ['hearts', 'spades', 'clubs', 'diamonds']

function pickedCard2(x: {suit: string; card: number;}[]): number
function pickedCard2(x: number): {suit: string; card: number; }
function pickedCard2(x): any {
  if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
  }
  else if (typeof x == "number") {
      let pickedSuit = Math.floor(x / 13);
      return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: 'diamonds', card:2 },
  { suit: 'spades', card:10 },
  { suit: 'hearts', card:4 },
]
let pickCard3 = myDeck[pickedCard2(myDeck)]
console.log(pickCard3.suit, '  ', pickCard3.card)
let pickCard4 = pickedCard2(15)
console.log(pickCard4.suit, pickCard4.card);