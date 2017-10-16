#!/bin/bash

GETH=~/"Library/Application Support/Mist/binaries/Geth/unpacked/geth"
#GETH=~/.config/Mist/binaries/Geth/unpacked/geth

# Initialize the data dir. Only needs to be run once.
"$GETH" --datadir ./chain-data init ./rtc_genesis.json

"$GETH" --datadir ./chain-data --password ./password.txt account new
