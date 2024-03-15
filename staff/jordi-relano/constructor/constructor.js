function Car(brand, model) {
    this.brand = brand
    this.model = model
    this.status = 'off'
    this.deposit = 0

    this.fuel = function (load) {
        this.deposit = load
    }

    this.start = function () {
        this.status = 'on'
    }

    this.stop = function () {
        this.status = 'off'
    }
}

var c1 = new Car('Ferrari', 'Testarossa')
var c2 = new Car('Seat', 'Ibiza')
var c3 = new Car('Lamborghini', 'Diablo')

var wagon = [c1, c2, c3] // new Array(c1, c2, c3)

c1.fuel(50)
console.log(c1.deposit)
// 50

c1.start()
console.log(c1.status)
// 'on'

c1.stop()
console.log(c1.status)
// 'off'
// VM987: 27 50
// VM987: 31 on
// VM987: 35 off

function Car(brand, model) {
    this.brand = brand
    this.model = model
    this.status = 'off'
    this.deposit = 0
}

Car.prototype.fuel = function (load) {
    this.deposit = load
}

Car.prototype.start = function () {
    this.status = 'on'
}

Car.prototype.stop = function () {
    this.status = 'off'
}

var c1 = new Car('Ferrari', 'Testarossa')
var c2 = new Car('Seat', 'Ibiza')
var c3 = new Car('Lamborghini', 'Diablo')

var wagon = [c1, c2, c3] // new Array(c1, c2, c3)

c1.fuel(50)
console.log(c1.deposit)
// 50

c1.start()
console.log(c1.status)
// 'on'

c1.stop()
console.log(c1.status)
// 'off'
// VM1075:27 50
// VM1075:31 on
// VM1075:35 off
// undefined
c1
// Car {brand: 'Ferrari', model: 'Testarossa', status: 'off', deposit: 50}brand: "Ferrari"deposit: 50model: "Testarossa"status: "off"[[Prototype]]: Objectfuel: ƒ (load)arguments: nullcaller: nulllength: 1name: ""prototype: {}[[FunctionLocation]]: VM1075:8[[Prototype]]: ƒ ()[[Scopes]]: Scopes[1]start: ƒ ()stop: ƒ ()constructor: ƒ Car(brand, model)[[Prototype]]: Object
c2.fuel(75)
// undefined
c2
// Car {brand: 'Seat', model: 'Ibiza', status: 'off', deposit: 75}
c3.fuel(25)
// undefined
c3
// Car {brand: 'Lamborghini', model: 'Diablo', status: 'off', deposit: 25}

function ColdWallet() {
    this._password = ''
    this._bitcoins = 0
}

ColdWallet.prototype.changePassword = function (currentPassword, newPassword) {
    if (typeof currentPassword !== 'string') throw new TypeError('currrentPassword is not a string')
    if (typeof newPassword !== 'string') throw new TypeError('newPassword is not a string')

    if (currentPassword !== this._password) throw new Error('wrong password')

    this._password = newPassword
}

ColdWallet.prototype.getBitcoins = function (password) {
    if (typeof password !== 'string') throw new TypeError('password is not a string')

    if (password !== this._password) throw new Error('wrong password')

    return this._bitcoins
}

ColdWallet.prototype.addBitcoins = function (bitcoins) {
    if (typeof bitcoins !== 'number') throw new TypeError('bitcoins is not a number')
    if (bitcoins < 0) throw new Error('bitcoins is a negative number')

    this._bitcoins += bitcoins
}


var w = new ColdWallet
w.changePassword('', '123123123')
var w2 = new ColdWallet
w2.changePassword('', '234234234')

w.addBitcoins(6)
w2.addBitcoins(4)

console.log(w.getBitcoins('123123123'))
console.log(w2.getBitcoins('234234234'))

// HACKER

var hackedBitcoins = w._bitcoins
w._bitcoins = 0
var hackedBitcoins2 = w2._bitcoins
w2._bitcoins = 0

// OWNER

console.log(w.getBitcoins('123123123'))
console.log(w2.getBitcoins('234234234'))

// 6
// 4
// 0
// 0

function newColdWallet() {
    var _password = ''
    var _bitcoins = 0

    function ColdWallet() {
    }

    ColdWallet.prototype.changePassword = function (currentPassword, newPassword) {
        if (typeof currentPassword !== 'string') throw new TypeError('currrentPassword is not a string')
        if (typeof newPassword !== 'string') throw new TypeError('newPassword is not a string')

        if (currentPassword !== _password) throw new Error('wrong password')

        _password = newPassword
    }

    ColdWallet.prototype.getBitcoins = function (password) {
        if (typeof password !== 'string') throw new TypeError('password is not a string')

        if (password !== _password) throw new Error('wrong password')

        return _bitcoins
    }

    ColdWallet.prototype.addBitcoins = function (bitcoins) {
        if (typeof bitcoins !== 'number') throw new TypeError('bitcoins is not a number')
        if (bitcoins < 0) throw new Error('bitcoins is a negative number')

        _bitcoins += bitcoins
    }

    return new ColdWallet
}


var w = newColdWallet()
w.changePassword('', '123123123')
var w2 = newColdWallet()
w2.changePassword('', '234234234')

w.addBitcoins(6)
w2.addBitcoins(4)

console.log(w.getBitcoins('123123123'))
console.log(w2.getBitcoins('234234234'))

// HACKER

var hackedBitcoins = w._bitcoins
w._bitcoins = 0
var hackedBitcoins2 = w2._bitcoins
w2._bitcoins = 0

// OWNER

console.log(w.getBitcoins('123123123'))
console.log(w2.getBitcoins('234234234'))

// 6
// 4
// 6
// 4

