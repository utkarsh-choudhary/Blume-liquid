async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the contract factory for BLSToken
    const BLSToken = await ethers.getContractFactory("BLSToken");
    console.log("BLSToken factory:", BLSToken);

    // Deploy the BLS Token
    const blsToken = await BLSToken.deploy();
    console.log("Deploying BLS Token...");
    console.log("BLS Token address:", blsToken.address);
    console.log("BLS Token deployTransaction:", blsToken.deployTransaction);

    if (!blsToken.deployTransaction) {
        console.error("BLS Token deployment transaction is undefined");
        return;
    }

    try {
        // Wait for the BLS Token deployment to be mined
        const receipt = await blsToken.deployTransaction.wait();
        console.log("BLS Token deployed to:", blsToken.address);
        console.log("BLS Token deployment transaction hash:", blsToken.deployTransaction.hash);
        console.log("BLS Token deployment receipt:", receipt);
    } catch (error) {
        console.error("Error waiting for BLS Token deployment:", error);
        return;
    }

    // Get the contract factory for BlumeLiquidStaking
    const BlumeLiquidStaking = await ethers.getContractFactory("BlumeLiquidStaking");
    console.log("BlumeLiquidStaking factory:", BlumeLiquidStaking);

    // Deploy the Blume Liquid Staking contract
    const blumeLiquidStaking = await BlumeLiquidStaking.deploy(blsToken.address);
    console.log("Deploying Blume Liquid Staking...");
    console.log("Blume Liquid Staking address:", blumeLiquidStaking.address);
    console.log("Blume Liquid Staking deployTransaction:", blumeLiquidStaking.deployTransaction);

    if (!blumeLiquidStaking.deployTransaction) {
        console.error("Blume Liquid Staking deployment transaction is undefined");
        return;
    }

    try {
        // Wait for the Blume Liquid Staking deployment to be mined
        const stakingReceipt = await blumeLiquidStaking.deployTransaction.wait();
        console.log("Blume Liquid Staking deployed to:", blumeLiquidStaking.address);
        console.log("Blume Liquid Staking deployment transaction hash:", blumeLiquidStaking.deployTransaction.hash);
        console.log("Blume Liquid Staking deployment receipt:", stakingReceipt);
    } catch (error) {
        console.error("Error waiting for Blume Liquid Staking deployment:", error);
        return;
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Deployment script encountered an error:", error);
        process.exit(1);
    });
