#!/bin/bash

GETH=~/"Library/Application Support/Mist/binaries/Geth/unpacked/geth"

# Initialize the data dir. Only needs to be run once.
"$GETH" --datadir ~/Library/Ethereum/rtcnet init ./rtc_genesis.json

"$GETH" --datadir ~/Library/Ethereum/rtcnet --password ./password.txt account new
