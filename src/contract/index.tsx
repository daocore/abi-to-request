import { useEffect, createContext, ReactNode, useState, useContext, Dispatch, useMemo } from "react";
import Web3 from "web3";
import { AbiItem } from 'web3-utils';
import { ContractInterface, ethers } from "ethers"
import { Dictionary, isEmpty, filter } from "lodash";
import { Contract } from 'web3-eth-contract';
import { IHandleRequest } from "../request";

export type TEthersContract = ethers.Contract;
export type TWeb3Contract = Contract;

export type TContract = (TEthersContract | TWeb3Contract) & { sendAccount: string }

type TContractRequestContext<K> = {
    contracts: Dictionary<TContract>;
    setContracts: Dispatch<React.SetStateAction<Dictionary<TContract>>>;
    transactionHook?: IHandleRequest<K>
}

export const ContractRequestContext = createContext({});

export const useContractRequest = <K,>() => useContext(ContractRequestContext) as TContractRequestContext<K>;

export type TLibrary = Web3 | ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider | ethers.providers.InfuraProvider | undefined
export type TAbiItem = {
    contractName: string,
    abi: AbiItem | ContractInterface,
    networkId?: string | number,
    chainId?: string | number,
    address?: string,
    frame: "truffle" | "hardhat" | "general",
    netName?: string
}

export type TAbisData = { contractList: Dictionary<string>, abis: TAbiItem[] }

export const ContractRequestContextProvider = <T,>({
    children,
    library,
    abis,
    transactionHook
}: {
    children: ReactNode,
    library: Web3 | ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider | ethers.providers.InfuraProvider | undefined,
    abis?: TAbiItem[],
    transactionHook?: Omit<IHandleRequest<T>, "isGlobalTransactionHookValid">
}) => {
    const [contracts, setContracts] = useState<{ [key in string]: TContract }>({});
    const [networkId, setNetworkId] = useState<number>();
    const abisData: TAbiItem[] = useMemo(() => isEmpty(abis) || !abis ? require("./abis") : abis, [abis])

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

    const getContracts = async (library: TLibrary, abisFilter: TAbiItem[]) => {
        const contracts: { [key in string]: TContract } = {};
        let sendAccounts: string[] = []
        if (library instanceof Web3) {
            sendAccounts = await library?.eth.getAccounts()
        }

        for (let i = 0; i < abisFilter.length; i++) {
            const contract = await getContract(library, abisFilter[i])
            if (contract) {
                (contract as TContract).sendAccount = sendAccounts[0] || ""
                contracts[abisFilter[i].contractName] = contract as TContract
            }
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
        if (!library || isEmpty(abisData) || !networkId) return
        const abisFilter = filter(abisData, item => Number(item.chainId || item.networkId) === Number(networkId))
        getContracts(library, abisFilter)
    }, [library, abisData, networkId])

    return (
        <ContractRequestContext.Provider value={{ contracts, setContracts, transactionHook }}>
            {children}
        </ContractRequestContext.Provider>
    )
}