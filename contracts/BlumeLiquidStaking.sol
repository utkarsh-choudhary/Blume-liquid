// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./STBLSToken.sol";

contract BlumeLiquidStaking {
    IERC20 public blsToken;
    STBLSToken public stBLS; // Updated to use the concrete STBLSToken contract

    mapping(address => uint256) public stakes;

    constructor(address _blsTokenAddress) {
        blsToken = IERC20(_blsTokenAddress);
        stBLS = new STBLSToken(); // Instantiate the STBLSToken contract
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        blsToken.transferFrom(msg.sender, address(this), amount);
        stakes[msg.sender] += amount;
        stBLS.transfer(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(stakes[msg.sender] >= amount, "Insufficient stake");
        stakes[msg.sender] -= amount;
        stBLS.transferFrom(msg.sender, address(this), amount);
        blsToken.transfer(msg.sender, amount);
    }

    function balanceOf(address account) external view returns (uint256) {
        return stBLS.balanceOf(account);
    }
}
