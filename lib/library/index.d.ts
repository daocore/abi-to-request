import { ReactNode } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { IChainData } from "../chain";
declare type TLibrary = ethers.providers.Web3Provider | ethers.providers.InfuraProvider;
interface IWeb3InfoProps {
    connected?: boolean;
    address?: string;
    chainId?: number;
    library?: TLibrary;
    networkId?: number;
    web3Modal?: Web3Modal;
    balance?: string;
    chainData?: IChainData;
    killSession?: () => void;
    toConnect?: () => void;
}
export declare const useWeb3Info: () => IWeb3InfoProps;
export declare const useGetWeb3Info: () => {
    connected: boolean;
    address: string;
    chainId: number;
    library: TLibrary;
    killSession: () => Promise<void>;
    toConnect: () => Promise<void>;
    networkId: number;
    chainData: IChainData;
    balance: string;
};
export declare const Web3InfoProvider: ({ children }: {
    children: ReactNode;
}) => JSX.Element;
export {};
