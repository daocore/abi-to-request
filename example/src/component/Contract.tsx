import { TAbiItem } from "../../../lib";

export const ellipseAddress = (address = "", width = 8) => `${address.slice(0, width)}...${address.slice(-width)}`;

const ContractLabel = ({ title, text }: { text: string, title: string }) => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "5px 10px"
    }}>
      <div>
        {title}
      </div>
      <div style={{
        width: 180,
        textAlign: "right",
        overflow: "hidden"
      }}>
        {text}
      </div>
    </div>
  )
}

export const ContractCard = ({ data, setSelect, index, select }: { data: TAbiItem, index: number, select: number, setSelect: React.Dispatch<React.SetStateAction<number>> }) => {
  return (
    <div
      className="contract"
      style={{
        width: 360,
        boxShadow: "5px 5px 5px rgba(225,225,225, 0.9)",
        borderTop: "1px solid rgba(225,225,225, 0.9)",
        cursor: 'pointer',
        padding: 10,
        margin: "10px auto",
        background: select === index ? "rgba(225,225,225, 0.9)" : "transparent"
      }}
      onClick={() => {
        window.location.hash = `${index}`;
        setSelect(index)
      }}>
      <ContractLabel title="Contract Name" text={data?.contractName} />
      <ContractLabel title="Address" text={ellipseAddress(data?.address || "", 8)} />
      <ContractLabel title="Chain or Network ID" text={String(data?.chainId || data?.networkId) || ""} />
      <ContractLabel title="Network Name" text={String(data?.netName) || ""} />
      <ContractLabel title="JSON File Source" text={String(data?.frame) || ""} />
    </div>
  )
}