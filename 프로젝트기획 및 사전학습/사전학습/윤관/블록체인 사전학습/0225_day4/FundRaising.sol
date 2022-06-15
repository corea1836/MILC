// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

/**
 * Day 4. Base Code for Practice 
 */
contract FundRaising {
    uint public constant MINIMUM_AMOUNT = 1e16;
    uint public fundRaisingCloses;
    address public beneficiary;
    
    constructor (uint _duration, address _beneficiary) {
       fundRaisingCloses = block.timestamp + _duration;
       beneficiary = _beneficiary;
    }

    mapping(address => uint256) amountOfFunder;
    
    // 모금 함수
    // 1. 0.01ether 이상으로 모금에 참여할 수 있다.
    // 2. 지정된 모금 시간 이내에만 참여할 수 있다.
    // 3. 모금이 완료되면 모금자를 저장한다.

    // 모금자를 저장하기 위한 배열
    // uint[4] => fixedArray;, uint[] => dynamicArray, push() => 마지막에 요소추가
    address[] funders;

    // payable => 이 함수를 호출할때는 이더를 넣어서 보내라는 함수
    // msg.value 트랜잭션에 이더를 얼마나 보냈는지 알 수 있는 전역변수
    function fund() public payable{
    //     // 전송한 이더가 최소 금액 조건을 만족하는지
    //     if(msg.value >= MINIMUM_AMOUNT) {
    //         // 모금 유효시간인지 판별하기
    //         if(block.timestamp < fundRaisingCloses) {
                
    //        }
    //    }

        // *** solidity에서는 유효성 체크 함수인 require을 if문 대신 사용하는 것을 권장한다.
        // 뒤에 ""안에 내용은 에러메시지를 받게 된다.
        require(msg.value >= MINIMUM_AMOUNT, "MINIMUM_AMOUNT: 0.01 ether");
        require(block.timestamp < fundRaisingCloses, "FUND RAISING CLOSED");
        // msg.sender 보내는 사람의 주소
        address funder = msg.sender;
        funders.push(funder);
    }

    // 현재 모금액 함수
    // 1. 현재까지 모금된 금액을 누구나 확인할 수 있다.
    // 상태를 변경시키지 않으므로 view 사용해서 gas 사용x
    function currentCollection() public view returns(uint256) {
            if(address(this) == address(0)) return 0;
            return address(this).balance;
       }
    

    //  모금액 수령 함수
    // 1. 지정된 수령자만 호출할 수 있다.
    // 2. 모금 종료 이후에만 호출할 수 있다.
    // 3. 수령자에게 컨트랙트가 보유한 이더를 송금한다.

    // modifier을 통해 아래 유효성 체크 내용을 여러군데에서 재사용 가능.
    modifier onlyBeneficiary() {
        require(msg.sender == beneficiary);
        // 아래 언더바는 위 유효성체크를 진행하고 다시 함수로 돌아간다는 의미. 꼭 있어야함.
        _; 
    }

    // withdraw 함수는 모금이 끝난 후에 정상 수행되어야 함을 의미한다.
    modifier onlyAfterFundCloses() {
        require(block.timestamp > fundRaisingCloses, "FUND IS STILL OPENED");
        _;
    }

    // 이더 송금이 이루어지므로 payable사용
    function withdraw() public payable 
        // 유효성 체크(기존에는 이렇게 하지만 Modifier 사용가능)
        // require(msg.sender == beneficiary);
        // require(block.timestamp > fundRaisingCloses);

        // 이렇게 유효성 체크를 해야한다는 것을 더 앞에서 modifier로 체크
    onlyBeneficiary
    onlyAfterFundCloses {
        // <address>.balance라고 하면 컨트랙트가 보유한 이더 조회가능
        // 아래 <address payable>.transfer은 요청 주소에 보유 이더 송금
        // send, transfer은 payable이어야 한다는 에러 발생 때문에 payable로 sender을 묶어준다.
        payable(msg.sender).transfer(address(this).balance);
    }
    

    

    function selectRandomFunder() public view returns (address, uint256) {
        if(funders.length == 0) return (address(0), 0);

        bytes32 randomFunder = keccak256(abi.encodePacked(blockhash(block.number)));
        address selectedFunder = (funders.length == 1) ? funders[0] : funders[uint(randomFunder) % funders.length];
        return (selectedFunder, amountOfFunder[selectedFunder]);

    }

}

