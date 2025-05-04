// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./Reputation.sol";
import "./MXNBWrapper.sol";

/**
 * @title BlockPrest LoanPool
 * @notice Gestión de préstamos grupales
 */
contract LoanPool {
    MXNBWrapper public mxnb;
    Reputation public reputation;

    struct LoanGroup {
        address[] members;
        uint256 totalAmount;
        uint256 term;
        uint256 startDate;
    }
    
    mapping(bytes32 => LoanGroup) public loanGroups;
    uint256 public groupCounter;

    event LoanCreated(bytes32 groupId, address[] members);

    constructor(address _mxnbWrapper, address _reputation) {
        mxnb = MXNBWrapper(_mxnbWrapper);
        reputation = Reputation(_reputation);
    }

    function createLoanGroup(
        address[] calldata members,
        uint256 amountPerMember,
        uint256 termInMonths
    ) external returns (bytes32 groupId) {
        uint256 totalAmount = amountPerMember * members.length;
        require(mxnb.balances(address(this)) >= totalAmount, "Insufficient funds");
        
        groupId = keccak256(abi.encode(members, block.timestamp));
        loanGroups[groupId] = LoanGroup({
            members: members,
            totalAmount: totalAmount,
            term: termInMonths,
            startDate: block.timestamp
        });
        groupCounter++;
        
        for (uint i = 0; i < members.length; i++) {
            // mxnb.balances[members[i]] += amountPerMember;
            mxnb.mint(members[i], amountPerMember);
            reputation.updateScore(members[i], true); // Buen historial inicial
        }
        
        emit LoanCreated(groupId, members);
    }
}