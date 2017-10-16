#!/bin/bash

GETH=~/"Library/Application Support/Mist/binaries/Geth/unpacked/geth"

# Initialize the data dir. Only needs to be run once.
"$GETH" --datadir ./rtcnet-data init ./rtc_genesis.json

"$GETH" --datadir ./rtcnet-data --password ./password.txt account new
