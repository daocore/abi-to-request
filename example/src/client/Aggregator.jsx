
//nonpayable
export const buyNFT = {
	name: "buyNFT",
	contract: "Aggregator",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { to, nftName } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.buyNFT(to, nftName)
			return res
		} else {
			let res = await contract.methods.buyNFT(to, nftName).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const buyNFTGroup = {
	name: "buyNFTGroup",
	contract: "Aggregator",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { to, groupName } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.buyNFTGroup(to, groupName)
			return res
		} else {
			let res = await contract.methods.buyNFTGroup(to, groupName).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const createNFT = {
	name: "createNFT",
	contract: "Aggregator",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { name, desc, price, lowerBound, upperBound, balance, addr } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.createNFT(name, desc, price, lowerBound, upperBound, balance, addr)
			return res
		} else {
			let res = await contract.methods.createNFT(name, desc, price, lowerBound, upperBound, balance, addr).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const deleteNFTFromGroup = {
	name: "deleteNFTFromGroup",
	contract: "Aggregator",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { nftName, groupName } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.deleteNFTFromGroup(nftName, groupName)
			return res
		} else {
			let res = await contract.methods.deleteNFTFromGroup(nftName, groupName).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const getNFT = {
	name: "getNFT",
	contract: "Aggregator",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { name } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.getNFT(name)
			return res
		} else {
			let res = await contract.methods.getNFT(name).call()
			return res
		}
	}
}

//view
export const getNFTGroup = {
	name: "getNFTGroup",
	contract: "Aggregator",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { groupName } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.getNFTGroup(groupName)
			return res
		} else {
			let res = await contract.methods.getNFTGroup(groupName).call()
			return res
		}
	}
}

//nonpayable
export const increaseNFT = {
	name: "increaseNFT",
	contract: "Aggregator",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { name, increasement } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.increaseNFT(name, increasement)
			return res
		} else {
			let res = await contract.methods.increaseNFT(name, increasement).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const putNFTsIntoGroup = {
	name: "putNFTsIntoGroup",
	contract: "Aggregator",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { nftNames, groupName } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.putNFTsIntoGroup(nftNames, groupName)
			return res
		} else {
			let res = await contract.methods.putNFTsIntoGroup(nftNames, groupName).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const transferERC20 = {
	name: "transferERC20",
	contract: "Aggregator",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { _to, amt } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.transferERC20(_to, amt)
			return res
		} else {
			let res = await contract.methods.transferERC20(_to, amt).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const transferNFT = {
	name: "transferNFT",
	contract: "Aggregator",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { to, name, num } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.transferNFT(to, name, num)
			return res
		} else {
			let res = await contract.methods.transferNFT(to, name, num).send({ from: contract.sendAccount })
			return res
		}
	}
}
