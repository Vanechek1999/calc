"use strict";
// Promise (ES6)
//
// console.log('Запрос данных...')
//
// const req = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         console.log('Подготовка данных');
//         const product ={
//             name: 'TV',
//             price: 2000
//         }
//         resolve(product)
//     },2000)
// })
// req.then((product)=>{
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             product.status = 'order';
//             resolve(product)
//         },2000)
//     })
// }).then(data=>{
//     data.modify = 'true';
//     return data
// }).then(data=>{
//     console.log(data)
// }).finally(()=>{
//     console.log('Finally')
// })

// const test = time=>{
//     return new Promise(resolve => {
//         setTimeout(()=>{
//             resolve()
//         },time)
//     })
// }
// Promise.all([test(1000),test(2000)]).then(()=>{
//     console.log('all');
// })
// Promise.race([test(1000),test(2000)]).then(()=>{
//     console.log('all');
// })


//Методы перебора массива

//filter

// const names = ['Ivan', 'Ann', 'Ekaterina', 'Rob'];
//
// const shortsName = names.filter((name)=>{
//     return name.length < 5;
// })
//
// console.log(shortsName)


//map

// const answers = ['Ivan','AnnA','Hello'];
// const result = answers.map(item => item.toLowerCase())
// console.log(result)
// console.log(answers)
//Так же мы можем перезаписать массив, но не стоит этого делать лучше создавать новый массив

// let answers = ['Ivan','AnnA','Hello'];
//
// answers = answers.map(item=> item.toLowerCase())
// console.log(answers)


// every/some возвращает boolean значение
//
// const some = [4,'asd','dsd'];
// console.log(some.some(item=>{return typeof(item) === "boolean"}))

// const some = [4,2,12];
// console.log(some.every(item=>{return typeof(item) === "number"}))

// reduce схлопывает/собирает массив в одно целое

// const arr = [4,5,1,3,2,6];
//                                 // 0       4
//                                 // 4       5
//                                 // 9       1
//                                 // 10      3
//                                 // 13      2
//                                 // 15      6
//                                 // 21
//
// const result = arr.reduce((sum,current)=>{
//   return   sum + current
// })
// console.log(result)

// const arr = ['apple','pear', 'plum'];
//
// const res = arr.reduce((sum,current)=>{
//     return `${sum}, ${current}`
// })
//
// console.log(res)

//Можем так же в качетсве третьего аргумента передать значение по умолчанию

// const arr = [4,5,1,3,2,6];
//                                 // 0       4
//                                 // 4       5
//                                 // 9       1
//                                 // 10      3
//                                 // 13      2
//                                 // 15      6
//                                 // 21
//
// const result = arr.reduce((sum,current)=>sum + current, 3)
// console.log(result)

// const obj = {
//     Ivan: 'person',
//     Ann: 'person',
//     dog: 'animal',
//     cat: 'animal'
// }
//
// const newArr = Object.entries(obj)
// .filter((item)=>item[1] === 'person')
// .map(item=>item[0])
//
// console.log(newArr)


//Регулярные выражения

// new RegExp('pattern', 'flags')
// /pattern/

// const ans = prompt('Как вас зовут');
// const reg = /n/ig;
// i Найти что-то вне зависимости от регистра
// g Найти несколько вхождений
// m Многостройчный режим
// console.log(ans.search(reg))

// g не работает с методом search
//
// console.log(ans.match(reg))


// const pass = prompt('Password');
//
// console.log(pass.replace(/./g,'*'))

//Если мы хотим изменить спецсимвол, его нужно экранировать

// console.log(pass.replace(/\./g,'*'))

//Все спецсимволы необходмо экранировать

// console.log('12-34-56'.replace(/-/g,':'))

//Методы, которые относятся к регулярным выражениям

// const ans = prompt('Как вас зовут');
// const reg = /n/ig;
//
// console.log(reg.test(ans))

//Классы регулярных выражений

// \d Ищем все цифры
// \w Ищем все слова
// \s Ищем все пробелы

// const ans = prompt('Введите число');
// const reg = /\d/g;
//
// console.log(ans.match(reg))

// const str = 'My name is R2B2';
// console.log(str.match(/\w\d\w\d/i))


//Обратные классы

// \D Не числа
// \W Не буквы
// \S Не пробелы

// const str = 'My name is R2B2';
// console.log(str.match(/\D/ig))


//Геттеры и сеттеры(акцессоры)

// const persone ={
//     name: 'Alex',
//     age: 22,
//
//     get userAge(){
//         return  this.age;
//     },
//     set userAge(num){
//         this.age = num
//     }
//
// }

// console.log(persone.userAge = 30)
//
// console.log(persone.userAge)
// console.log(persone)


//Инкапсуляция

// function User(name, age){
//     this.name = name;
//     this.age = age;
//     this.say = function (){
//         console.log(`Имя пользователя: ${this.name}, возраст: ${this.age}`)
//     }
// }
//
// const ivan = new User('Ivan', 22);
// console.log(ivan.name);
// console.log(ivan.age);
//
// ivan.age = 30;
// ivan.name = 'Alex';
// ivan.say()

// function User(name, age){
//     this.name = name;
//     let userAge = age;
//
//
//     this.say = function (){
//         console.log(`Имя пользователя: ${this.name}, возраст: ${userAge}`)
//     };
//     this.getAge = function (){
//         return userAge;
//     }
//     this.setAge = function (age){
//         if(typeof(age) === 'number' && age>0 && age<110){
//             userAge = age
//         }else{
//             console.log('Недопустимое значение')
//         }
//     }
// }
//
// const ivan = new User('Ivan', 22);
// console.log(ivan.name);
// console.log(ivan.getAge());
//
//
// ivan.setAge(30);
//
// ivan.setAge(300);
// console.log(ivan.getAge());
// ivan.say()

// class User{
//     constructor(name, age){
//         this.name = name;
//         this._age = age;
//     }
//
//     #surname = 'Kulay'
//
//     say = () =>{
//         console.log(`Имя пользователя: ${this.name}${this.#surname}, возраст: ${this._age}`)
//     }
//     get age(){
//         return this._age;
//     }
//     set age(age){
//         if(typeof(age) === 'number' && age>0 && age<110){
//             this._age = age
//         }else{
//             console.log('Недопустимое значение')
//         }
//     }
// }
//
// const ivan = new User('Ivan', 22);
// console.log(ivan.surname)
// ivan.age = 99
// console.log(ivan.age)

// ivan.say()


//Модули
// const number = 1;
// (function (){
//     let number = 2;
//     console.log(number)
//     console.log(number+3)
// }())
//
// console.log(number)

const user = (function (){
    const privat = function (){
        console.log('I am privat')
    };
    return{
        sayHello: privat
    };
}());

user.sayHello()
