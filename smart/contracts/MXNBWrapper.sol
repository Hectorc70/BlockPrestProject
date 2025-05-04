// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title BlockPrest MXNB Wrapper
 * @notice Versión local de MXNB en cada cadena
 */
contract MXNBWrapper {
    mapping(address => uint256) public balances;
    address public hyperlaneAdapter;

    event TokensMinted(address indexed user, uint256 amount);

    constructor(address _adapter) {
        hyperlaneAdapter = _adapter;
    }

    function handle(uint32, bytes32, bytes calldata message) external {
        require(msg.sender == hyperlaneAdapter, "Only Hyperlane adapter");
        (address user, uint256 amount) = abi.decode(message, (address, uint256));
        balances[user] += amount;
        emit TokensMinted(user, amount);
    }
    function mint(address user, uint256 amount) external {
        // Lógica de control de acceso, por ejemplo, solo permitir a ciertos contratos o al admin
        require(msg.sender == address(this), "Unauthorized"); 
        balances[user] += amount;
        emit TokensMinted(user, amount);
    }
}