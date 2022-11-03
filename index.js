function isObject(val) {
    if (val === null) return false
    if (Array.isArray(val)) return false
    if (typeof val == 'object') return true
    return false
}

function getStrRequest(element, str, pattern) {
    for (let key in element) {
        let nested = pattern

        if (isObject(element[key])) {
            if (nested.length) {
                nested = `${nested}[${key}]`
            } else {
                nested = key
            }

            str = getStrRequest(element[key], str, nested)
        } else if (Array.isArray(element[key])) {
            element[key].forEach((item, i) => {
                let arrayPattern = pattern

                if (Array.isArray(item)) throw 'The method do not accept a multidimensional array.'
                if (isObject(item)) {
                    if (arrayPattern.length) {
                        arrayPattern = `${arrayPattern}[${key}][${i}]`
                    } else {
                        arrayPattern = `${key}[${i}]`
                    }
        
                    str = getStrRequest(item, str, arrayPattern)
                } else {
                    if (str.length) str += '&'
                    str += `${arrayPattern}${arrayPattern.length ? `[${key}]` : key}=${item}`
                }
            })
        } else {
            if (str.length) str += '&'
            str += `${pattern}${pattern.length ? `[${key}]` : key}=${element[key]}`
        }
    }

    return str
}

function buildStrRequest(element) {
    try {
        let str = ''
        let pattern = ''
        str = getStrRequest(element, str, pattern)

        return `?${str}`
    } catch (error) {
        console.log(error)
    }
}

module.exports = buildStrRequest