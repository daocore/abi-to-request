
//view
export const DEFAULT_ADMIN_ROLE = {
	name: "DEFAULT_ADMIN_ROLE",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.DEFAULT_ADMIN_ROLE()
			return res
		} else {
			let res = await contract.methods.DEFAULT_ADMIN_ROLE().call()
			return res
		}
	}
}

//view
export const INITIAL_SUPPLY = {
	name: "INITIAL_SUPPLY",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.INITIAL_SUPPLY()
			return res
		} else {
			let res = await contract.methods.INITIAL_SUPPLY().call()
			return res
		}
	}
}

//view
export const MINTER_ROLE = {
	name: "MINTER_ROLE",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.MINTER_ROLE()
			return res
		} else {
			let res = await contract.methods.MINTER_ROLE().call()
			return res
		}
	}
}

//view
export const PAUSER_ROLE = {
	name: "PAUSER_ROLE",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.PAUSER_ROLE()
			return res
		} else {
			let res = await contract.methods.PAUSER_ROLE().call()
			return res
		}
	}
}

//view
export const allowance = {
	name: "allowance",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { owner, spender } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.allowance(owner, spender)
			return res
		} else {
			let res = await contract.methods.allowance(owner, spender).call()
			return res
		}
	}
}

//nonpayable
export const approve = {
	name: "approve",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { spender, amount } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.approve(spender, amount)
			return res
		} else {
			let res = await contract.methods.approve(spender, amount).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const balanceOf = {
	name: "balanceOf",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { account } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.balanceOf(account)
			return res
		} else {
			let res = await contract.methods.balanceOf(account).call()
			return res
		}
	}
}

//nonpayable
export const burn = {
	name: "burn",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { amount } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.burn(amount)
			return res
		} else {
			let res = await contract.methods.burn(amount).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const burnFrom = {
	name: "burnFrom",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { account, amount } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.burnFrom(account, amount)
			return res
		} else {
			let res = await contract.methods.burnFrom(account, amount).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const decimals = {
	name: "decimals",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.decimals()
			return res
		} else {
			let res = await contract.methods.decimals().call()
			return res
		}
	}
}

//nonpayable
export const decreaseAllowance = {
	name: "decreaseAllowance",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { spender, subtractedValue } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.decreaseAllowance(spender, subtractedValue)
			return res
		} else {
			let res = await contract.methods.decreaseAllowance(spender, subtractedValue).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const getRoleAdmin = {
	name: "getRoleAdmin",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { role } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.getRoleAdmin(role)
			return res
		} else {
			let res = await contract.methods.getRoleAdmin(role).call()
			return res
		}
	}
}

//view
export const getRoleMember = {
	name: "getRoleMember",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { role, index } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.getRoleMember(role, index)
			return res
		} else {
			let res = await contract.methods.getRoleMember(role, index).call()
			return res
		}
	}
}

//view
export const getRoleMemberCount = {
	name: "getRoleMemberCount",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { role } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.getRoleMemberCount(role)
			return res
		} else {
			let res = await contract.methods.getRoleMemberCount(role).call()
			return res
		}
	}
}

//nonpayable
export const grantRole = {
	name: "grantRole",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { role, account } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.grantRole(role, account)
			return res
		} else {
			let res = await contract.methods.grantRole(role, account).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const hasRole = {
	name: "hasRole",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { role, account } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.hasRole(role, account)
			return res
		} else {
			let res = await contract.methods.hasRole(role, account).call()
			return res
		}
	}
}

//nonpayable
export const increaseAllowance = {
	name: "increaseAllowance",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { spender, addedValue } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.increaseAllowance(spender, addedValue)
			return res
		} else {
			let res = await contract.methods.increaseAllowance(spender, addedValue).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const mint = {
	name: "mint",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { to, amount } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.mint(to, amount)
			return res
		} else {
			let res = await contract.methods.mint(to, amount).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const name = {
	name: "name",
	contract: "SimpleTokenTruffle",
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

//nonpayable
export const pause = {
	name: "pause",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.pause()
			return res
		} else {
			let res = await contract.methods.pause().send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const paused = {
	name: "paused",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.paused()
			return res
		} else {
			let res = await contract.methods.paused().call()
			return res
		}
	}
}

//nonpayable
export const renounceRole = {
	name: "renounceRole",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { role, account } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.renounceRole(role, account)
			return res
		} else {
			let res = await contract.methods.renounceRole(role, account).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const revokeRole = {
	name: "revokeRole",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { role, account } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.revokeRole(role, account)
			return res
		} else {
			let res = await contract.methods.revokeRole(role, account).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const supportsInterface = {
	name: "supportsInterface",
	contract: "SimpleTokenTruffle",
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
	contract: "SimpleTokenTruffle",
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
export const totalSupply = {
	name: "totalSupply",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.totalSupply()
			return res
		} else {
			let res = await contract.methods.totalSupply().call()
			return res
		}
	}
}

//nonpayable
export const transfer = {
	name: "transfer",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { recipient, amount } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.transfer(recipient, amount)
			return res
		} else {
			let res = await contract.methods.transfer(recipient, amount).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const transferFrom = {
	name: "transferFrom",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { sender, recipient, amount } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.transferFrom(sender, recipient, amount)
			return res
		} else {
			let res = await contract.methods.transferFrom(sender, recipient, amount).send({ from: contract.sendAccount })
			return res
		}
	}
}

//nonpayable
export const unpause = {
	name: "unpause",
	contract: "SimpleTokenTruffle",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.unpause()
			return res
		} else {
			let res = await contract.methods.unpause().send({ from: contract.sendAccount })
			return res
		}
	}
}
