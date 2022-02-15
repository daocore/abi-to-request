import { useEffect, createContext, ReactNode, useState, useContext, Dispatch } from "react";
import Web3 from "web3";
import { AbiItem } from 'web3-utils';
import { ContractInterface, ethers } from "ethers"
import { TContract } from "./request";
import { Dictionary } from "lodash";
import { isEmpty, filter } from "lodash";

export const ContractRequestContext = createContext(
    {} as {
        contracts?: Dictionary<TContract>;
        setContracts: Dispatch<React.SetStateAction<Dictionary<TContract> | undefined>>;
    },
);

export const useContractRequest = () => useContext(ContractRequestContext);

export type TLibrary = Web3 | ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider | ethers.providers.InfuraProvider | undefined
export type TAbiItem = {
    contractName: string,
    abi: AbiItem | ContractInterface,
    networkId?: string | number,
    chainId?: string | number,
    address?: string,
    frame: "truffle" | "hardhat",
    netName?: string
}

export type TAbisData = { contractList: Dictionary<string>, abis: TAbiItem[] }

export const ContractRequestContextProvider = ({ children, library, abis }: { children: ReactNode, library: Web3 | ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider | ethers.providers.InfuraProvider | undefined, abis: TAbiItem[] }) => {
    const [contracts, setContracts] = useState<{ [key in string]?: TContract }>({});
    const [networkId, setNetworkId] = useState<number>();

    const getContract = async (library: TLibrary, contractInfo: TAbiItem) => {
        try {
            if (contractInfo && contractInfo.address) {
                if (library instanceof Web3) {
                    const contract = new library.eth.Contract(
                        contractInfo && contractInfo.abi as unknown as AbiItem[],
                        contractInfo && contractInfo.address
                    );
                    return contract
                } else {
                    let contract2 = new ethers.Contract(
                        contractInfo.address,
                        contractInfo && contractInfo.abi as ContractInterface,
                        library as any
                    );
                    if (library?.getSigner) {
                        const singer = await library?.getSigner()
                        contract2 = contract2.connect(singer as any);
                    }
                    return contract2
                }
            }
        } catch {
            //setContracts(undefined)
        }
    }

    const getContracts = async (library: TLibrary, abis: TAbiItem[]) => {
        const contracts = {};
        for (let i = 0; i < abis.length; i++) {
            const contract = await getContract(library, abis[i])
            contracts[abis[i].contractName] = contract
        }
        setContracts(contracts)
    }

    const subscribeProvider = async (provider: any) => {
        if (!provider?.on) return;
        provider.on("close", () => { });
        provider.on("chainChanged", async (chainId: string) => {
            setNetworkId(parseInt(chainId))
        });
    };

    useEffect(() => {
        if (!library) return
        if (library instanceof Web3 && library?.currentProvider) {
            subscribeProvider(library?.currentProvider)
        }

        if (library instanceof Web3) {
            library?.eth.getChainId().then(chainId => {
                setNetworkId(parseInt(`${chainId}`))
            })
        } else {
            library?.getNetwork().then(net => {
                const chainId = net?.chainId;
                setNetworkId(parseInt(`${chainId}`))
            })
        }
    }, [library])

    useEffect(() => {
        if (!library || isEmpty(abis) || !networkId) return
        const abisFilter = filter(abis, item => Number(item.chainId || item.networkId) === Number(networkId))
        getContracts(library, abisFilter)
    }, [library, abis, networkId])

    return (
        <ContractRequestContext.Provider value={{ contracts, setContracts }}>
            {children}
        </ContractRequestContext.Provider>
    )
}