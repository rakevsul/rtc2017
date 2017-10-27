# Ethereum Workshop RTC 2017

## First steps
### 1. Deploy the contract to `testrpc`
 - Open 2 consoles in this project directory
 - In the first console run `npm i`
 - When it's finished run in the second console `./node_modules/.bin/testrpc`
 - Back in the first console run `./node_modules/.bin/truffle deploy`
 
### 2. Start the UI
 - Run `./node_modules/.bin/webpack`
 - In a browser open `./build/app/index.html`
 
 
## Connect to the rtcnet private ethereum blockchain
 - Stop testrpc if it's running
 - `cd rtcnet`
 - Initialize the blockchain and create an account: `./rtcnet_init.sh`
 - Start mining the blockchain: `./rtcnet_miner.sh`
 - Wait to connect...
 - Publish your address to receive RtcCoins: https://docs.google.com/spreadsheets/d/1oF9Y6GmGtKlvHNjVvqH0U9SjJUll56NNekEruqqtdEA/edit?usp=sharing
 
### To send coins, you have to unlock your account
 - In a new window, open a geth console: `./rtcnet_console.sh`
 - In the geth console, unlock your account: `personal.unlockAccount(eth.accounts[0], null, 3600)` password is `123456`
 - Now send coins from the UI
