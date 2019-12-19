/////// Arrow Functions ///////
// old style
function plusOne(n) {
  return n+1;
}

// Arrow example 1
const plusOne = (n) => { return n+1 };

// Arrow example 2
const plusOne = n => n+1;

// this closure
const obj1 = {
  num: 444,
  fn: function() {
    console.log(tnis.num);
  }
};

const obj2 = {
  num: 888,
  fn: () => {
    console.log(this.num);
  }
};

obj1.fn(); //444
obj2.fn(); //undifined


/////// Default parametors ///////
const plusOne = (n = 0) => n + 1;

console.log(plusOne(5)); // 6
console.log(plusOne());  // 1



/////// Class ///////
class Bird {
  constructor(name) {
    this.name = name;
  }

  chirp() {
    console.log(`${this.name} chirps`);
  }

  static explain(name) {
    console.log(`${name} has wings and bear eggs`);
  }
}

class FlyableBird extends Bird {
  constructor(name) {
    super(name);
  }

  fly() {
    console.log(`${this.name} flies!`);
  }
}

const bd1 = new Bird('Penguin');
bd1.chirp();
Bird.explain('Raven');

const bd2 = new FlyableBird('Sparrow');
bd2.fly();


/////// 分割代入 ///////
const [n, m] = [1, 4];
console.log(n, m); // 1 4

const obj = { name: "kanae", age: 24 };
const { name, age } = obj;
console.log(name, age);  // Kanae 24


/////// コレクション展開構文 ///////
// スプレッド構文、スプレッド演算子
const arr1 = ['A', 'B', 'C'];
const arr2 = [...arr1, 'D', 'E'];
console.log(arr2); //['A', 'B', 'C', 'D', 'E']

const obj1 = { a:1, b: 2, c:3 };
const obj2 = { ...obj1, d: 4, e: 5 };
console.log(obj2); // { a:1, b: 2, c:3, d:4, e:5 }

// Property name short-hand
const foo = 65536;
const obj = {foo, bar: 4096};
console.log(obj); // {foo: 65536, bar: 4096}


/////// 非同期処理 ///////
const wakeUp = ms => {
  setTimeout(() => {console.log("I just woke up!");}, ms);
}

const greet = () => {
  console.log("Good night!");
  wakeUp(2000);
  console.log("Good morning!");
}

greet();

//非同期処理のプロセスを待ってもらうやり方  Primise構文
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const greet = () => {
  console.log("Good night!");

  sleep(2000)
    .then(() => {
      console.log("I just woke up!");
      console.log("Good morning!");
    })
    .catch(err => {
      console.error("Sleep exceptions:", err);
    })
}

greet();

// async/await構文 (なるべくこっちを使うようにする)
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const greet = async() => {
  console.log("Good night!");

  try{
    await sleep(2000);
    console.log("I just woke up!");
    console.log("Good morning!");
  }catch(err){
    console.error("sleep exceptions: ", err);
  }
}

greet();


//////////////////////////////////////
/////// Functional Programming ///////
//////////////////////////////////////

/////// コレクションの反復処理
const arr = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(arr.map(n => n * 2));           // [ 2, 4, 6, 8, 10, 12, 14, 16 ]
console.log(arr.filter(n => n % 3 === 0))   // [ 3, 6 ]
console.log(arr.find(n => n > 4));          // 5
console.log(arr.every(n => n !== 0));       // true
console.log(arr.some(n => n > 8));          // false
console.log(arr.includes(5));               // true
console.log(arr.reduce((n, m) => n + m));   // 36
console.log(arr.sort((n,m) => n < m));      // [ 8, 7, 6, 5, 4, 3, 2, 1 ]


/////// High Order Functioins (HOF)
const hof = (ex, fn) => {
  return n => fn(n + ex);
}

const plusOneDouble = hof(1, n => n * 2);
console.log(plusOneDouble(4));

/////// Closure
const counterMaker = (initialCount) => {
  let c = initialCount;
  const increment = () => c++;

  return increment;
}

const count = counterMaker(1);
console.log(count(), count(), count()); // 1 2 3

const count02 = counterMaker(10);
console.log(count02(), count02(), count02()); // 10 11 12


/////// Generator Function (this is used for Redux-saga)
function* rangeGenertor(end, start = 0) {
  let n = 0;

  for(let i = start; i < end; i++) {
    n += 1;
    yield i;
  }
}

const gen = rangeGenertor(3);
console.log(gen.next());    // { value: 0, done: false }
console.log(gen.next());    // { value: 1, done: false }
console.log(gen.next());    // { value: 2, done: false }
console.log(gen.next());    // { value: undefined, done: true }


/////// Curryiing
const multi = (n, m) => n * m;
console.log(multi(2, 4));   // 8

const curriedMulti = n => {
  return m => n * m;
}
console.log(curriedMulti(2)(4));    // 8

const simpleCurriedMulti = n => m => n * m;
console.log(simpleCurriedMulti(2)(4));    // 8

// 関数の部分最適化
const multi = n => m => n * m;
console.log(multi(3)(5));   // 15

const triple = multi(3);
console.log(triple(5));   // 15