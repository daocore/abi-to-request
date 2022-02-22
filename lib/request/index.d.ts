import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { TContract } from "../contract";
export declare type THandleHookArg<K> = {
    contractName: string;
    functionName: string;
    data?: K;
};
export interface IHandleRequest<K> {
    onSuccessBefore?: (arg: THandleHookArg<K>) => void;
    onSuccess?: (arg: THandleHookArg<K>) => void;
    onTransactionSuccess?: (arg: THandleHookArg<TransactionReceipt>) => void;
    onFail?: (arg?: THandleHookArg<any>) => void;
    onFinish?: (arg?: THandleHookArg<any>) => void;
    isGlobalTransactionHookValid?: boolean;
}
export declare type IFetch<K, T> = (contract: TContract, arg?: T) => Promise<K>;
export declare const useRequest: <T, K>(fetch: IFetch<K, T>, option?: IHandleRequest<K> & {
    arg?: T;
}, rely?: any[]) => readonly [(params?: T) => Promise<{
    successValue: Awaited<K>;
    failError?: undefined;
} | {
    failError: any;
    successValue?: undefined;
}>, K];
export declare const useImmediateReadContractRequest: <T, K>(fetch: IFetch<K, T>, option?: IHandleRequest<K> & {
    arg?: T;
}, rely?: any[]) => readonly [K, (params?: T) => Promise<{
    successValue: Awaited<K>;
    failError?: undefined;
} | {
    failError: any;
    successValue?: undefined;
}>];
