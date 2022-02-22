import { BigNumber } from "ethers";
export var convertedBigNumber = function (obj) {
    var newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object' || obj instanceof BigNumber) {
        return getNumberStr(obj);
    }
    else {
        for (var i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? convertedBigNumber(obj[i]) : getNumberStr(obj[i]);
        }
    }
    return newobj;
};
export var getNumberStr = function (bigNumber) {
    if (bigNumber && bigNumber instanceof BigNumber) {
        return bigNumber.toString();
    }
    return bigNumber;
};
//# sourceMappingURL=index.js.map