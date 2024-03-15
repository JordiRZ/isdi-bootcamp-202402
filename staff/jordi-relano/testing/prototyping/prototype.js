function Transport() {
    this.moving = false
}




Transport.prototype.move = function () {
    this.moving = true
}




Transport.prototype.stop = function () {
    this.moving = false
}




function Bike() {
}

Bike.prototype = new Transport

function Moto() {
}


Moto.prototype = new Transport


function Car() {
}

Car.prototype = new Transport

var bike = new Bike

var moto = new Moto

var car = new Car

// Transport { moving: false }

car.move()

// undefined

car.moving

// true

car.stop()

// undefined

car.moving

// falsefunction Transport() {
//     this.moving = false
// }

Transport.prototype.move = function () {
    this.moving = true
}

Transport.prototype.stop = function () {
    this.moving = false
}

function Bike() {
}

Bike.prototype = new Transport

function Moto() {
}

Moto.prototype = new Transport

function Car() {
}

Car.prototype = new Transport


var bike = new Bike
var moto = new Moto
var car = new Car
// Transport { moving: false }
car.move()
// undefined
car.moving
// true
car.stop()
// undefined
car.moving
// false