import './App.css';
import React, { useEffect, useState } from 'react';
import { useWeb3Info, Web3InfoProvider, ContractRequestContextProvider, useRequest, useImmediateReadContractRequest } from "../.."
import { abis } from "./client/abis"
import { SimpleTokenAbis_BalanceOf, SimpleTokenAbis_Decimals, SimpleTokenAbis_Symbol } from './client/SimpleTokenAbis';
import { Loading, LoadingProvider, useLoading } from './component/Loading';
import { map } from 'lodash';
import { ContractCard } from './component/Contract';

const A = () => {
  const { address } = useWeb3Info()
  const [getBalanceOf, balanceOf] = useRequest(SimpleTokenAbis_BalanceOf)

  const [symbol] = useImmediateReadContractRequest(SimpleTokenAbis_Symbol)
  const [Decimals] = useImmediateReadContractRequest(SimpleTokenAbis_Decimals)

  useEffect(() => {
    console.log(Decimals, symbol, balanceOf)
  }, [Decimals, symbol, balanceOf])

  useEffect(() => {
    for (let i in abis) {
      console.log(abis[i])
    }
  }, [])

  return <button onClick={() => {
    address && getBalanceOf({
      account: address
    })
  }}>balacne</button>
}

const Example = () => {
  const web3Info = useWeb3Info()
  const { openLoading, closeDelayLoading } = useLoading()
  const [select, setSelect] = useState(Number(window.location.hash.slice(1, window.location.hash.length)) || 0)

  return (
    <ContractRequestContextProvider
      library={web3Info.library}
      abis={abis}
      transactionHook={{
        onSuccessBefore: () => {
          openLoading && openLoading()
        },
        onFinish: (res) => {
          closeDelayLoading && closeDelayLoading()
          console.log(res)
        }
      }}
    >
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{
            width: 400,
            display: 'flex',
            flexDirection: "column",
            height: "100vh",
            overflowY: "auto",
            borderRight: "1px solid rgba(225,225,225, 0.9)"
          }}>
            {
              map(abis, (item, index) => <ContractCard
                select={select}
                index={index}
                data={item}
                key={index}
                setSelect={setSelect}
              />)
            }
          </div>
          <div style={{
            padding: "20px",
            width: "calc(100% - 400px)"
          }}>
            {
              <div>{select}</div>
            }
          </div>
        </div>
        <Loading />
      </div >
    </ContractRequestContextProvider >
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
