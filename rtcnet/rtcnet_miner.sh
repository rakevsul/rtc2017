#!/bin/bash

GETH=~/"Library/Application Support/Mist/binaries/Geth/unpacked/geth"
#GETH=~/.config/Mist/binaries/Geth/unpacked/geth

#BOOTNODE="enode://6af33d093481495ffe7b1fef9b4ac380d29149c47766be7b8eee5e04d45c09967860d7b37533647ac44464ac4e3ddd6976b204ce160164988ffe2a5fc7a03d6b@192.168.1.132:30303"
BOOTNODE="enode://10293616f82ec8dfc743e31a593850f479ad1287286e677a3c7f6c47c12f24c4d2c59bc44cb9957464ae378b114220c4f5be22675568fde93e71bdc3d347621a@10.49.32.161:30303"

# Run geth
"$GETH" --datadir ./chain-data  --networkid 7777 --rpc --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "eth,net,web3" --mine --minerthreads=1 --etherbase 0 --bootnodes=${BOOTNODE} --fast
