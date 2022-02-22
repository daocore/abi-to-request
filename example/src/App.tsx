import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { useWeb3Info, Web3InfoProvider, ContractRequestContextProvider, useContractRequest, useRequest, useImmediateReadContractRequest } from "../../lib"
import { abis } from "./client/abis"
import { SimpleTokenAbis_BalanceOf, SimpleTokenAbis_Decimals, SimpleTokenAbis_Symbol } from './client/SimpleTokenAbis';

const A = () => {
  const { contracts } = useContractRequest()
  const { address, networkId } = useWeb3Info()
  const [decimals, balance] = useRequest(SimpleTokenAbis_BalanceOf, {
    onSuccess: (res)=>{
      console.log(res)
    },
    onFail: (res)=>{
      console.log(res)
    },
  })


  useEffect(() => {
    console.log(contracts)
  }, [contracts])

  useEffect(() => {
    console.log(address)
    if(!address) return
    decimals({
      account: address
    })
  }, [address, contracts, networkId])
  return null
}

const Example = () => {
  const web3Info = useWeb3Info()

  useEffect(() => {
    console.log(web3Info)
  }, [web3Info.connected])

  return (
    <ContractRequestContextProvider library={web3Info.library} abis={abis}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        <button onClick={()=>{
          web3Info.toConnect && web3Info.toConnect()
        }}>connect</button>
        <A />
        </header>
      </div>
    </ContractRequestContextProvider>
  );
}

const App = () => {
  return (
    <Web3InfoProvider defaultNetwork={"ropsten"}>
      <Example />
    </Web3InfoProvider>
  );
}

export default App;
