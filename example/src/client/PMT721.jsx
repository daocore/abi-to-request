
//nonpayable
export const approve = {
	name: "approve",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { to, tokenId } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.approve(to, tokenId)
			return res
		} else {
			let res = await contract.methods.approve(to, tokenId).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const balanceOf = {
	name: "balanceOf",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { owner } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.balanceOf(owner)
			return res
		} else {
			let res = await contract.methods.balanceOf(owner).call()
			return res
		}
	}
}

//nonpayable
export const burn = {
	name: "burn",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { id } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.burn(id)
			return res
		} else {
			let res = await contract.methods.burn(id).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const currentID = {
	name: "currentID",
	contract: "PMT721",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.currentID()
			return res
		} else {
			let res = await contract.methods.currentID().call()
			return res
		}
	}
}

//view
export const exits = {
	name: "exits",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { id } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.exits(id)
			return res
		} else {
			let res = await contract.methods.exits(id).call()
			return res
		}
	}
}

//view
export const getApproved = {
	name: "getApproved",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { tokenId } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.getApproved(tokenId)
			return res
		} else {
			let res = await contract.methods.getApproved(tokenId).call()
			return res
		}
	}
}

//view
export const getMinter = {
	name: "getMinter",
	contract: "PMT721",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.getMinter()
			return res
		} else {
			let res = await contract.methods.getMinter().call()
			return res
		}
	}
}

//view
export const isApprovedForAll = {
	name: "isApprovedForAll",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { owner, operator } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.isApprovedForAll(owner, operator)
			return res
		} else {
			let res = await contract.methods.isApprovedForAll(owner, operator).call()
			return res
		}
	}
}

//nonpayable
export const mint = {
	name: "mint",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { to } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.mint(to)
			return res
		} else {
			let res = await contract.methods.mint(to).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const name = {
	name: "name",
	contract: "PMT721",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.name()
			return res
		} else {
			let res = await contract.methods.name().call()
			return res
		}
	}
}

//view
export const ownerOf = {
	name: "ownerOf",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { tokenId } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.ownerOf(tokenId)
			return res
		} else {
			let res = await contract.methods.ownerOf(tokenId).call()
			return res
		}
	}
}

//nonpayable
export const safeTransferFrom = {
	name: "safeTransferFrom",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { from, to, tokenId } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.safeTransferFrom(from, to, tokenId)
			return res
		} else {
			let res = await contract.methods.safeTransferFrom(from, to, tokenId).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const safeTransferFromfromtotokenId_data = {
	name: "safeTransferFromfromtotokenId_data",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { from, to, tokenId, _data } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.safeTransferFrom(from, to, tokenId, _data)
			return res
		} else {
			let res = await contract.methods.safeTransferFrom(from, to, tokenId, _data).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const setApprovalForAll = {
	name: "setApprovalForAll",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { operator, approved } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.setApprovalForAll(operator, approved)
			return res
		} else {
			let res = await contract.methods.setApprovalForAll(operator, approved).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const setMinter = {
	name: "setMinter",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { minter } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.setMinter(minter)
			return res
		} else {
			let res = await contract.methods.setMinter(minter).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const supportsInterface = {
	name: "supportsInterface",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { interfaceId } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.supportsInterface(interfaceId)
			return res
		} else {
			let res = await contract.methods.supportsInterface(interfaceId).call()
			return res
		}
	}
}

//view
export const symbol = {
	name: "symbol",
	contract: "PMT721",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.symbol()
			return res
		} else {
			let res = await contract.methods.symbol().call()
			return res
		}
	}
}

//view
export const tokenURI = {
	name: "tokenURI",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { tokenId } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.tokenURI(tokenId)
			return res
		} else {
			let res = await contract.methods.tokenURI(tokenId).call()
			return res
		}
	}
}

//nonpayable
export const transferFrom = {
	name: "transferFrom",
	contract: "PMT721",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { from, to, tokenId } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.transferFrom(from, to, tokenId)
			return res
		} else {
			let res = await contract.methods.transferFrom(from, to, tokenId).send({ from: contract.sendAccount })
			return res
		}
	}
}
