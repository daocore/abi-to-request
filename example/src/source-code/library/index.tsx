import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { isEmpty } from "lodash";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { IChainData, getChainData } from "../chain";

type TLibrary = ethers.providers.Web3Provider | ethers.providers.InfuraProvider

interface IWeb3InfoProps {
  connected?: boolean;
  address?: string;
  chainId?: number;
  library?: TLibrary;
  networkId?: number,
  web3Modal?: Web3Modal,
  balance?: string,
  chainData?: IChainData,
  killSession?: () => void,
  toConnect?: () => void,
}

const INITIAL_STATE: IWeb3InfoProps = {
  address: "",
  library: undefined,
  connected: false,
  chainId: 1,
  networkId: 1
};

const Web3InfoContext = createContext({} as IWeb3InfoProps);

export const useWeb3Info = () => useContext(Web3InfoContext);

const getProviderOptions = () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "92bfa36874804eaf8e301cf9ea628a7e"
      }
    }
  };
  return providerOptions;
};

export const useGetWeb3Info = () => {
  const [{
    connected,
    address,
    chainId,
    library,
    networkId,
    web3Modal,
    chainData,
    balance
  }, setWeb3Info] = useState<IWeb3InfoProps>({})

  const resetApp = async () => {
    try {
      if (library instanceof ethers.providers.Web3Provider && library?.provider instanceof WalletConnectProvider) {
        library?.provider.wc?.killSession()
      }
      await web3Modal?.clearCachedProvider();
      setWeb3Info((pre) => ({ ...pre, ...INITIAL_STATE }));
    } catch (error) {
      //console.log(error)
    }
  };

  useEffect(() => {
    if (chainId) {
      const chainData = getChainData(chainId)
      setWeb3Info((pre) => ({ ...pre, chainData: chainData || null }));
    }
  }, [chainId])

  const network = React.useMemo(() => !isEmpty(chainData) ? chainData?.network : "mainnet", [chainData]);

  useEffect(() => {
    const web3Modal = new Web3Modal({
      network,
      cacheProvider: true,
      providerOptions: getProviderOptions()
    });
    setWeb3Info((pre) => ({ ...pre, web3Modal }));
  }, [network])

  useEffect(() => {
    //if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")) {
    if (web3Modal?.cachedProvider) {
      toConnect()
    }
  }, [web3Modal?.cachedProvider])

  const subscribeProvider = async (provider: any) => {
    if (!provider.on) return;
    provider.on("disconnect", () => resetApp());
    provider.on("accountsChanged", async (accounts: string[]) => {
      await setWeb3Info((pre) => ({ ...pre, address: accounts[0] }));
    });
    provider.on("chainChanged", async (chainId: string) => {
      await setWeb3Info((pre) => ({ ...pre, chainId: parseInt(chainId), networkId: parseInt(chainId) }))
    });
  };

  const toConnect = async () => {
    let library: TLibrary, address: string, chainId: number, balance: string;
    try {
      const instance: ethers.providers.ExternalProvider = await web3Modal?.connect();
      await subscribeProvider(instance);
      library = new ethers.providers.Web3Provider(instance);
      const signer = (library as TLibrary).getSigner();
      address = await signer.getAddress();
      const addressBalance = await signer.getBalance();
      balance = ethers.utils.formatUnits(addressBalance);
      const net = await library.getNetwork();
      chainId = net?.chainId;
    } catch (error) {
      console.log(error)
    }

    setWeb3Info((pre) => ({
      ...pre,
      library,
      connected: !!library,
      address,
      chainId,
      networkId: chainId,
      balance
    }));
  };

  return {
    connected,
    address,
    chainId,
    library,
    killSession: resetApp,
    toConnect,
    networkId,
    chainData,
    balance
  }
}

export const Web3InfoProvider = ({ children }: { children: ReactNode }) => {
  const web3Info = useGetWeb3Info()

  return (
    <Web3InfoContext.Provider value={{ ...web3Info }}>
      {children}
    </Web3InfoContext.Provider>
  )
}