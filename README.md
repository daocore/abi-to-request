# `abi-to-request`

> TODO: description

## 1. install
`
npm install abi-to-request
`

or
`
yarn add abi-to-request
`

## 2. Configuration commands
在package.json的scripts中添加

`
"abi:api": "converted -d --entry './src/contracts/' --chainId 3 -abis"
`

## 3. Usage

```
-h					Help, output command
-d					Delete the client file before each execution
-js					The output is a file in javascript language
-abis					Export the abis file, you don't need to generate it again after ·npm install· is complete, default no export
-bigNumber				If select etherjs, number outputs a BigNumber type, default It outputs a string
--npm <entry file path>			Which npm package to use to interact with the blockchain. value: web3js/etherjs
--entry <entry file path>		Abi json file entry path, If it is a folder, output all files, if it is a file, only output the file
--output <output file path>		Abi json file output path, default "./src/client"
--chainId <chainId>			Specify the blockchain network, all by default	
--contractName <contractName>		Specify the contract, the default is all
```
