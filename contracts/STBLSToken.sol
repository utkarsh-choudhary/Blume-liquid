// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract STBLSToken is ERC20 {
    constructor() ERC20("stBLS Token", "stBLS") {
        // Optionally mint initial supply to the deployer or some address
        // _mint(msg.sender, 1000000 * 10 ** decimals()); // Example
    }
}
