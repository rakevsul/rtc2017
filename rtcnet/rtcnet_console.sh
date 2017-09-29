#!/bin/bash

GETH=~/"Library/Application Support/Mist/binaries/Geth/unpacked/geth"

# Initialize the data dir. Only needs to be run once.
"$GETH" --datadir ~/Library/Ethereum/rtcnet init ./rtc_genesis.json

# Run geth
"$GETH" --datadir ~/Library/Ethereum/rtcnet --networkid 7777 --rpc --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "eth,net,web3" --ipcpath ~/Library/Ethereum/geth.ipc console

# Create an account in the console:
# personal.newAccount()