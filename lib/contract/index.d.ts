import { ReactNode, Dispatch } from "react";
import Web3 from "web3";
import { AbiItem } from 'web3-utils';
import { ContractInterface, ethers } from "ethers";
import { Dictionary } from "lodash";
import { Contract } from 'web3-eth-contract';
import { IHandleRequest } from "../request";
export declare type TEthersContract = ethers.Contract;
export declare type TWeb3Contract = Contract;
export declare type TContract = (TEthersContract | TWeb3Contract) & {
    sendAccount: string;
};
declare type TContractRequestContext<K> = {
    contracts: Dictionary<TContract>;
    setContracts: Dispatch<React.SetStateAction<Dictionary<TContract>>>;
    transactionHook?: IHandleRequest<K>;
};
export declare const ContractRequestContext: import("react").Context<{}>;
export declare const useContractRequest: <K>() => TContractRequestContext<K>;
export declare type TLibrary = Web3 | ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider | ethers.providers.InfuraProvider | undefined;
export declare type TAbiItem = {
    contractName: string;
    abi: AbiItem | ContractInterface;
    networkId?: string | number;
    chainId?: string | number;
    address?: string;
    frame: "truffle" | "hardhat" | "general";
    netName?: string;
};
export declare type TAbisData = {
    contractList: Dictionary<string>;
    abis: TAbiItem[];
};
export declare const ContractRequestContextProvider: <T>({ children, library, abis, transactionHook }: {
    children: ReactNode;
    library: Web3 | ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider | ethers.providers.InfuraProvider | undefined;
    abis: TAbiItem[];
    transactionHook?: Omit<IHandleRequest<T>, "isGlobalTransactionHookValid">;
}) => JSX.Element;
export {};
