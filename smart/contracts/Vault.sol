// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./Reputation.sol";

/**
 * @title BlockPrest Vault
 * @notice Banco de rendimientos para inversores
 */
contract Vault {
    Reputation public reputation;
    mapping(address => uint256) public stakedBalance;
    uint256 public baseAPY = 8; // 8% base
    
    event Staked(address user, uint256 amount);
    event RewardClaimed(address user, uint256 amount);

    constructor(address _reputation) {
        reputation = Reputation(_reputation);
    }

    function stake(uint256 amount) external {
        stakedBalance[msg.sender] += amount;
        emit Staked(msg.sender, amount);
    }

    function calculateReward(address user) public view returns (uint256) {
        uint256 baseReward = (stakedBalance[user] * baseAPY) / 100;
        string memory creditLevel = reputation.getCreditLevel(user);
        
        if (keccak256(bytes(creditLevel)) == keccak256(bytes("AAA"))) {
            return baseReward + (baseReward * 5 / 100); // +5% bonus
        } else if (keccak256(bytes(creditLevel)) == keccak256(bytes("AA"))) {
            return baseReward + (baseReward * 3 / 100); // +3% bonus
        }
        return baseReward;
    }
}