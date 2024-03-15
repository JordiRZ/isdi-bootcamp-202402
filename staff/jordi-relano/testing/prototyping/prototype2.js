function Transport(brand, model, year) {
    this.brand = brand
    this.model = model
    this.year = year
    this.moving = false
}

Transport.prototype.move = function () {
    this.moving = true
}

Transport.prototype.stop = function () {
    this.moving = false
}

function Bike(brand, model, year) {
    this.brand = brand
    this.model = model
    this.year = year
    this.moving = false
}

Bike.prototype = new Transport

function Moto(brand, model, year) {
    this.brand = brand
    this.model = model
    this.year = year
    this.moving = false
}

Moto.prototype = new Transport

function Car(brand, model, year) {
    this.brand = brand
    this.model = model
    this.year = year
    this.moving = false
}

Car.prototype = new Transport


var bike = new Bike('Decathlon', 'Hyper Speed', 2024)
var moto = new Moto('Honda', 'CBR', 2000)
var car = new Car('Citroen', 'CV', 1970)
// Transport { brand: undefined, model: undefined, year: undefined, moving: false }
bike
// Bike { brand: 'Decathlon', model: 'Hyper Speed', year: 2024, moving: false }
moto
// Moto { brand: 'Honda', model: 'CBR', year: 2000, moving: false }
car
// Car { brand: 'Citroen', model: 'CV', year: 1970, moving: false }