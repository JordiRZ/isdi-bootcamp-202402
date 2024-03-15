var countValue = 0

function count() {
    var step = 1

    countValue += step

    return countValue
}

console.log(count())
// 1

function counter() {
    var countValue = 0

    function count() {
        var step = 1

        countValue += step

        return countValue
    }

    return count
}

var count = counter()

console.log(count())
console.log(count())
console.log(count())

// VM1351:17 1
// VM1351:18 2
// VM1351:19 3

function counter() {
    var countValue = 0

    function count() {
        var step = 1

        countValue += step

        return countValue
    }

    return count
}

var count = counter()
var count2 = counter()

console.log(count())
console.log(count(), count2())
console.log(count())
console.log(count(), count2())

// VM1420:18 1
// VM1420:19 2 1
// VM1420:20 3
// VM1420:21 4 2


function counter() {
    var countValue = 0

    function count() {
        var step = 1

        countValue += step

        return countValue
    }

    return count
}

var count = counter()
var count2 = counter()

console.log(count())
console.log(count(), count2())
console.log(count())
console.log(count(), count2())

// VM1420:18 1
// VM1420:19 2 1
// VM1420:20 3
// VM1420:21 4 2

function safeBox(password, secret) {
    return function (password2) {
        if (password2 !== password) throw new Error('wrong password')

        return secret
    }
}

var getSecret = safeBox('123123123', 'Jordi es Chris Martin')

try {
    getSecret('234234234')
} catch (error) {
    console.error(error)
}

getSecret('123123123')

// VM1717:14 Error: wrong password
//     at <anonymous>:3:43
//     at <anonymous>:12:5
// (anonymous) @ VM1717:14

// 'Jordi es Chris Martin'

