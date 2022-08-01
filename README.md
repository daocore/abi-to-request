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
"abi:api": "converted -d --npm etherjs --entry XXXXXX --chainId XX"
```

## 3. Commands Usage

```
-h					Help, output command
-d					Delete the client file before each execution
-js					The output is a file in javascript language
-bigNumber				If select etherjs, number outputs a BigNumber type, default It outputs a string
--npm <entry file path>			Which npm package to use to interact with the blockchain. value: web3js/etherjs
--entry <entry file path>		Abi json file entry path, If it is a folder, output all files, if it is a file, only output the file
--output <output file path>		Abi json file output path, default "./src/client"
--chainId <chainId>			Specify the blockchain network, all by default	
--contractName <contractName>		Specify the contract, the default is all
```

## 4. Hook Usage
|hook or other| usage  | remarks |
|---|---|---|
|useReadContractRequest|XXX|XXX|
|useRequest|XXX|XXX|
|ContractRequestContextProvider|XXX|XXX|

<!-- ## 5. Example
```tsx
import { useState } from 'react';
import { ethers } from 'ethers';
import {
    ContractRequestContextProvider, 
    useReadContractRequest, 
    useRequest 
} from "abi-to-request"
import { 
    SimpleTokenAbis_BalanceOf, 
    SimpleTokenAbis_Decimals, 
    SimpleTokenAbis_Symbol, 
    SimpleTokenAbis_Transfer 
} from './client/SimpleTokenAbis';

const Request = () => {
  const [decimals] = useReadContractRequest(SimpleTokenAbis_Decimals)
  const [symbol] = useReadContractRequest(SimpleTokenAbis_Symbol)

  const [getBalanceOfAddress, setBalanceOfAddress] = useState("")
  const [balanceOf, getBalanceOf] = useReadContractRequest(SimpleTokenAbis_BalanceOf, {
    arg: address ? { account: address } : undefined,
    isGlobalTransactionHookValid: true,
    onSuccess: (res) => {
      // do something
    }
  }, [address])

  const [transferrecipient, settransferrecipient] = useState("")
  const [transferAmount, settransferAmount] = useState("")

  const [transfer] = useRequest(SimpleTokenAbis_Transfer, {
    isGlobalTransactionHookValid: false,
    onSuccessBefore: () => {
      // openLoading()
    },
    onTransactionSuccess: () => {
      // closeDelayLoading()
      alert(`转账给${transferrecipient} ${transferAmount} ${symbol}成功`)
    }
  }, [transferrecipient, transferAmount, symbol])

  return (
    <div>
      <div>
        <div>{decimals}</div>
      </div>

      <div>
        <div>{symbol}</div>
      </div>

      <div>
        <div onClick={() => {
          getBalanceOf({ account: getBalanceOfAddress })
        }}>getBalanceOf</div>
        <input 
            placeholder={"account"} 
            onChange={(e) => { setBalanceOfAddress(e.target.value) }} 
        />
        <div>
            {balanceOf ? ethers.utils.formatUnits(balanceOf, decimals || 18) : ""} {symbol}
        </div>
      </div>

      <div>
        <div onClick={() => {
          transfer({
            recipient: transferrecipient,
            amount: transferAmount
          })

          //or 

          transfer({
            recipient: transferrecipient,
            amount: transferAmount
          }).then(res=>{
            if(res.retureValue){
              // something
            }
          })
        }}>transfer</div>
        <input 
            placeholder={"recipient"} 
            onChange={(e) => { settransferrecipient(e.target.value) }} 
        />
        <input 
            placeholder={"amount"} 
            onChange={(e) => { 
                settransferAmount(ethers.utils.parseEther(e.target.value) as any) 
            }}
        />
      </div>
    </div>
  )
}

const App = () => {
  return (
    <ContractRequestContextProvider
      library={web3Info.library}
      abis={abis}
      transactionHook={{
        onSuccessBefore: () => {
          // openLoading() something
        },
        onFinish: () => {
          // closeDelayLoading() something
        }
      }}
    >
      <Request />
    </ContractRequestContextProvider >
  );
}

export default App;

```
 -->