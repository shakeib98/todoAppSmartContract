const Web3 = require('web3')
const rpcURL = 'HTTP://127.0.0.1:7545' // Your RPC URL goes here
const web3 = new Web3(rpcURL)
console.log(web3.version)
const address = "0x59bE31514156F03CA20f97dcc587FC6Bb725CF76" // Your account address goes here
web3.eth.getBalance(address).then((balacne)=>{
	console.log(web3.utils.fromWei(balacne,'ether'))
}).catch(error=>{
	console.log(error)
})
const constractAddress = "0x56a90a76e2ea1d79de771fe3aeaeaf06aac8b61c"
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_task",
				"type": "string"
			}
		],
		"name": "createTask",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_task",
				"type": "string"
			}
		],
		"name": "deleteTask",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_task",
				"type": "string"
			}
		],
		"name": "markTaskAsComplete",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getValueAtMapping",
		"outputs": [
			{
				"components": [
					{
						"name": "timeStamp",
						"type": "uint256"
					},
					{
						"name": "task",
						"type": "string"
					},
					{
						"name": "isCompleted",
						"type": "bool"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "taskToUser",
		"outputs": [
			{
				"name": "timeStamp",
				"type": "uint256"
			},
			{
				"name": "task",
				"type": "string"
			},
			{
				"name": "isCompleted",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var MyContract = new web3.eth.Contract(abi,constractAddress)

MyContract.methods.getValueAtMapping(address).call().then((response)=>{
	console.log(response)

}).catch((error)=>{
	console.log("EEERRRRPPPRRR"+error)
})

MyContract.methods.taskToUser(address,0).call().then((res)=>{
	console.log(res)
}).catch((err)=>{
	console.log("ERRRRRRRRRRRRRRRRR"+err)
})

MyContract.methods.createTask("HI FROM WEB3 GGG").send({from: address},(err,res)=>{
	console.log(res)
})
