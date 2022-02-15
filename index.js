const convertedBigNumber = function (obj) {
    let newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
        return getNumberStr(obj)
    } else {
        for (let i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? convertedBigNumber(obj[i]) : getNumberStr(obj[i]);
        }
    }
    return newobj;
};

const getNumberStr = (bigNumber) => {
    if (bigNumber && typeof bigNumber === "number") {
        return String(bigNumber)
    }
    return bigNumber
}

const a = {
    b: {
        c: "d",
        e: 1,
        d: true,
        f: {
            h: [true, false, 1, "fda"],
        }
    },
    g: [1, 2, 3, 4],
    h: 1,
    i: true,
    j: "true"
}
console.log(convertedBigNumber(a))