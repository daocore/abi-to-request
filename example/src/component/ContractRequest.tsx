import { map, upperFirst } from "lodash";
import { useEffect, useState } from "react";
import { AbiItem } from 'web3-utils';
import { TAbiItem, useReadContractRequest } from "../source-code";

export const ellipseAddress = (address = "", width = 8) => `${address.slice(0, width)}...${address.slice(-width)}`;

const ContractLabel = ({ item, fetch }: { item: AbiItem, fetch: any }) => {
  //const [value, getValue] = useReadContractRequest(fetch, { onSuccess: (res) => { console.log(res) } })

  //console.log(value, fetch?.name)

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <div className="fetch-btn" style={{ marginRight: 20 }} onClick={() => { }}>{item?.name}</div>
        {
          map(item?.inputs, (input, index) => {
            return <input className="fetch-input" key={index} placeholder={input?.name || "unknown"} />
          })
        }
      </div>
    </div>
  )
}

export const ContractRequest = ({ data }: { data: TAbiItem }) => {
  const abi = (data?.abi || []) as AbiItem[]
  const [requests, setRequests] = useState({})
  const contractName = data?.contractName

  useEffect(() => {
    const requests = require(`../client/${contractName}.tsx`)
    setRequests(requests)
  }, [contractName])

  return (
    <div
      style={{
      }}>
      {
        map(abi, (item, index) => {
          const fetch = (requests as any)[`${contractName}_${upperFirst(item.name)}`]
          if (item?.type === 'event' || !fetch) return
          return (<ContractLabel key={index} item={item} fetch={fetch} />)
        })
      }
    </div>
  )
}