// SPDX-License-Identifier: MIT
//이폴더에는 모든 스마트 컨트랙가 여기들어감
//비용이 많이드는게 아니니 그냥 이건 이대로 사용한다.
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
  address public owner = msg.sender;
  uint public last_completed_migration;

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
