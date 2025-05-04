// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title BlockPrest Reputation
 * @notice Sistema de puntuación crediticia
 */
contract Reputation {
    mapping(address => uint256) public creditScore;
    
    event ScoreUpdated(address user, uint256 newScore);

    function updateScore(address user, bool onTimePayment) external {
        if (onTimePayment) {
            creditScore[user] += 50;
        } else {
            creditScore[user] = creditScore[user] > 100 ? creditScore[user] - 100 : 0;
        }
        emit ScoreUpdated(user, creditScore[user]);
    }

    function getCreditLevel(address user) external view returns (string memory) {
        uint256 score = creditScore[user];
        if (score >= 800) return "AAA";
        if (score >= 600) return "AA";
        if (score >= 400) return "A";
        return "B";
    }
}