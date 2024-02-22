/**
 * Adds an element in an iterable object.
 *
 * @param object - The iterable object to mutate. 
 * @param value - The value to add.
 * 
 * @throws {TypeError} When object is not an object.
 */
function add(object, value) {

    if (!(object instanceof Object)) throw new TypeError(object + ' is not an Object')
    object[object.length] = value

    object.length++

    return object.length
}

console.log('CASE 1: add violet in colors')

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

var length = add(colors, 'violet')

console.log(length)
// 4

console.log(colors)
/*
{
    0: 'red',
    1: 'blue',
    2: 'green',
    3: 'violet',
    length: 4
}
*/

console.log('CASE 2: add undefined valor in position 2')

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

var length = add(colors, undefined)

console.log(length)
// 4

console.log(colors)
/*
{
    0: 'red',
    1: 'blue',
    2: 'green',
    3: undefined,
    length: 4
}
*/


console.log('CASE 3: add  valor in position 2')

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

var length = add(colors, undefined)

console.log(length)
// 4

console.log(colors)
/*
{
    0: 'red',
    1: 'blue',
    2: 'green',
    3: undefined,
    length: 4
}
*/

try {
    add(colors, 0)
} catch (error) {
    console.log(error)
    // TypeError: undefined is not a Number
}
try {
    add(colors)
} catch (error) {
    console.log(error)
    // TypeError: undefined is not undefined
}