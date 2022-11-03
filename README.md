# json-qs-converter
**json-qs-converter** It is a method that allows to transform a json object to a valid string to be used in a GET request.

## Install
```$ npm install json-qs-converter```

## Usage
Its use is very simple, just import the method and pass the json object as a parameter to obtain the string.
```
const qs = require('json-qs-converter')

const obj = { group: 'category' }
const obj2 = { projects: { new_total: 1 } }
const obj3 = { projects: { new_total: ['qty', { multiply: [2, 2] }] } }
const obj4 = { projects: { new_total: 1 }, sum: { projects: { new_total: ['qty', { multiply: [2, 2] }] } } }

let str = qs(obj) // => ?group=category

str = qs(obj2) // => ?projects[new_total]=1

str = qs(obj3) // => ?projects[new_total]=qty&projects[new_total][1][multiply]=2&projects[new_total][1][multiply]=2

str = qs(obj2) // => ?projects[new_total]=1&sum[projects][new_total]=qty&sum[projects][new_total][1][multiply]=2&sum[projects][new_total][1][multiply]=2
```

## Note
The method does not yet support multidimensional arrays.