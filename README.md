# `abi-to-request`

## 1. install
```
npm install abi-to-request
```
or
```
yarn add abi-to-request
```

## 2. Configuration commands
在package.json的scripts中添加

```
"abi:api": "converted -d -abis --npm etherjs --entry XXXXXX --chainId XX"
```

## 3. Usage

```
-h					Help, output command
-d					Delete the client file before each execution
-js					The output is a file in javascript language
-abis					Export the abis file, you don't need to generate it again after ·npm install· is complete, default no export
-bigNumber				If select etherjs, number outputs a BigNumber type, default It outputs a string
--npm <entry file path>			Which npm package to use to interact with the blockchain. value: web3js/etherjs
--entry <entry file path>		Abi json file entry path, If it is a folder, output all files, if it is a file, only output the file
--output <output file path>		Abi json file output path, default "./src/client"
--chainId <chainId>			Specify the blockchain network, all by default	
--contractName <contractName>		Specify the contract, the default is all
```

## 4. Example
```jsx
import './App.css';
import { useState } from 'react';
import { useWeb3Info, Web3InfoProvider, ContractRequestContextProvider, useReadContractRequest, useRequest } from "abi-to-request"
import { Loading, LoadingProvider, useLoading } from './component/Loading';
import { ContractRequest } from './component/ContractRequest';
import { ContractCard } from './component/ContractCard';
import { abis } from "./client/abis"
import { map } from 'lodash';
import { SimpleTokenAbis_BalanceOf, SimpleTokenAbis_Decimals, SimpleTokenAbis_Symbol, SimpleTokenAbis_Transfer } from './client/SimpleTokenAbis';
import { ethers } from 'ethers';

const Request = () => {
  const { connected, address, chainData, killSession, toConnect } = useWeb3Info()
  const { openLoading, closeDelayLoading } = useLoading()

  const [decimals, getDecimals] = useReadContractRequest(SimpleTokenAbis_Decimals, {
    onSuccess: (res) => {
      // do something
    }
  })

  const [symbol, getSymbol] = useReadContractRequest(SimpleTokenAbis_Symbol)

  const [getBalanceOfAddress, setBalanceOfAddress] = useState("")

  const [balanceOf, getBalanceOf] = useReadContractRequest(SimpleTokenAbis_BalanceOf, {
    arg: address ? { account: address } : undefined,
    isGlobalTransactionHookValid: true
  }, [address])

  const [transferrecipient, settransferrecipient] = useState("")
  const [transferAmount, settransferAmount] = useState("")

  const [transfer] = useRequest(SimpleTokenAbis_Transfer, {
    isGlobalTransactionHookValid: false,
    onSuccessBefore: () => {
      openLoading()
    },
    onTransactionSuccess: () => {
      closeDelayLoading()
      alert(`转账给${transferrecipient} ${ethers.utils.formatUnits(transferAmount, decimals || 18)} ${symbol}成功`)
    }
  }, [transferrecipient, transferAmount, symbol, decimals])

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 30 }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        {connected
          ? <div className="fetch-btn" style={{ marginRight: 20 }} onClick={() => { killSession && killSession() }}>{"Disconnect"}</div>
          : <div className="fetch-btn" style={{ marginRight: 20 }} onClick={() => { toConnect && toConnect() }}>{"Connect"}</div>}
        {address && <div className="fetch-btn" style={{ marginRight: 20, background: "rgba(0,0,0,0.4)", cursor: "default" }}>{address}</div>}
        {chainData && <div className="fetch-btn" style={{ marginRight: 20, background: "rgba(0,0,0,0.4)", cursor: "default" }}>{chainData?.title || chainData?.name}</div>}
      </div>
      <br />
      <br />
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <div className="fetch-btn" style={{ marginRight: 20 }} onClick={getDecimals}>{"getDecimals"}</div>
        <div>{decimals}</div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <div className="fetch-btn" style={{ marginRight: 20 }} onClick={getSymbol}>{"getSymbol"}</div>
        <div>{symbol}</div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <div className="fetch-btn" style={{ marginRight: 20 }} onClick={() => {
          getBalanceOf({ account: getBalanceOfAddress })
        }}>{"getBalanceOf"}</div>
        <input className="fetch-input" placeholder={"account"} onChange={(e) => { setBalanceOfAddress(e.target.value) }} />
        {balanceOf && <div>{ethers.utils.formatUnits(balanceOf, decimals || 18)} {symbol}</div>}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <div className="fetch-btn" style={{ marginRight: 20 }} onClick={() => {
          transfer({
            recipient: transferrecipient,
            amount: transferAmount
          })
        }}>{"transfer"}</div>
        <input className="fetch-input" placeholder={"recipient"} onChange={(e) => { settransferrecipient(e.target.value) }} />
        <input className="fetch-input" placeholder={"amount"} onChange={(e) => { settransferAmount(ethers.utils.parseEther(e.target.value) as any) }} />
      </div>
    </div>
  )
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
          openLoading()
        },
        onFinish: () => {
          closeDelayLoading()
        }
      }}
    >
      <div>
        <Request />
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

```