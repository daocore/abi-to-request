import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { useWeb3Info, Web3InfoProvider, ContractRequestContextProvider, useContractRequest, useRequest, useImmediateReadContractRequest } from "../../src"
import { abis } from "./client/abis"
import { SimpleToken_Decimals, SimpleToken_Symbol } from './client/SimpleToken';

const A = () => {
  const { contracts } = useContractRequest()
  const [decimals] = useImmediateReadContractRequest(SimpleToken_Symbol, {
    onFail: (res)=>{
      console.log(res)
    }
  })

  useEffect(() => {
    console.log(decimals)
  }, [decimals])
  return null
}

const Example = () => {
  const { library, toConnect } = useWeb3Info()

  useEffect(() => {
    console.log(library)
  }, [library])

  return (
    <ContractRequestContextProvider library={library} abis={abis}>
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
        <button onClick={toConnect}>connect</button>
        <A />
        </header>
      </div>
    </ContractRequestContextProvider>
  );
}

const App = () => {
  return (
    <Web3InfoProvider defaultNetwork={"https://matic-mainnet.chainstacklabs.com"}>
      <Example />
    </Web3InfoProvider>
  );
}

export default App;
