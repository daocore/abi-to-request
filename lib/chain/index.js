var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
import * as tsSupportedChains from "./chains.json";
export var supportedChains = (_a = tsSupportedChains) === null || _a === void 0 ? void 0 : _a.default;
export function getChainData(chainId) {
    var chainData = supportedChains[parseInt(String(chainId))] || supportedChains[String(chainId)];
    var API_KEY = process.env.REACT_APP_INFURA_ID;
    if ((chainData === null || chainData === void 0 ? void 0 : chainData.rpc.includes("infura.io")) &&
        (chainData === null || chainData === void 0 ? void 0 : chainData.rpc.includes("%API_KEY%")) &&
        API_KEY) {
        var rpcUrl = chainData.rpc[0] && chainData.rpc[0].replace("%API_KEY%", API_KEY);
        return __assign(__assign({}, chainData), { rpc: [rpcUrl] });
    }
    return chainData;
}
//# sourceMappingURL=index.js.map