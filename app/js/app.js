'use strict';

const Web3 = require('web3');
const promisify = require('es6-promisify');
const truffleContract = require('truffle-contract');
const rtccoinJson = require('../../build/contracts/RtcCoin.json');

const USE_LOCAL_DEPLOYED = true;
const RTCNET_CONTRACT_ADDRESS = '0xa867a46c883331318a5801d9d24a29587420072e';

require('file-loader?name=../index.html!../index.html');

if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
} else {
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

const getAccountsPromise = promisify(web3.eth.getAccounts);

const RtcCoin = truffleContract(rtccoinJson);
RtcCoin.setProvider(web3.currentProvider);

async function setContract(localDeployed) {
    let contractAddress;
    if (localDeployed) {
        const instance = await RtcCoin.deployed();
        contractAddress = instance.contract.address;
        console.log(`Using locally deployed RtcCoin contract address = ${contractAddress}`);
    } else {
        contractAddress = RTCNET_CONTRACT_ADDRESS;
        console.log(`Using provided RtcCoin contract address = ${contractAddress}`);
    }
    window.rtcCoin = RtcCoin.at(contractAddress);
    document.getElementById('contractAddress').innerHTML = contractAddress;
}

window.addEventListener('load', async () => {

    document.getElementById("sendButton").addEventListener('click', sendFormSubmit);

    const accounts = await getAccountsPromise();
    if (accounts.length === 0) {
        throw new Error('No account with which to transact');
    }
    window.activeAccount = accounts[0];
    showAccount(window.activeAccount);

    await setContract(USE_LOCAL_DEPLOYED);

    showBalance();

    const logTransferEvent = window.rtcCoin.LogTransfer();
    logTransferEvent.watch((error, result) => {
        if (error) {
            console.error(error);
        } else {
            const log = `${result.args.from} => ${result.args.to} : ${result.args.value}`;
            console.log(log);

            document.getElementById('logArea').innerHTML += '\n' + log;
            if (result.args.from === window.activeAccount || result.args.to === window.activeAccount) {
                showBalance();
            }
        }
    });
});

async function showAccount(accountNumber) {
    document.getElementById('accountNumber').innerHTML = accountNumber;
}

async function showBalance() {
    document.getElementById('balance').innerHTML = await getBalance(window.rtcCoin, window.activeAccount);
}

async function getBalance(rtcCoin, account) {
    const ret = await rtcCoin.balances.call(account);
    return ret.toNumber();
}

async function sendFormSubmit() {
    const amount = document.getElementById("sendAmount").value;
    const destAccount = document.getElementById("destAccount").value;
    if (destAccount && amount) {
        sendCoin(destAccount, amount);
    }

    document.getElementById("sendForm").reset();
}

async function sendCoin(destAccount, amount) {
    window.rtcCoin.transfer.sendTransaction(destAccount, amount, {
        from: window.activeAccount
    });
}


