import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { useWeb3Info, Web3InfoProvider, ContractRequestContextProvider } from "abi-to-request"
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'

const Example = () => {
  /* const { library } = useWeb3Info()
  useEffect(() => {
    console.log(library)
  }, [library]) */

  const { library } = useWeb3Info()
  console.log(library)

  return (
    <ContractRequestContextProvider library={library}>
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
      </header>
    </div>
    </ContractRequestContextProvider>
  );
}

const App = () => {
  return (
    <Web3InfoProvider>
        <Example />
    </Web3InfoProvider>
  );
}

export default App;
