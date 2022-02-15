import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { Contract } from 'web3-eth-contract';
import { useContractRequest } from "./contract";

export interface IHandle<K> {
    onSuccess?: (arg?: K) => void,
    onFail?: (arg?: any) => void
}

export type TEthersContract = ethers.Contract;
export type TWeb3Contract = Contract;

export type TContract = TEthersContract | TWeb3Contract

export const useAbiToRequest = <T, K>(
    fetch: (contract: TContract, arg?: T) => Promise<K>,
    {
        onSuccess,
        onFail
    }: IHandle<K> = {},
    rely: any[] = []
) => {
    const { contracts } = useContractRequest()

    return useCallback(async (arg?: T) => {
        if (!contracts) return
        const contractName = fetch.name.split("_")[0]
        const contract = contracts[contractName];
        if (!contract) return
        try {
            const res = await fetch(contract, arg)
            onSuccess && onSuccess(res)
        } catch (error) {
            onFail && onFail(error)
        }
    }, [contracts, ...rely])
}

export const useGetDataAbiToRequest = <T, K>(fetch: (contract: TContract, arg?: T) => Promise<K>, arg?: T) => {
    const [data, setData] = useState<K>();
    const { contracts } = useContractRequest()

    const getData = useAbiToRequest(fetch, { onSuccess: (res) => setData(res) })
    const contractName = fetch.name.split("_")[0];
    const contract = contracts && contracts[contractName] ? contracts[contractName] : undefined;

    useEffect(() => {
        if (!contract) return;
        getFun()
    }, [contract])

    const getFun = useCallback(async (params?: T) => {
        getData({ ...arg, ...params } as any)
    }, [contract, getData, arg])

    return [data, getFun] as const
}