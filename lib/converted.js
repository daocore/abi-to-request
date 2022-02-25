#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const async = require("async");
const lodash = require("lodash");
const nodeSupportedChains = require("./chain/chains.json")

let config = {};
let abisFile = []

const argv = process.argv;
const projectPath = process.cwd();

const geConfig = () => {
	for (let i = 0; i < argv?.length; i++) {
		const arg = argv[i]
		if (arg === "-h") config.isHelp = true
		if (arg === "-d") config.isDelete = true
		if (arg === "-e") config.isExample = true
		if (arg === "-js") config.isJs = true
		if (arg === "-abis") config.exportApis = true
		if (arg === "-bigNumber") config.isBigNumber = true
		if (arg === "--npm") config.npmjs = argv[i + 1];
		if (arg === "--entry") config.entry = argv[i + 1];
		if (arg === "--output") config.output = argv[i + 1];
		if (arg === "--chainId") config.chainId = argv[i + 1];
		if (arg === "--contractName") config.contractName = argv[i + 1];
	}
}
geConfig()

const { entry, output, isJs, chainId, contractName, npmjs, isDelete, isBigNumber, exportApis, isExample } = config;
const outPath = output || "./src/client"

const readFile = (jsonPath) => {
	try {
		const data = fs.readFileSync(jsonPath, "utf-8");
		return data;
	} catch (error) {
		return "";
	}
};

const writeFile = (file, data) => {
	fs.writeFileSync(path.join(projectPath, outPath, file), data);
};

const converted = () => {
	let jsonDirPath = path.join(projectPath, entry)
	let files;
	try {
		files = fs.readdirSync(jsonDirPath);
	} catch (error) {
		jsonDirPath = path.join(jsonDirPath, "../");
		files = fs.readdirSync(jsonDirPath);
		//如果是具体到了某个json文件，那么只是转换该文件
		for (let i = 0; i < files?.length; i++) {
			if (entry.includes(files[i])) {
				files = [files[i]]
				break
			}
		}
	}

	const jsonFile = files?.filter(item => item?.includes("json"))

	if (jsonFile?.length === 0) {
		console.log("该文件或该文件夹下的文件不是标准的json格式(以.json后缀结尾)")
		return
	}

	if (isDelete && fs.existsSync(path.join(projectPath, outPath))) {
		const filesClient = fs.readdirSync(path.join(projectPath, outPath));
		filesClient.forEach(file => {
			const filePath = `${path.join(projectPath, outPath)}/${file}`
			fs.unlinkSync(filePath);
		})
	}

	try {
		fs.mkdirSync(path.join(projectPath, outPath))
	} catch {
		try {
			fs.mkdirSync(path.join(projectPath, outPath, "../"))
			fs.mkdirSync(path.join(projectPath, outPath))
		} catch {
		}
	}
	getJSONContent(jsonFile, jsonDirPath)
}

const getJSONContent = (files, jsonDirPath) => {
	let convertedAmount = 0, fileAmount = files?.length;
	async.forever(
		function (callback) {
			const fileName = files[convertedAmount]?.split(".")[0]
			let content;
			try {
				content = readFile(path.join(jsonDirPath, `./${files[convertedAmount]}`))
			} catch (error) {
				console.log(error)
			}
			if (convertedAmount >= fileAmount) {
				//if (exportApis) {
					writeFile(`abis.${isJs ? "js" : "ts"}`, `${isJs ? "" : `import { TAbiItem } from "${ isExample? "../source-code" : "abi-to-request" }";`}

export const abis${isJs ? "" : ": TAbiItem[]"} = ${JSON.stringify(abisFile, null, '  ')}`);
				//}

				//fs.writeFileSync(path.join(__dirname, `/contract/abis.js`), `module.exports = ${JSON.stringify(abisFile, null, '  ')}`);

				abisFile = []
				callback("done");
				return;
			}
			if (!content) console.log(`${files[convertedAmount]}文件内容格式有误`)
			try {
				content = JSON.parse(content)
			} catch (error) {
				console.log(`${files[convertedAmount]}文件内容格式有误`)
			}
			converetdJSON(content, fileName)
			convertedAmount++;
			callback();
		},
		function (err) {
			console.log(err);
		}
	);
}

const converetdJSON = (content) => {
	const abis = [];
	if (content instanceof Array) {
		// abis
		for (let i = 0; i < content?.length; i++) {
			let abi = content[i]
			if (abi?.contractName && abi?.abi && abi?.chains) {
				for (let j in abi?.chains) {
					abis.push({
						contractName: abi?.contractName || "unknown",
						abi: abi?.abi,
						chainId: j,
						address: abi?.chains[j] || "Not deployed",
						frame: "general",
						netName: nodeSupportedChains[j].name || "unknown"
					})
				}
			}
		}
	} else if (content?.contractName && content?.abi && content?.networks) {
		for (let i in content?.networks) {
			abis.push({
				contractName: content?.contractName || "unknown",
				abi: content?.abi,
				networkId: i,
				address: content?.networks[i]?.address || "Not deployed",
				frame: "truffle",
				netName: nodeSupportedChains[i].name || "unknown"
			})
		}
	} else {
		// hardhat
		for (let i in content) {
			const sub = content[i]
			if (sub instanceof Object && !(sub instanceof Array)) {
				for (let j in sub) {
					const sub2 = sub[j]
					if (sub2 instanceof Object && !(sub2 instanceof Array)) {
						const contracts = sub2?.contracts
						if (contracts) {
							for (let k in contracts) {
								const contract = contracts[k]
								if (contract?.abi) {
									abis?.push({
										contractName: k || "unknown",
										abi: contract?.abi,
										chainId: i,
										address: contract?.address || "Not deployed",
										frame: "hardhat",
										netName: sub2?.name || nodeSupportedChains[i].name || "unknown"
									})
								}
							}
						}
					}
				}
			}
		}
	}
	abisFile.push(...abis)
	toRequestFile(abis)
}

const toRequestFile = (abis) => {
	for (let i = 0; i < abis?.length; i++) {
		const abi = abis[i]?.abi;
		if (chainId && (abis[i].chainId || abis[i].networkId) !== chainId) continue
		let fileStr = isJs ? "" : `${npmjs != "etherjs" && npmjs != "web3js"
			? `import { TContract${!isBigNumber ? ", convertedBigNumber" : ""} } from "${ isExample ? "../source-code" : "abi-to-request" }";
import { Contract } from 'web3-eth-contract';
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { TransactionReceipt } from 'web3-core';
import { ethers${isBigNumber ? ", BigNumber" : ""} } from "ethers";`
			: (
				npmjs === "etherjs"
					? `import { TContract${!isBigNumber ? ", convertedBigNumber" : ""} } from "${ isExample ? "../source-code" : "abi-to-request" }";
import { ethers${isBigNumber ? ", BigNumber" : ""} } from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";`
					: `import { TContract } from "${ isExample ? "../source-code" : "abi-to-request" }";
import { TransactionReceipt } from 'web3-core';
import { Contract } from 'web3-eth-contract';`
			)}
`

		const FunObj = {};
		if (contractName && abis[i]?.contractName !== contractName) continue
		const name = `${abis[i]?.netName || nodeSupportedChains[abis[i].chainId || abis[i].networkId]?.name || ""}-${abis[i].chainId || abis[i].networkId}`
		const contractFileName = `${abis[i].contractName}` //chainId ? `${abis[i].contractName}` : `${abis[i].contractName}_${lodash.upperFirst(lodash.camelCase(name))}`
		for (let i = 0; i < abi?.length; i++) {
			const item = abi[i];
			let name = item?.name
			// 如果是事件和构造函数，那么就跳过
			if (item?.type === "event" || !name) {
				continue
			}
			if (FunObj[name]) {
				name = item?.name + lodash?.map(item?.inputs, ite => lodash.upperFirst(ite?.name)).join("")
			}
			FunObj[name] = name;

			fileStr += `
//${item?.stateMutability}
export const ${contractFileName}_${lodash.upperFirst(name)} = async (
	contract${isJs ? "" : ": TContract"},
`

			const inputs = item?.inputs
			// 需要参数的
			let paramasObj = [];
			if (inputs?.length > 0 || item?.stateMutability === "payable") {
				for (let j = 0; j < inputs?.length; j++) {
					paramasObj.push({
						name: `${inputs[j]?.name || inputs[j]?.type + "Params" + (j + 1)}`,
						type: `${inputs[j]?.type?.includes("int") ? (inputs[j]?.type?.includes("[]") ? "(string | number)[]" : "string | number") : "string"};`,
						contractType: inputs[j]?.type,
					})
				}
				if (item?.stateMutability === "payable") {
					paramasObj.push({
						name: `sendValue`,
						type: `string | number`,
						contractType: 'unit',
					})
				}

				let paramas = lodash.join(lodash.map(paramasObj, ite => `
		${ite?.name}: ${ite?.type} //${ite?.contractType}`), "")
				fileStr += `	arg${isJs ? "" : `?: {${paramas}
	}`}
) => {
	if (!arg) return
	const { ${lodash.join(lodash.map(paramasObj, item => `${item?.name}`), ", ")} } = arg;`
			} else {
				fileStr += `) => {`
			}

			let paramas2 = lodash.join(lodash.map(paramasObj, item => `${item?.name}`), ", ")
			let web3jsReturns = "", etherjsReturns = ""
			if (item?.outputs?.length > 0) {
				const getReturns = (typ) => {
					let returnsType = "{"
					// 处理有返回值时候的类型
					const getOutput = (outputs) => {
						for (let j = 0; j < outputs?.length; j++) {
							const output = outputs[j]
							if (output?.type === "tuple") {
								if (output?.name) {
									returnsType += `
			${output?.name}: {`
									getOutput(output?.components)
									returnsType += `
		}, `
								} else {
									getOutput(output?.components)
								}
							} else {
								const str = typ === "etherjs" && output?.type?.includes("int") ? "BigNumber" : "string"
								const type = `${str?.includes("BigNumber") && isBigNumber ? str : "string"}${output?.type?.includes("[]") ? "[]" : ""}; //${output?.type}`
								if (output?.name) {
									returnsType += `
			${output?.name}: ${type}`
								} else {
									returnsType = type
								}
							}
						}
					}

					getOutput(item?.outputs)

					if (returnsType.indexOf("{") === 0) {
						returnsType += `
		}`
					}
					return returnsType
				}
				web3jsReturns = getReturns()
				etherjsReturns = getReturns("etherjs")
			}

			if (isJs) {
				web3jsReturns = "";
				etherjsReturns = ""
			}

			const contractTypeAny = isJs ? "contract" : "(contract as any)"
			const contractTypeEthers = isJs ? "contract" : "(contract as ethers.Contract)"
			const contractTypeWeb3 = isJs ? "contract" : "(contract as Contract)"
			const webiReturn = isJs ? "" : (web3jsReturns && !item?.stateMutability?.includes("payable") ? ` as ${web3jsReturns}` : " as TransactionReceipt")
			const etherReturn = isJs ? "" : (etherjsReturns && !item?.stateMutability?.includes("payable") ? ` as ${etherjsReturns}` : " as TransactionResponse")
			const webjCallOrSend = item?.stateMutability?.includes("payable") ? `send({ from: contract.sendAccount${item?.stateMutability === "payable" ? ", value: sendValue || '0'" : ""} })` : "call()"

			if (npmjs === "web3js") {
				fileStr += `
	if (${contractTypeAny}?.methods) {
		let res = await ${contractTypeWeb3}.methods.${item?.name}(${paramas2}).${webjCallOrSend}
		return res${webiReturn}
	}
}
`
			} else if (npmjs === "etherjs") {
				fileStr += `
	if (${contractTypeAny}?.address && !${contractTypeAny}?.methods) {
		let res = await ${contractTypeEthers}.${item?.name}(${paramas2})
		return ${!isBigNumber && etherjsReturns && !item?.stateMutability?.includes("payable") ? "convertedBigNumber(res)" : "res"}${etherReturn}
	}
}
`
			} else {
				fileStr += `
	if (${contractTypeAny}?.address && !${contractTypeAny}?.methods) {
		let res = await ${contractTypeEthers}.${item?.name}(${paramas2})
		return ${!isBigNumber && etherjsReturns && !item?.stateMutability?.includes("payable") ? "convertedBigNumber(res)" : "res"}${etherReturn}
	} else {
		let res = await ${contractTypeWeb3}.methods.${item?.name}(${paramas2}).${webjCallOrSend}
		return res${webiReturn}
	}
}
`
			}
		}

		writeFile(`${contractFileName}.${isJs ? "jsx" : "tsx"}`, fileStr)
	}
}

const start = () => {
	if (config.isHelp) {
		console.log(`
<command>

Usage:

-h					Help, output command
-d					Delete the client file before each execution, default delete
-js					The output is a file in javascript language, default typescript
-abis					Export the abis file, you don't need to generate it again after ·npm install· is complete, default no export
-bigNumber				If select etherjs, number outputs a BigNumber type, default It outputs a string
--npm <entry file path>			Which npm package to use to interact with the blockchain. value: web3js/etherjs
--entry <entry file path>		Abi json file entry path, If it is a folder, output all files, if it is a file, only output the file
--output <output file path>		Abi json file output path, default "./src/client"
--chainId <chainId>			Specify the blockchain network, all by default	
--contractName <contractName>		Specify the contract, the default is all
		`)
		return
	}
	if (entry) converted()
	else console.log("无合约JSON文件入口或html文件导出路径，请在命令行中补充完整")
}

start()