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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useCallback, useEffect, useState } from "react";
import { lowerFirst } from "lodash";
import { useContractRequest } from "../contract";
var handleTransactionHook = function (handle, globalHandle, arg, isGlobalTransactionHookValid) {
    if (isGlobalTransactionHookValid || (!handle && isGlobalTransactionHookValid === undefined)) {
        globalHandle && globalHandle(arg);
    }
    handle && handle(arg);
};
var useRequestContract = function (fetch, _a, rely) {
    var _b = _a === void 0 ? {} : _a, onSuccessBefore = _b.onSuccessBefore, onTransactionSuccess = _b.onTransactionSuccess, onSuccess = _b.onSuccess, onFail = _b.onFail, onFinish = _b.onFinish, isValid = _b.isGlobalTransactionHookValid;
    if (rely === void 0) { rely = []; }
    var _c = useContractRequest(), contracts = _c.contracts, transactionHook = _c.transactionHook;
    return useCallback(function (arg) { return __awaiter(void 0, void 0, void 0, function () {
        var contractName, functionName, contract, name, res, error_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!contracts)
                        return [2];
                    contractName = fetch.name.split("_")[0];
                    functionName = lowerFirst(fetch.name.split("_")[1]);
                    contract = contracts[contractName];
                    if (!contract)
                        return [2];
                    name = { functionName: functionName, contractName: contractName };
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    handleTransactionHook(onSuccessBefore, transactionHook === null || transactionHook === void 0 ? void 0 : transactionHook.onSuccessBefore, name, isValid);
                    return [4, fetch(contract, arg)];
                case 2:
                    res = _d.sent();
                    if ((_a = res) === null || _a === void 0 ? void 0 : _a.wait) {
                        (_b = res) === null || _b === void 0 ? void 0 : _b.wait().then(function (receipt) {
                            handleTransactionHook(onTransactionSuccess, transactionHook === null || transactionHook === void 0 ? void 0 : transactionHook.onTransactionSuccess, __assign(__assign({}, name), { data: receipt }), isValid);
                        });
                    }
                    if (((_c = res) === null || _c === void 0 ? void 0 : _c.status) !== undefined) {
                        handleTransactionHook(onTransactionSuccess, transactionHook === null || transactionHook === void 0 ? void 0 : transactionHook.onTransactionSuccess, __assign(__assign({}, name), { data: res }), isValid);
                    }
                    handleTransactionHook(onSuccess, transactionHook === null || transactionHook === void 0 ? void 0 : transactionHook.onSuccess, __assign(__assign({}, name), { data: res }), isValid);
                    handleTransactionHook(onFinish, transactionHook === null || transactionHook === void 0 ? void 0 : transactionHook.onFinish, __assign(__assign({}, name), { data: res }), isValid);
                    return [2, { successValue: res }];
                case 3:
                    error_1 = _d.sent();
                    handleTransactionHook(onFail, transactionHook === null || transactionHook === void 0 ? void 0 : transactionHook.onFail, __assign(__assign({}, name), { data: error_1 }), isValid);
                    handleTransactionHook(onFinish, transactionHook === null || transactionHook === void 0 ? void 0 : transactionHook.onFinish, __assign(__assign({}, name), { data: error_1 }), isValid);
                    return [2, { failError: error_1 }];
                case 4: return [2];
            }
        });
    }); }, __spreadArray([contracts], rely, true));
};
export var useRequest = function (fetch, option, rely) {
    if (option === void 0) { option = {}; }
    if (rely === void 0) { rely = []; }
    var _a = useState(), returnValue = _a[0], setReturnValue = _a[1];
    var contracts = useContractRequest().contracts;
    var setFun = useRequestContract(fetch, __assign(__assign({}, option), { onSuccess: function (arg) {
            setReturnValue(arg === null || arg === void 0 ? void 0 : arg.data);
            (option === null || option === void 0 ? void 0 : option.onSuccess) && (option === null || option === void 0 ? void 0 : option.onSuccess(arg));
        } }), rely);
    var contractName = fetch.name.split("_")[0];
    var contract = contracts && contracts[contractName] ? contracts[contractName] : undefined;
    var writeFun = useCallback(function (params) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, setFun(__assign(__assign({}, ((option === null || option === void 0 ? void 0 : option.arg) ? option === null || option === void 0 ? void 0 : option.arg : {})), (params ? params : {})))];
                case 1: return [2, _a.sent()];
            }
        });
    }); }, [contract, setFun, option === null || option === void 0 ? void 0 : option.arg]);
    return [writeFun, returnValue];
};
export var useImmediateReadContractRequest = function (fetch, option, rely) {
    if (option === void 0) { option = {}; }
    if (rely === void 0) { rely = []; }
    var _a = useState(), returnValue = _a[0], setReturnValue = _a[1];
    var contracts = useContractRequest().contracts;
    var getData = useRequestContract(fetch, __assign(__assign({}, option), { isGlobalTransactionHookValid: option.isGlobalTransactionHookValid === undefined ? false : option.isGlobalTransactionHookValid, onSuccess: function (arg) {
            setReturnValue(arg === null || arg === void 0 ? void 0 : arg.data);
            (option === null || option === void 0 ? void 0 : option.onSuccess) && (option === null || option === void 0 ? void 0 : option.onSuccess(arg));
        } }));
    var contractName = fetch.name.split("_")[0];
    var contract = contracts && contracts[contractName] ? contracts[contractName] : undefined;
    useEffect(function () {
        if (!contract)
            return;
        getFun();
    }, [contract]);
    var getFun = useCallback(function (params) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, getData(__assign(__assign({}, ((option === null || option === void 0 ? void 0 : option.arg) ? option === null || option === void 0 ? void 0 : option.arg : {})), (params ? params : {})))];
                case 1: return [2, _a.sent()];
            }
        });
    }); }, __spreadArray([contract, getData, option === null || option === void 0 ? void 0 : option.arg], rely, true));
    return [returnValue, getFun];
};
//# sourceMappingURL=index.js.map