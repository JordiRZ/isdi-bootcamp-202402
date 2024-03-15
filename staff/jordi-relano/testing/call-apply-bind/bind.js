var o = { name: 'Oswald', age: 40 }
var p = { name: 'Peter', age: 30 }
var q = { name: 'Quency', age: 50 }

function printMe() {
    var object = this

    console.log('Object')

    var keys = Object.keys(object)

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]

        var value = object[key]

        console.log('- ' + key + ': ' + value)
    }
}

//printMe.call(o)
// Object
// - name: Oswald
// - age: 40

//o.printMe = printMe
//o.printMe()

//p.printMe = printMe
//p.printMe()

//console.assert(o.printMe === p.printMe)

//var printO = printMe.bind(o)
//printO()

/*
function bind(func, ctx) {
    return function() {
        func.call(ctx)
    }
}
*/
//var printO = bind(printMe, o)
//printO()
//var printP = bind(printMe, p)
//printP()

function saluteTo() {
    var object = this

    //var people = Array.prototype.reduce.call(arguments, function(people, person) { return people += ', ' + person }, '')
    //var salute = object.name + ': Hello' + people + '!'

    var people = Array.prototype.join.call(arguments, ', ')
    var salute = object.name + ': Hello, ' + people + '!'

    return salute
}

//saluteTo.call(o, 'Wendy')
//var oSaluteTo = saluteTo.bind(o)
//oSaluteTo('Wendy')

/*
function bind(func, ctx) {
    return function() {
        func.apply(ctx, arguments)
    }
}
*/

/*
function bind(func, ctx) {
    return function() {
        return func.apply(ctx, arguments)
        //return func.call(ctx, ...arguments) // ES6
    }
}
*/

function bind(func, ctx) {
    function binded() {
        return func.apply(ctx, arguments)
        //return func.call(ctx, ...arguments) // ES6
    }

    binded.unbind = function () {
        return func
    }

    return binded
}

//var oSaluteTo = saluteTo.bind(o)
var oSaluteTo = bind(saluteTo, o)
console.log(oSaluteTo('Wendy', 'Peter'))

//var pSaluteTo = saluteTo.bind(p)
var pSaluteTo = bind(saluteTo, p)
console.log(pSaluteTo('Oswald', 'Wendy'))

//var qSaluteTo = oSaluteTo.bind(q)
//var qSaluteTo = bind(oSaluteTo, q)
var saluteTo2 = oSaluteTo.unbind()
var qSaluteTo = bind(saluteTo2, q)
console.log(qSaluteTo('Wendy', 'Peter', 'Oswald'))

// VM1176:97 Oswald: Hello, Wendy, Peter!
// VM1176:101 Peter: Hello, Oswald, Wendy!
// VM1176:107 Quency: Hello, Wendy, Peter, Oswald!
// undefined