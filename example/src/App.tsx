import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { useWeb3Info, Web3InfoProvider, ContractRequestContextProvider, useContractRequest, useRequest, useImmediateReadContractRequest } from "../.."
import { abis } from "./client/abis"
import { SimpleTokenAbis_BalanceOf, SimpleTokenAbis_Decimals, SimpleTokenAbis_Symbol } from './client/SimpleTokenAbis';
import { Loading, LoadingProvider, useLoading } from './component/Loading';

const A = () => {
  const { contracts } = useContractRequest()
  const { address, networkId } = useWeb3Info()
  const [getBalanceOf, balanceOf] = useRequest(SimpleTokenAbis_BalanceOf)

  const [symbol] = useImmediateReadContractRequest(SimpleTokenAbis_Symbol)
  const [Decimals] = useImmediateReadContractRequest(SimpleTokenAbis_Decimals)

  useEffect(() => {
    console.log(Decimals, symbol, balanceOf)
  }, [Decimals, symbol, balanceOf])

  useEffect(() => {
    if (!address) return
    getBalanceOf({
      account: address
    })
  }, [address, networkId])
  return <button onClick={() => {
    address && getBalanceOf({
      account: address
    })
  }}>balacne</button>
}

const Example = () => {
  const web3Info = useWeb3Info()
  const { openLoading, closeDelayLoading } = useLoading()

  return (
    <ContractRequestContextProvider
      library={web3Info.library}
      abis={abis}
      transactionHook={{
        onSuccessBefore: () => {
          openLoading && openLoading()
        },
        onFinish: () => {
          closeDelayLoading && closeDelayLoading()
        }
      }}
    >
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={() => {
            web3Info.toConnect && web3Info.toConnect()
          }}>connect</button>
          <A />
        </header>
        <Loading />
      </div>
    </ContractRequestContextProvider>
  );
}

const App = () => {
  return (
    <Web3InfoProvider defaultNetwork={"ropsten"}>
      <LoadingProvider>
        <Example />
      </LoadingProvider>
    </Web3InfoProvider>
  );
}

export default App;
