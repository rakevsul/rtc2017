#!/bin/bash

GETH=~/"Library/Application Support/Mist/binaries/Geth/unpacked/geth"
#GETH=~/.config/Mist/binaries/Geth/unpacked/geth

# Run geth
"$GETH" --datadir ./chain-data --networkid 7777 attach ipc:./chain-data/geth.ipc

# Unlock an account with:
# personal.unlockAccount(eth.accounts[0], null, 3600)
