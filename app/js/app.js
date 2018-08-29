'use strict';

const Web3 = require('web3');
const promisify = require('es6-promisify');
const truffleContract = require('truffle-contract');
const rtccoinJson = require('../../build/contracts/RtcCoin.json');

const USE_LOCAL_DEPLOYED = true;
const RTCNET_CONTRACT_ADDRESS = '0x29dfc4d6ed7b20a1bb6fb3411a8239913f2b5a42';

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
        writeLog('ERROR: No account found!');
        throw new Error('No account found!');
    }
    window.activeAccount = accounts[0];
    showAccount(window.activeAccount);

    await setContract(USE_LOCAL_DEPLOYED);

    showBalance();

    const logTransferEvent = window.rtcCoin.LogTransfer();
    logTransferEvent.watch((error, result) => {
        if (error) {
            writeLog(`ERROR: ${error}`);
        } else {
            writeLog(`${result.args.from} => ${result.args.to} : ${result.args.value}`);
            if (result.args.from === window.activeAccount || result.args.to === window.activeAccount) {
                showBalance();
            }
        }
    });
});

function writeLog(message) {
    console.log(message);
    document.getElementById('logArea').innerHTML += '\n' + message;
}

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
    try {
        await window.rtcCoin.transfer.sendTransaction(destAccount, amount, {
            from: window.activeAccount
        });
    } catch (error) {
        writeLog(`ERROR: ${error}`);
        throw error;
    }
}


