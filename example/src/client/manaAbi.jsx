
//view
export const CHILD_CHAIN_ID = {
	name: "CHILD_CHAIN_ID",
	contract: "manaAbi",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.CHILD_CHAIN_ID()
			return res
		} else {
			let res = await contract.methods.CHILD_CHAIN_ID().call()
			return res
		}
	}
}

//view
export const CHILD_CHAIN_ID_BYTES = {
	name: "CHILD_CHAIN_ID_BYTES",
	contract: "manaAbi",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.CHILD_CHAIN_ID_BYTES()
			return res
		} else {
			let res = await contract.methods.CHILD_CHAIN_ID_BYTES().call()
			return res
		}
	}
}

//view
export const DEFAULT_ADMIN_ROLE = {
	name: "DEFAULT_ADMIN_ROLE",
	contract: "manaAbi",
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
export const DEPOSITOR_ROLE = {
	name: "DEPOSITOR_ROLE",
	contract: "manaAbi",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.DEPOSITOR_ROLE()
			return res
		} else {
			let res = await contract.methods.DEPOSITOR_ROLE().call()
			return res
		}
	}
}

//view
export const ERC712_VERSION = {
	name: "ERC712_VERSION",
	contract: "manaAbi",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.ERC712_VERSION()
			return res
		} else {
			let res = await contract.methods.ERC712_VERSION().call()
			return res
		}
	}
}

//view
export const ROOT_CHAIN_ID = {
	name: "ROOT_CHAIN_ID",
	contract: "manaAbi",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.ROOT_CHAIN_ID()
			return res
		} else {
			let res = await contract.methods.ROOT_CHAIN_ID().call()
			return res
		}
	}
}

//view
export const ROOT_CHAIN_ID_BYTES = {
	name: "ROOT_CHAIN_ID_BYTES",
	contract: "manaAbi",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.ROOT_CHAIN_ID_BYTES()
			return res
		} else {
			let res = await contract.methods.ROOT_CHAIN_ID_BYTES().call()
			return res
		}
	}
}

//view
export const allowance = {
	name: "allowance",
	contract: "manaAbi",
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
	contract: "manaAbi",
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
	contract: "manaAbi",
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
export const changeName = {
	name: "changeName",
	contract: "manaAbi",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { name_ } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.changeName(name_)
			return res
		} else {
			let res = await contract.methods.changeName(name_).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const decimals = {
	name: "decimals",
	contract: "manaAbi",
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
	contract: "manaAbi",
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

//nonpayable
export const deposit = {
	name: "deposit",
	contract: "manaAbi",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { user, depositData } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.deposit(user, depositData)
			return res
		} else {
			let res = await contract.methods.deposit(user, depositData).send({ from: contract.sendAccount })
			return res
		}
	}
}

//payable
export const executeMetaTransaction = {
	name: "executeMetaTransaction",
	contract: "manaAbi",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { userAddress, functionSignature, sigR, sigS, sigV, sendValue } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.executeMetaTransaction(userAddress, functionSignature, sigR, sigS, sigV, sendValue)
			return res
		} else {
			let res = await contract.methods.executeMetaTransaction(userAddress, functionSignature, sigR, sigS, sigV, sendValue).send({ from: contract.sendAccount, value: sendValue || '0' })
			return res
		}
	}
}

//pure
export const getChainId = {
	name: "getChainId",
	contract: "manaAbi",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.getChainId()
			return res
		} else {
			let res = await contract.methods.getChainId().call()
			return res
		}
	}
}

//view
export const getDomainSeperator = {
	name: "getDomainSeperator",
	contract: "manaAbi",
	fun: async (
		contract,
	) => {
		if (contract?.address && !contract?.methods) {
			let res = await contract.getDomainSeperator()
			return res
		} else {
			let res = await contract.methods.getDomainSeperator().call()
			return res
		}
	}
}

//view
export const getNonce = {
	name: "getNonce",
	contract: "manaAbi",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { user } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.getNonce(user)
			return res
		} else {
			let res = await contract.methods.getNonce(user).call()
			return res
		}
	}
}

//view
export const getRoleAdmin = {
	name: "getRoleAdmin",
	contract: "manaAbi",
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
	contract: "manaAbi",
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
	contract: "manaAbi",
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
	contract: "manaAbi",
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
	contract: "manaAbi",
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
	contract: "manaAbi",
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
export const initialize = {
	name: "initialize",
	contract: "manaAbi",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { name_, symbol_, decimals_, childChainManager } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.initialize(name_, symbol_, decimals_, childChainManager)
			return res
		} else {
			let res = await contract.methods.initialize(name_, symbol_, decimals_, childChainManager).send({ from: contract.sendAccount })
			return res
		}
	}
}

//view
export const name = {
	name: "name",
	contract: "manaAbi",
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
export const renounceRole = {
	name: "renounceRole",
	contract: "manaAbi",
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
	contract: "manaAbi",
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
export const symbol = {
	name: "symbol",
	contract: "manaAbi",
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
	contract: "manaAbi",
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
	contract: "manaAbi",
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
	contract: "manaAbi",
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
export const withdraw = {
	name: "withdraw",
	contract: "manaAbi",
	fun: async (
		contract,
		arg
	) => {
		if (!arg) return
		const { amount } = arg;
		if (contract?.address && !contract?.methods) {
			let res = await contract.withdraw(amount)
			return res
		} else {
			let res = await contract.methods.withdraw(amount).send({ from: contract.sendAccount })
			return res
		}
	}
}
