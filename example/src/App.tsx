import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { ContractRequestContextProvider } from "abi-to-request"
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'

const Example = () => {
  /* const { library } = useWeb3Info()
  useEffect(() => {
    console.log(library)
  }, [library]) */

  return (
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
  );
}

const App = () => {
  return (
    <ContractRequestContextProvider library={{} as any}>
        <Example />
    </ContractRequestContextProvider>
  );
}

export default App;
