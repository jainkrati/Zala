// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


/** 
 * @title Zala
 * @dev Invest for your goals
 */
 
contract Zala {

    uint public goalCounter;

    struct Goal {
        uint256 ID;
        string name; // weight is accumulated by delegation
        string kind;  // if true, that person already voted
        uint256 stakeAmount;
        uint256 startDateTime; 
        uint256 endDateTime; 
    }
    
    address public admin;
    mapping(address => Goal[]) public userWiseGoals;

    /** 
     * @dev records the admin
     */
    constructor() {
        admin = msg.sender;
        goalCounter = 1; 
    }

    function getUserGoals(address userWallet) public view returns(Goal[] memory) {
        return userWiseGoals[userWallet];
    }

    function createGoal(string calldata name, string calldata kind, uint durationInMonths) payable public {
        require(msg.value > 0, "value must be greater than 0");
        uint256 startTime = block.timestamp;
        userWiseGoals[msg.sender].push(Goal({
            ID : goalCounter,
            name: name,
            kind: kind, 
            stakeAmount: msg.value,
            startDateTime: startTime,
            endDateTime: startTime + (durationInMonths * 30 days) 
        }));
        goalCounter = goalCounter + 1;
    }


    function claimGoalReward(uint goalID) public returns(bool) {
        Goal[] storage goals = userWiseGoals[msg.sender];
        require(goals.length > 0, "no goals found");
        for (uint256 i = 0; i < goals.length - 1; i++) {
            Goal storage goal = goals[i];

            if (goal.ID == goalID) {
                require(block.timestamp < goal.endDateTime, "cannot withdraw before goal end date");
                address payable owner = payable(msg.sender);
                owner.transfer(goal.stakeAmount);
                return true;
            }
        }
        return false;
    }

}