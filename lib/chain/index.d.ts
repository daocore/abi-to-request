import { Dictionary } from "lodash";
export interface IAssetData {
    symbol: string;
    name: string;
    decimals: string | number;
    contractAddress?: string;
    balance?: string;
}
export interface IChainData {
    name: string;
    shortName: string;
    chain: string;
    network?: string;
    chainId: number;
    networkId: number;
    rpc: string[];
    nativeCurrency: IAssetData;
    icon?: string;
    faucets?: string[];
    infoURL?: string;
    slip44?: number | string;
    ens?: any;
    explorers?: any;
    title?: string;
    parent?: any;
}
export declare type TChainObj = Dictionary<IChainData>;
export declare const supportedChains: TChainObj;
export declare function getChainData(chainId: number): IChainData;
