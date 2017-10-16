#!/bin/bash

GETH=~/"Library/Application Support/Mist/binaries/Geth/unpacked/geth"

# Run geth
"$GETH" --datadir ./rtcnet-data --networkid 7777 --rpc --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "eth,net,web3" attach ipc:./rtcnet-data/geth.ipc

# Unlock an account with:
# personal.unlockAccount(eth.accounts[0])