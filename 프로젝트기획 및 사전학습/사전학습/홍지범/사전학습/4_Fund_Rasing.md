## FundRasing 구현



### Fundraise란? : 모금(전달되는 과정을 추적 가능)



### 기능

- 일회성으로 동작하는 모금 컨트랙트
- 일정 기간 동안만 모금에 참여 가능
- 상세 기능
  - 모금
  - 현재 모금액 확인
  - 모금액 수령 기능

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.7.0 <0.9.0;

contract FundRasing {

    // 초기 상태 변수 설정
    uint public constant MINUMUN_AMOUNT = 1e16; // 최소 모금액 기준 0.01 ether
    uint public fundRasingCloses; // 모금 종료 시각 3600초 = 1시간
    address public beneficiary; // 모금 수령자
    address[] funders;
    // 자료형 배열
    // uint[4] fixedArray;
    // uint[] dynamicArray;
    // push() : 배열의 가장 뒤에 요소 추가

    constructor (uint _duration, address _beneficiary) {
        fundRasingCloses = block.timestamp + _duration;
        // block.timestamp - 현재 블록의 유닉스 타임스탬프 값 = 이 트랜잭션이 블록에 담길 때 시간
        beneficiary = _beneficiary;
    }

    // 필수 함수
    // 1. 모금
    // 2. 현재 모금액
    // 3. 모금액 수령

    // 모금 요구사항

    // 1. 0.01 ether 이상만 모금에 참여 가능 => payable함수를 통해 해당 함수를 호출할 때 이더를 꼭 넣야만 호출 가능
    //                                    msg.value를 통해 이 함수를 호출한 사람이 얼마의 이더를 보냈는지 확인(전역 변수)
    // 2. 지정된 모금 시간 이내에만 참여 가능
    // 3. 모금이 완료되면 모금자 지정
    function fund() public payable{ 
        // if(msg.value >= MINUMUN_AMOUNT) {
        //     if(block.timestamp < fundRasingCloses) {

        //     }
        // }

        // 유효성 체크 함수 require(판별문, "에러 메세지");
        // 해당 함수에 들어가기 전에 사전에 먼제 체크 후 true가 아닐시 에러 메세지 출력 후 함수 바로 종료 => 가스 낭비 방지
        require(msg.value >= MINUMUN_AMOUNT, "MINIMUM AMOUNT : 0.01 ether");
        require(block.timestamp < fundRasingCloses, "FUND RASING CLOSED");
        address funder = msg.sender; // 메세지 보내는 사람의 주소
        // address : 이더리움 주소를 저장할 수 있는 자료형, 초기값은 0x0
        // msg.value : 보낸 이더의 수량, 값
        funders.push(funder);
    }

    // 현재 모금액 요구사항
    // 1. 현재까지 모금된 금액을 누구나 확인 가능
    // 2. 수의 반환값
    function currentCollection() public view 
    // view : 상태 변수에 변화를 가하지 않고 읽기만 하는 함수(가스 사용 x)
    returns(uint256){
            return address(this).balance;
            // address(this).balance : 이 주소가 가지고 있는 총 이더의 양(약속된 변수)
        }


    // 자주 사용되는 함수는 modifier을 통해 호출될때마다 함수 안의 문장이 선언되도록 함
    // _; => 다시 함수로 돌아간다.

    modifier onlyBeneficiary() {
        require(msg.sender == beneficiary);
        _;
    }

    // 모금액 수령 요구사항
    // 1. 지정된 수령가만 호출할 수 있음
    // 2. 모금 종료 이후에만 호출할 수 있음
    // 3. 수령자에게 컨트랙트가 보유한 이더를 송금
    function withdraw() public payable 
        // payable은 이더 전송이 일어날 때 사용하는 함수
        // require(msg.sender == beneficiary);
        // require(block.timestamp > fundRasingCloses);
    onlyBeneficiary {    
            require(block.timestamp > fundRasingCloses, "FUND RASING CLOSED");
            payable(msg.sender).transfer(address(this).balance);
            // 받는사람.transfer(보내는 금액)
            // <address payalble>.transfer(uint256 amount)

            // address(this).balance : 이 컨트랙트가 보유한 이더
            // <address>.balance 
    }
}
```

