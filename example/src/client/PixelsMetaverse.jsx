
//nonpayable
export const addition = {
	name: "addition",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { ids, idList } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.addition(ids, idList)
			return res
		} else {
			let res = await contract.methods.addition(ids, idList).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const amount = {
	name: "amount",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.amount()
			return res
		} else {
			let res = await contract.methods.amount().call()
			return res
		}
	}
}

//view
export const baseInfo = {
	name: "baseInfo",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { bytes32Params1 } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.baseInfo(bytes32Params1)
			return res
		} else {
			let res = await contract.methods.baseInfo(bytes32Params1).call()
			return res
		}
	}
}

//nonpayable
export const cancelCollect = {
	name: "cancelCollect",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { id, index } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.cancelCollect(id, index)
			return res
		} else {
			let res = await contract.methods.cancelCollect(id, index).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const cancelCompose = {
	name: "cancelCompose",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { ids } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.cancelCompose(ids)
			return res
		} else {
			let res = await contract.methods.cancelCompose(ids).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const collect = {
	name: "collect",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { id } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.collect(id)
			return res
		} else {
			let res = await contract.methods.collect(id).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const collection = {
	name: "collection",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { addressParams1, uint256Params2 } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.collection(addressParams1, uint256Params2)
			return res
		} else {
			let res = await contract.methods.collection(addressParams1, uint256Params2).call()
			return res
		}
	}
}

//nonpayable
export const compose = {
	name: "compose",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { ids, name, category, data, decode } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.compose(ids, name, category, data, decode)
			return res
		} else {
			let res = await contract.methods.compose(ids, name, category, data, decode).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const composes = {
	name: "composes",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { uint256Params1, uint256Params2 } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.composes(uint256Params1, uint256Params2)
			return res
		} else {
			let res = await contract.methods.composes(uint256Params1, uint256Params2).call()
			return res
		}
	}
}

//view
export const getCollection = {
	name: "getCollection",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { from } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.getCollection(from)
			return res
		} else {
			let res = await contract.methods.getCollection(from).call()
			return res
		}
	}
}

//view
export const getCompose = {
	name: "getCompose",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { id } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.getCompose(id)
			return res
		} else {
			let res = await contract.methods.getCompose(id).call()
			return res
		}
	}
}

//view
export const getMaterial = {
	name: "getMaterial",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { id } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.getMaterial(id)
			return res
		} else {
			let res = await contract.methods.getMaterial(id).call()
			return res
		}
	}
}

//view
export const getMaterialLength = {
	name: "getMaterialLength",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.getMaterialLength()
			return res
		} else {
			let res = await contract.methods.getMaterialLength().call()
			return res
		}
	}
}

//nonpayable
export const handleTransfer = {
	name: "handleTransfer",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { from, to, id } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.handleTransfer(from, to, id)
			return res
		} else {
			let res = await contract.methods.handleTransfer(from, to, id).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const make = {
	name: "make",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { name, category, data, decode, num } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.make(name, category, data, decode, num)
			return res
		} else {
			let res = await contract.methods.make(name, category, data, decode, num).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const material = {
	name: "material",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { uint256Params1 } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.material(uint256Params1)
			return res
		} else {
			let res = await contract.methods.material(uint256Params1).call()
			return res
		}
	}
}

//nonpayable
export const reMake = {
	name: "reMake",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { id, num } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.reMake(id, num)
			return res
		} else {
			let res = await contract.methods.reMake(id, num).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const register = {
	name: "register",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.register()
			return res
		} else {
			let res = await contract.methods.register().send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const setConfig = {
	name: "setConfig",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { role, id, other } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.setConfig(role, id, other)
			return res
		} else {
			let res = await contract.methods.setConfig(role, id, other).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const setPMT721 = {
	name: "setPMT721",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { pmt721 } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.setPMT721(pmt721)
			return res
		} else {
			let res = await contract.methods.setPMT721(pmt721).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const subtract = {
	name: "subtract",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { ids, id, index } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.subtract(ids, id, index)
			return res
		} else {
			let res = await contract.methods.subtract(ids, id, index).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const user = {
	name: "user",
	contract: "PixelsMetaverse",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { addressParams1 } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.user(addressParams1)
			return res
		} else {
			let res = await contract.methods.user(addressParams1).call()
			return res
		}
	}
}
