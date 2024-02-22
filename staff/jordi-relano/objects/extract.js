function extract(object, callback) {
    var newObject = {}

    if (!(object instanceof Object)) { 
        throw new TypeError(object + ' is not an Object')
    }
    debugger
    for (let i = 0; i < object.length; i++) {
        if(callback(object[i]) === true){
            newObject = object[i]
            delete object[i]
            object.length -- 

        }
    }
    return newObject
}   

//console.log('CASE 1: extract user pepito form users')

var users = {
    0: { name: 'Wendy', age: 19 },
    1: { name: 'Peter', age: 20 },
    2: { name: 'Pepito', age: 50 },
    3: { name: 'Campa', age: 30 },
    4: { name: 'James', age: 40 },
    length: 5
}

var user = extract(users, function (user) {
    return user.name === 'Pepito'
})

console.log(user)
// { name: 'Pepito', age: 50 }

console.log(users)
/*
{
    0: { name: 'Wendy', age: 19 },
    1: { name: 'Peter', age: 20 },
    2: { name: 'Campa', age: 30 },
    3: { name: 'James', age: 40 },
    length: 4
}
*/

try {
    add(0)
} catch (error) {
    console.log(error)
    // TypeError: undefined is not a Number
}
try {
    add()
} catch (error) {
    console.log(error)
    // TypeError: undefined is not undefined
}