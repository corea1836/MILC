pragma solidity >=0.4.22 <0.9.0;

contract Lottery{//객체의 느낌이군

    address public owner;//public 은 자동 getter생성

    constructor() public{
        owner = msg.sender;//보낸사람을 owner로 저장하겠다
        
    }//배포시 가장먼저 실행되는 함수

    function getSome() public pure returns (uint256 value){
        return 5;
    }
}

//코드를 쓴만큼 gas비용 증가