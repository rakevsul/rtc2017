'use strict';

const Web3 = require('web3');
const promisify = require('es6-promisify');
const truffleContract = require('truffle-contract');
const rtccoinJson = require('../../build/contracts/RtcCoin.json');

require('file-loader?name=../index.html!../index.html');

if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
} else {
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

const getAccountsPromise = promisify(web3.eth.getAccounts);

const RtcCoin = truffleContract(rtccoinJson);
RtcCoin.setProvider(web3.currentProvider);

window.addEventListener('load', async () => {

    document.getElementById("sendButton").addEventListener('click', sendFormSubmit);

    const accounts = await getAccountsPromise();
    if (accounts.length === 0) {
        throw new Error('No account with which to transact');
    }
    window.activeAccount = accounts[0];
    showAccount(window.activeAccount);

    const instance = await RtcCoin.deployed();
    window.rtcCoin = RtcCoin.at(instance.contract.address);
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


