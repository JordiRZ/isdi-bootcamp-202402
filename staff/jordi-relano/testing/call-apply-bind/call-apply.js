function Person(name, heigth) {
    this.name = name
    this.heigth = heigth
    this.family = []
    this.length = 0
}

Person.prototype.salute = function () {
    return this.name + ': Hello Im really excited cuz Im ' + this.heigth + ', also I think Im good at sports'
}

Person.prototype.party = function () {
    familyPerson = arguments

    for (var i = 0; i < familyPerson.length; i++) {
        var person = familyPerson[i];

        this.family.push(person)
    }

}

// var person = new Person('Otto', 165);
// var firstMember = new Person('Jesus', 143);
// var secondMember = new Person('Octavio', 111);
// var thirdMember = new Person('Rosa Meltroso', 45);

// var person1 = new Person('Octavio', 160);

// console.log(person1);
// console.log(person1.salute());
// console.log(person.party(firstMember, secondMember, thirdMember));

Person.prototype.calculateSum = function () {
    var nums = arguments
    var sum = 0

    for (var i = 0; i < nums.length; i++) {
        var num = nums[i];

        sum += num
    }
    return this.name + ': The sum is ' + sum + '.'
}

Person.prototype.mutate = function (callback) {
    callback.call(this);
}

Person.prototype.forEach = function (callback) {
     /*
    for (var i = 0; i < this.length; i++) {
        var value = this[i]

        callback.call(this, value)
    }
    */
    Array.prototype.forEach.call(this, callback.bind(this));
}

var p = new Person('Peter', 'Pan')

console.log(p)
console.log(p.salute())
console.log(p.saluteTo('James'))
console.log(p.calculateSum(10, 20, 30)) // 60
console.log(p.calculateSum(10, 20, 30, 40, 50)) // 150

var length = Math.floor(Math.random() * 100) + 1
var nums = []
for (var i = 0; i < length; i++) {
    var num = Math.floor(Math.random() * 100) + 1

    nums.push(num)
}
console.log(nums)
console.log(Person.prototype.calculateSum.apply(p, nums))

p.mutate(function () { this.age = 19 })
p.mutate(function () { this.country = 'UK' })
console.log(p)

var w = new Person('Wendy', 'Darling')
var pg = new Person('Pepito', 'Grillo')
var c = new Person('Campa', 'Nilla')
var j = new Person('James', 'Hook')
p.addFamily(w, pg, c, j)
console.log(p)

Array.prototype.push.call(p, 'Lambo')
Array.prototype.push.call(p, 'Ferra')
Array.prototype.push.call(p, 'Mase')
console.log(p)

p.forEach(function (car) {
    console.log(this.name + ': I have a ' + car)
})


var o = {}

Person.call(o, 'Oswald', 'Whatever')

console.log(o)
console.log(Person.prototype.salute.call(o))
console.log(Person.prototype.saluteTo.call(o, 'James'))
console.log(Person.prototype.calculateSum.call(o, 10, 20, 30))
console.log(Person.prototype.calculateSum.call(o, 10, 20, 30, 40, 50))
console.log(Person.prototype.calculateSum.apply(o, nums))

Person.prototype.mutate.call(o, function () { this.age = 19 })
Person.prototype.mutate.call(o, function () { this.country = 'UK' })
console.log(o)

var x = {}, y = {}, z = {}
Person.call(x, 'Mr X', 'Whoever')
Person.call(y, 'Ms Y', 'Whatever')
Person.call(z, 'Z Junior', 'Whoever')
Person.prototype.addFamily.call(o, x, y, z)
console.log(o)

o.length = 0
Array.prototype.push.call(o, 'Lambo')
Array.prototype.push.call(o, 'Ferra')
Array.prototype.push.call(o, 'Mase')
console.log(o)

Person.prototype.forEach.call(o, function (car) {
    console.log(this.name + ': I have a ' + car)
})

// VM2541:56 Person {name: 'Peter', surname: 'Pan', family: Array(0), length: 0}
// VM2541:57 Peter: Hello!
// VM2541:58 Peter: Hello, James!
// VM2541:59 Peter: The sum is 60.
// VM2541:60 Peter: The sum is 150.
// VM2541:69 (83) [60, 6, 61, 74, 85, 30, 3, 12, 22, 44, 88, 75, 56, 78, 92, 49, 81, 5, 85, 13, 95, 52, 1, 77, 57, 26, 33, 22, 95, 74, 96, 66, 97, 66, 16, 78, 10, 31, 53, 54, 83, 45, 37, 71, 33, 99, 55, 7, 41, 11, 30, 51, 100, 50, 51, 99, 45, 57, 69, 56, 94, 8, 95, 81, 56, 40, 38, 8, 42, 60, 72, 55, 20, 85, 33, 88, 79, 65, 58, 64, 35, 57, 60]
// VM2541:70 Peter: The sum is 4501.
// VM2541:74 Person {name: 'Peter', surname: 'Pan', family: Array(0), length: 0, age: 19, …}
// VM2541:81 Person {name: 'Peter', surname: 'Pan', family: Array(4), length: 0, age: 19, …}
// VM2541:86 Person {0: 'Lambo', 1: 'Ferra', 2: 'Mase', name: 'Peter', surname: 'Pan', family: Array(4), length: 3, age: 19, …}
// VM2541:89 Peter: I have a Lambo
// VM2541:89 Peter: I have a Ferra
// VM2541:89 Peter: I have a Mase
// VM2541:97 {name: 'Oswald', surname: 'Whatever', family: Array(0), length: 0}
// VM2541:98 Oswald: Hello!
// VM2541:99 Oswald: Hello, James!
// VM2541:100 Oswald: The sum is 60.
// VM2541:101 Oswald: The sum is 150.
// VM2541:102 Oswald: The sum is 4501.
// VM2541:106 {name: 'Oswald', surname: 'Whatever', family: Array(0), length: 0, age: 19, …}
// VM2541:113 {name: 'Oswald', surname: 'Whatever', family: Array(3), length: 0, age: 19, …}
// VM2541:119 {0: 'Lambo', 1: 'Ferra', 2: 'Mase', name: 'Oswald', surname: 'Whatever', family: Array(3), length: 3, age: 19, …}
// VM2541:122 Oswald: I have a Lambo
// VM2541:122 Oswald: I have a Ferra
// VM2541:122 Oswald: I have a Mase
//undefined

