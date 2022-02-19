import './App.css';
import { ContractRequestContextProvider, useWeb3Info, Web3InfoProvider } from 'abi-to-request';
import { Loading, LoadingProvider } from './component/Loading';
import * as React from "react";

export const Example = () => {
  const { library } = useWeb3Info()
  if (!library) return (
    <div>
      请链接钱包并切换到 Ropsten 测试网
    </div>
  )

  return (
    <ContractRequestContextProvider library={library}>
      <LoadingProvider>
        <div className="App">
          <header className="App-header">
            <img src={require('./logo.svg')} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
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
          <Example />
        </div>
        <Loading />
      </LoadingProvider>
    </ContractRequestContextProvider>
  );
};

const App = () => {
  return (
    <Web3InfoProvider>
      <Example />
    </Web3InfoProvider>
  );
}

export default App;