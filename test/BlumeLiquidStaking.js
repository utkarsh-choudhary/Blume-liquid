const { expect } = require("chai");

describe("Blume Liquid Staking", function () {
    let blsToken, blumeLiquidStaking, owner, addr1;

    beforeEach(async function () {
        const BLSToken = await ethers.getContractFactory("BLSToken");
        const BlumeLiquidStaking = await ethers.getContractFactory("BlumeLiquidStaking");
        [owner, addr1] = await ethers.getSigners();

        blsToken = await BLSToken.deploy();
        await blsToken.deployed();

        blumeLiquidStaking = await BlumeLiquidStaking.deploy(blsToken.address);
        await blumeLiquidStaking.deployed();

        await blsToken.transfer(owner.address, ethers.utils.parseEther("1000"));
    });

    it("Should deploy and allow staking of BLS tokens", async function () {
        await blsToken.approve(blumeLiquidStaking.address, ethers.utils.parseEther("100"));
        await blumeLiquidStaking.stake(ethers.utils.parseEther("100"));

        const stBLSTokens = await blumeLiquidStaking.balanceOf(owner.address);
        expect(stBLSTokens).to.equal(ethers.utils.parseEther("100"));

        const ownerBLSBalance = await blsToken.balanceOf(owner.address);
        expect(ownerBLSBalance).to.equal(ethers.utils.parseEther("900"));
    });

    it("Should allow unstaking of stBLS tokens", async function () {
        await blsToken.approve(blumeLiquidStaking.address, ethers.utils.parseEther("100"));
        await blumeLiquidStaking.stake(ethers.utils.parseEther("100"));

        await blumeLiquidStaking.unstake(ethers.utils.parseEther("100"));

        const stBLSTokensAfterUnstake = await blumeLiquidStaking.balanceOf(owner.address);
        expect(stBLSTokensAfterUnstake).to.equal(ethers.utils.parseEther("0"));

        const ownerBLSBalanceAfterUnstake = await blsToken.balanceOf(owner.address);
        expect(ownerBLSBalanceAfterUnstake).to.equal(ethers.utils.parseEther("1000"));
    });
});
