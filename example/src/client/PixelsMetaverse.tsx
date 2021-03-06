import { TContract, convertedBigNumber } from "../source-code";
import { Contract } from 'web3-eth-contract';
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { TransactionReceipt } from 'web3-core';
import { ethers } from "ethers";

//nonpayable
export const addition = {
	name: "addition",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			ids: string | number; //uint256
			idList: (string | number)[]; //uint256[]
		}
	) => {
		if (!arg) return
		const { ids, idList } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).addition(ids, idList)
			return res as TransactionResponse
		} else {
			let res = await (contract as Contract).methods.addition(ids, idList).send({ from: contract.sendAccount })
			return res as TransactionReceipt
		}
	}
}

//view
export const amount = {
	name: "amount",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
	) => {
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).amount()
			return convertedBigNumber(res) as string; //uint256
		} else {
			let res = await (contract as Contract).methods.amount().call()
			return res as string; //uint256
		}
	}
}

//view
export const baseInfo = {
	name: "baseInfo",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			bytes32Params1: string; //bytes32
		}
	) => {
		if (!arg) return
		const { bytes32Params1 } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).baseInfo(bytes32Params1)
			return convertedBigNumber(res) as {
			data: string; //string
			category: string; //string
			decode: string; //string
			name: string; //string
			userId: string; //uint256
			}
		} else {
			let res = await (contract as Contract).methods.baseInfo(bytes32Params1).call()
			return res as {
			data: string; //string
			category: string; //string
			decode: string; //string
			name: string; //string
			userId: string; //uint256
			}
		}
	}
}

//nonpayable
export const cancelCollect = {
	name: "cancelCollect",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			id: string | number; //uint256
			index: string | number; //uint256
		}
	) => {
		if (!arg) return
		const { id, index } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).cancelCollect(id, index)
			return res as TransactionResponse
		} else {
			let res = await (contract as Contract).methods.cancelCollect(id, index).send({ from: contract.sendAccount })
			return res as TransactionReceipt
		}
	}
}

//nonpayable
export const cancelCompose = {
	name: "cancelCompose",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			ids: string | number; //uint256
		}
	) => {
		if (!arg) return
		const { ids } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).cancelCompose(ids)
			return res as TransactionResponse
		} else {
			let res = await (contract as Contract).methods.cancelCompose(ids).send({ from: contract.sendAccount })
			return res as TransactionReceipt
		}
	}
}

//nonpayable
export const collect = {
	name: "collect",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			id: string | number; //uint256
		}
	) => {
		if (!arg) return
		const { id } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).collect(id)
			return res as TransactionResponse
		} else {
			let res = await (contract as Contract).methods.collect(id).send({ from: contract.sendAccount })
			return res as TransactionReceipt
		}
	}
}

//view
export const collection = {
	name: "collection",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			addressParams1: string; //address
			uint256Params2: string | number; //uint256
		}
	) => {
		if (!arg) return
		const { addressParams1, uint256Params2 } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).collection(addressParams1, uint256Params2)
			return convertedBigNumber(res) as string; //uint256
		} else {
			let res = await (contract as Contract).methods.collection(addressParams1, uint256Params2).call()
			return res as string; //uint256
		}
	}
}

//nonpayable
export const compose = {
	name: "compose",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			ids: (string | number)[]; //uint256[]
			name: string; //string
			category: string; //string
			data: string; //string
			decode: string; //string
		}
	) => {
		if (!arg) return
		const { ids, name, category, data, decode } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).compose(ids, name, category, data, decode)
			return res as TransactionResponse
		} else {
			let res = await (contract as Contract).methods.compose(ids, name, category, data, decode).send({ from: contract.sendAccount })
			return res as TransactionReceipt
		}
	}
}

//view
export const composes = {
	name: "composes",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			uint256Params1: string | number; //uint256
			uint256Params2: string | number; //uint256
		}
	) => {
		if (!arg) return
		const { uint256Params1, uint256Params2 } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).composes(uint256Params1, uint256Params2)
			return convertedBigNumber(res) as string; //uint256
		} else {
			let res = await (contract as Contract).methods.composes(uint256Params1, uint256Params2).call()
			return res as string; //uint256
		}
	}
}

//view
export const getCollection = {
	name: "getCollection",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			from: string; //address
		}
	) => {
		if (!arg) return
		const { from } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).getCollection(from)
			return convertedBigNumber(res) as string[]; //uint256[]
		} else {
			let res = await (contract as Contract).methods.getCollection(from).call()
			return res as string[]; //uint256[]
		}
	}
}

//view
export const getCompose = {
	name: "getCompose",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			id: string | number; //uint256
		}
	) => {
		if (!arg) return
		const { id } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).getCompose(id)
			return convertedBigNumber(res) as string[]; //uint256[]
		} else {
			let res = await (contract as Contract).methods.getCompose(id).call()
			return res as string[]; //uint256[]
		}
	}
}

//view
export const getMaterial = {
	name: "getMaterial",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			id: string | number; //uint256
		}
	) => {
		if (!arg) return
		const { id } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).getMaterial(id)
			return convertedBigNumber(res) as {
			material: {
			id: string; //uint256
			compose: string; //uint256
			time: string; //string
			position: string; //string
			zIndex: string; //string
			owner: string; //address
			data: string; //bytes32
			}, 
			baseInfo: {
			data: string; //string
			category: string; //string
			decode: string; //string
			name: string; //string
			userId: string; //uint256
			}, 
			composes: string[]; //uint256[]
			}
		} else {
			let res = await (contract as Contract).methods.getMaterial(id).call()
			return res as {
			material: {
			id: string; //uint256
			compose: string; //uint256
			time: string; //string
			position: string; //string
			zIndex: string; //string
			owner: string; //address
			data: string; //bytes32
			}, 
			baseInfo: {
			data: string; //string
			category: string; //string
			decode: string; //string
			name: string; //string
			userId: string; //uint256
			}, 
			composes: string[]; //uint256[]
			}
		}
	}
}

//view
export const getMaterialLength = {
	name: "getMaterialLength",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
	) => {
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).getMaterialLength()
			return convertedBigNumber(res) as string; //uint256
		} else {
			let res = await (contract as Contract).methods.getMaterialLength().call()
			return res as string; //uint256
		}
	}
}

//nonpayable
export const handleTransfer = {
	name: "handleTransfer",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			from: string; //address
			to: string; //address
			id: string | number; //uint256
		}
	) => {
		if (!arg) return
		const { from, to, id } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).handleTransfer(from, to, id)
			return res as TransactionResponse
		} else {
			let res = await (contract as Contract).methods.handleTransfer(from, to, id).send({ from: contract.sendAccount })
			return res as TransactionReceipt
		}
	}
}

//nonpayable
export const make = {
	name: "make",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			name: string; //string
			category: string; //string
			data: string; //string
			decode: string; //string
			num: string | number; //uint256
		}
	) => {
		if (!arg) return
		const { name, category, data, decode, num } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).make(name, category, data, decode, num)
			return res as TransactionResponse
		} else {
			let res = await (contract as Contract).methods.make(name, category, data, decode, num).send({ from: contract.sendAccount })
			return res as TransactionReceipt
		}
	}
}

//view
export const material = {
	name: "material",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			uint256Params1: string | number; //uint256
		}
	) => {
		if (!arg) return
		const { uint256Params1 } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).material(uint256Params1)
			return convertedBigNumber(res) as {
			id: string; //uint256
			compose: string; //uint256
			time: string; //string
			position: string; //string
			zIndex: string; //string
			owner: string; //address
			data: string; //bytes32
			}
		} else {
			let res = await (contract as Contract).methods.material(uint256Params1).call()
			return res as {
			id: string; //uint256
			compose: string; //uint256
			time: string; //string
			position: string; //string
			zIndex: string; //string
			owner: string; //address
			data: string; //bytes32
			}
		}
	}
}

//nonpayable
export const reMake = {
	name: "reMake",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			id: string | number; //uint256
			num: string | number; //uint256
		}
	) => {
		if (!arg) return
		const { id, num } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).reMake(id, num)
			return res as TransactionResponse
		} else {
			let res = await (contract as Contract).methods.reMake(id, num).send({ from: contract.sendAccount })
			return res as TransactionReceipt
		}
	}
}

//nonpayable
export const register = {
	name: "register",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
	) => {
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).register()
			return res as TransactionResponse
		} else {
			let res = await (contract as Contract).methods.register().send({ from: contract.sendAccount })
			return res as TransactionReceipt
		}
	}
}

//nonpayable
export const setConfig = {
	name: "setConfig",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			role: string; //string
			id: string | number; //uint256
			other: string; //string
		}
	) => {
		if (!arg) return
		const { role, id, other } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).setConfig(role, id, other)
			return res as TransactionResponse
		} else {
			let res = await (contract as Contract).methods.setConfig(role, id, other).send({ from: contract.sendAccount })
			return res as TransactionReceipt
		}
	}
}

//nonpayable
export const setPMT721 = {
	name: "setPMT721",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			pmt721: string; //address
		}
	) => {
		if (!arg) return
		const { pmt721 } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).setPMT721(pmt721)
			return res as TransactionResponse
		} else {
			let res = await (contract as Contract).methods.setPMT721(pmt721).send({ from: contract.sendAccount })
			return res as TransactionReceipt
		}
	}
}

//nonpayable
export const subtract = {
	name: "subtract",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			ids: string | number; //uint256
			id: string | number; //uint256
			index: string | number; //uint256
		}
	) => {
		if (!arg) return
		const { ids, id, index } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).subtract(ids, id, index)
			return res as TransactionResponse
		} else {
			let res = await (contract as Contract).methods.subtract(ids, id, index).send({ from: contract.sendAccount })
			return res as TransactionReceipt
		}
	}
}

//view
export const user = {
	name: "user",
	contract: "PixelsMetaverse",
	fun: async (
		contract: TContract,
		arg?: {
			addressParams1: string; //address
		}
	) => {
		if (!arg) return
		const { addressParams1 } = arg;
		if ((contract as any)?.address && !(contract as any)?.methods) {
			let res = await (contract as ethers.Contract).user(addressParams1)
			return convertedBigNumber(res) as {
			id: string; //uint256
			avater: string; //uint256
			role: string; //string
			other: string; //string
			}
		} else {
			let res = await (contract as Contract).methods.user(addressParams1).call()
			return res as {
			id: string; //uint256
			avater: string; //uint256
			role: string; //string
			other: string; //string
			}
		}
	}
}
