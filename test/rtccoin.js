var RtcCoin = artifacts.require("./RtcCoin.sol");

async function getBalance(rtcCoin, account) {
    const ret = await rtcCoin.balances.call(account);
    return ret.toNumber();
}

contract('RtcCoin', function (accounts) {
    it("should put 10000 RtcCoin in the first account", async function () {
        const rtcCoin = await RtcCoin.deployed();
        const balance = await rtcCoin.balances.call(accounts[0]);

        assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });

    it("should put 10 RtcCoin in the first account", async function () {
        const initialSupply = 10;
        const rtcCoin = await RtcCoin.new(initialSupply);
        const balance = await rtcCoin.balances.call(accounts[0]);

        assert.equal(balance.valueOf(), initialSupply, `${initialSupply} wasn't in the first account`);
    });

    it("should send coin correctly", async function () {
        const rtcCoin = await RtcCoin.deployed();

        // Get initial balances of first and second account.
        const account_one_starting_balance = await getBalance(rtcCoin, accounts[0]);
        const account_two_starting_balance = await getBalance(rtcCoin, accounts[1]);

        const amount = 10;
        await rtcCoin.transfer(accounts[1], amount, { from: accounts[0] });

        // Get updated balances of first and second account.
        const account_one_ending_balance = await getBalance(rtcCoin, accounts[0]);
        const account_two_ending_balance = await getBalance(rtcCoin, accounts[1]);

        assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
        assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
});
