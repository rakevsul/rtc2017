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