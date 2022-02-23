import './App.css';
import { useState } from 'react';
import { useWeb3Info, Web3InfoProvider, ContractRequestContextProvider, useReadContractRequest, useRequest } from "./source-code"
import { Loading, LoadingProvider, useLoading } from './component/Loading';
import { ContractRequest } from './component/ContractRequest';
import { ContractCard } from './component/ContractCard';
import { abis } from "./client/abis"
import { map } from 'lodash';
import { SimpleTokenAbis_BalanceOf, SimpleTokenAbis_Decimals, SimpleTokenAbis_Symbol, SimpleTokenAbis_Transfer } from './client/SimpleTokenAbis';
import { ethers } from 'ethers';

const AbiTpHTML = () => {
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
        onFinish: () => {
          closeDelayLoading && closeDelayLoading()
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
            borderRight: "1px solid rgba(225,225,225, 0.9)",
            position: "fixed"
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
            marginLeft: 410,
            width: "calc(100% - 430px)"
          }}>
            <ContractRequest data={abis[select]} />
          </div>
        </div>
        <Loading />
      </div >
    </ContractRequestContextProvider >
  );
}

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
