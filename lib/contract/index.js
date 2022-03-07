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
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, createContext, useState, useContext } from "react";
import Web3 from "web3";
import { ethers } from "ethers";
import { isEmpty, filter } from "lodash";
export var ContractRequestContext = createContext({});
export var useContractRequest = function () { return useContext(ContractRequestContext); };
export var ContractRequestContextProvider = function (_a) {
    var children = _a.children, library = _a.library, abis = _a.abis, transactionHook = _a.transactionHook;
    var _b = useState({}), contracts = _b[0], setContracts = _b[1];
    var _c = useState(), networkId = _c[0], setNetworkId = _c[1];
    var getContract = function (library, contractInfo) { return __awaiter(void 0, void 0, void 0, function () {
        var contract, contract2, singer, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    if (!(contractInfo && contractInfo.address)) return [3, 4];
                    if (!(library instanceof Web3)) return [3, 1];
                    contract = new library.eth.Contract(contractInfo && contractInfo.abi, contractInfo && contractInfo.address);
                    return [2, contract];
                case 1:
                    contract2 = new ethers.Contract(contractInfo.address, contractInfo && contractInfo.abi, library);
                    if (!(library === null || library === void 0 ? void 0 : library.getSigner)) return [3, 3];
                    return [4, (library === null || library === void 0 ? void 0 : library.getSigner())];
                case 2:
                    singer = _b.sent();
                    contract2 = contract2.connect(singer);
                    _b.label = 3;
                case 3: return [2, contract2];
                case 4: return [3, 6];
                case 5:
                    _a = _b.sent();
                    return [3, 6];
                case 6: return [2];
            }
        });
    }); };
    var getContracts = function (library, abisFilter) { return __awaiter(void 0, void 0, void 0, function () {
        var contracts, sendAccounts, i, contract;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contracts = {};
                    sendAccounts = [];
                    if (!(library instanceof Web3)) return [3, 2];
                    return [4, (library === null || library === void 0 ? void 0 : library.eth.getAccounts())];
                case 1:
                    sendAccounts = _a.sent();
                    _a.label = 2;
                case 2:
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < abisFilter.length)) return [3, 6];
                    return [4, getContract(library, abisFilter[i])];
                case 4:
                    contract = _a.sent();
                    if (contract) {
                        contract.sendAccount = sendAccounts[0] || "";
                        contracts[abisFilter[i].contractName] = contract;
                    }
                    _a.label = 5;
                case 5:
                    i++;
                    return [3, 3];
                case 6:
                    setContracts(contracts);
                    return [2];
            }
        });
    }); };
    var subscribeProvider = function (provider) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!(provider === null || provider === void 0 ? void 0 : provider.on))
                return [2];
            provider.on("close", function () { });
            provider.on("chainChanged", function (chainId) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    setNetworkId(parseInt(chainId));
                    return [2];
                });
            }); });
            return [2];
        });
    }); };
    useEffect(function () {
        if (!library)
            return;
        if (library instanceof Web3 && (library === null || library === void 0 ? void 0 : library.currentProvider)) {
            subscribeProvider(library === null || library === void 0 ? void 0 : library.currentProvider);
        }
        if (library instanceof Web3) {
            library === null || library === void 0 ? void 0 : library.eth.getChainId().then(function (chainId) {
                setNetworkId(parseInt("".concat(chainId)));
            });
        }
        else {
            library === null || library === void 0 ? void 0 : library.getNetwork().then(function (net) {
                var chainId = net === null || net === void 0 ? void 0 : net.chainId;
                setNetworkId(parseInt("".concat(chainId)));
            });
        }
    }, [library]);
    useEffect(function () {
        if (!library || isEmpty(abis) || !networkId)
            return;
        var abisFilter = filter(abis, function (item) { return Number(item.chainId) === Number(networkId) || Number(item.networkId) === Number(networkId); });
        getContracts(library, abisFilter);
    }, [library, abis, networkId]);
    return (_jsx(ContractRequestContext.Provider, __assign({ value: { contracts: contracts, setContracts: setContracts, transactionHook: transactionHook } }, { children: children }), void 0));
};
//# sourceMappingURL=index.js.map