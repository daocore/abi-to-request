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
import React, { createContext, useState, useContext, useEffect } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { isEmpty, isUndefined } from "lodash";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { getChainData } from "../chain";
var INITIAL_STATE = {
    address: "",
    web3: undefined,
    library: undefined,
    connected: false,
    chainId: 1,
    networkId: 1
};
var Web3InfoContext = createContext({});
export var useWeb3Info = function () { return useContext(Web3InfoContext); };
var getProviderOptions = function () {
    var providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "96f99379cbad4a22a3904f9082b58792"
            }
        }
    };
    return providerOptions;
};
export var useGetWeb3Info = function (defaultNetwork) {
    var _a = useState({}), _b = _a[0], connected = _b.connected, address = _b.address, chainId = _b.chainId, web3 = _b.web3, library = _b.library, networkId = _b.networkId, web3Modal = _b.web3Modal, chainData = _b.chainData, balance = _b.balance, setWeb3Info = _a[1];
    var resetApp = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (library instanceof ethers.providers.Web3Provider && (library === null || library === void 0 ? void 0 : library.provider) instanceof WalletConnectProvider) {
                        (_a = library === null || library === void 0 ? void 0 : library.provider.wc) === null || _a === void 0 ? void 0 : _a.killSession();
                    }
                    return [4, (web3Modal === null || web3Modal === void 0 ? void 0 : web3Modal.clearCachedProvider())];
                case 1:
                    _b.sent();
                    setWeb3Info(function (pre) { return (__assign(__assign({}, pre), INITIAL_STATE)); });
                    return [3, 3];
                case 2:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); };
    useEffect(function () {
        if (chainId) {
            var chainData_1 = getChainData(chainId);
            setWeb3Info(function (pre) { return (__assign(__assign({}, pre), { chainData: chainData_1 || null })); });
        }
    }, [chainId]);
    var network = React.useMemo(function () { return !isEmpty(chainData) ? chainData === null || chainData === void 0 ? void 0 : chainData.network : "mainnet"; }, [chainData]);
    useEffect(function () {
        var web3Modal = new Web3Modal({
            network: network,
            cacheProvider: true,
            providerOptions: getProviderOptions()
        });
        setWeb3Info(function (pre) { return (__assign(__assign({}, pre), { web3Modal: web3Modal })); });
    }, [network]);
    useEffect(function () {
        if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")) {
            if (web3Modal === null || web3Modal === void 0 ? void 0 : web3Modal.cachedProvider) {
                toConnect();
            }
        }
        else {
            toConnect(false);
        }
    }, [web3Modal === null || web3Modal === void 0 ? void 0 : web3Modal.cachedProvider]);
    var subscribeProvider = function (provider) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!provider.on)
                return [2];
            provider.on("close", function () { return resetApp(); });
            provider.on("accountsChanged", function (accounts) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, setWeb3Info(function (pre) { return (__assign(__assign({}, pre), { address: accounts[0] })); })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            }); });
            provider.on("chainChanged", function (chainId) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, setWeb3Info(function (pre) { return (__assign(__assign({}, pre), { chainId: parseInt(chainId) })); })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            }); });
            provider.on("networkChanged", function (networkId) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, setWeb3Info(function (pre) { return (__assign(__assign({}, pre), { networkId: parseInt(networkId) })); })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            }); });
            return [2];
        });
    }); };
    var getLibrary = function () {
        if (process.env.NODE_ENV === "production") {
            return new ethers.providers.InfuraProvider(defaultNetwork || 'mainnet');
        }
        else {
            return ethers.getDefaultProvider(defaultNetwork || "http://127.0.0.1:8546");
        }
    };
    var toConnect = function (defaultProvider) { return __awaiter(void 0, void 0, void 0, function () {
        var library, address, chainId, balance, instance, signer, addressBalance, error_2, net;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isUndefined(defaultProvider)) return [3, 8];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4, (web3Modal === null || web3Modal === void 0 ? void 0 : web3Modal.connect())];
                case 2:
                    instance = _a.sent();
                    return [4, subscribeProvider(instance)];
                case 3:
                    _a.sent();
                    library = new ethers.providers.Web3Provider(instance);
                    signer = library.getSigner();
                    return [4, signer.getAddress()];
                case 4:
                    address = _a.sent();
                    return [4, signer.getBalance()];
                case 5:
                    addressBalance = _a.sent();
                    balance = ethers.utils.formatUnits(addressBalance);
                    return [3, 7];
                case 6:
                    error_2 = _a.sent();
                    library = getLibrary();
                    return [3, 7];
                case 7: return [3, 9];
                case 8:
                    library = getLibrary();
                    _a.label = 9;
                case 9: return [4, library.getNetwork()];
                case 10:
                    net = _a.sent();
                    chainId = net === null || net === void 0 ? void 0 : net.chainId;
                    setWeb3Info(function (pre) { return (__assign(__assign({}, pre), { library: library, connected: true, address: address, chainId: chainId, networkId: chainId, balance: balance })); });
                    return [2];
            }
        });
    }); };
    return {
        connected: connected,
        address: address,
        chainId: chainId,
        library: library,
        killSession: resetApp,
        toConnect: toConnect,
        web3: web3,
        networkId: networkId,
        chainData: chainData,
        balance: balance
    };
};
export var Web3InfoProvider = function (_a) {
    var children = _a.children, defaultNetwork = _a.defaultNetwork;
    var web3Info = useGetWeb3Info(defaultNetwork);
    return (_jsx(Web3InfoContext.Provider, __assign({ value: __assign({}, web3Info) }, { children: children }), void 0));
};
//# sourceMappingURL=index.js.map