#!/bin/bash

GETH=~/"Library/Application Support/Mist/binaries/Geth/unpacked/geth"

# Run geth
"$GETH" --datadir ~/Library/Ethereum/rtcnet --networkid 7777 --rpc --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "eth,net,web3" --ipcpath ~/Library/Ethereum/geth.ipc --mine --minerthreads=1 --etherbase 0
