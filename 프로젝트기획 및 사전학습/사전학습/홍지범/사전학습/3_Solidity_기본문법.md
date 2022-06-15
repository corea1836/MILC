## Solidity 기본 문법



### 1. 솔리티디 컨트랙트 기본 구조

```solidity
// SPDX-License-Identifier: GPL-3.0 => 소스코드의 라이선스
pargma solidity >= 0.7.0 <0.9.0; // 소스코드가 사용하는 컴파일러 버전 명시(major, minor, patch)

contract Storage{

	uint256 number; // 상태변수(기본형, 구조체, 배열등이 있음)
	
	function store(uint256 num) public {
		number = num;
  } // 대다수의 솔리디티는 function을 통해 상태변수를 제어
	
	function retrieve() public view returns(uint256) {
			return number;
	}
}
```



### 자료형

- 기본형

  - 논리형

    bool

  - 정수형

    unit : 음수가 아닌 정수 = uint256

    int

  - 주소형

    address : 이더리움 주소 표현(CA)

  - 바이트형

    bytes# or byte[]

- 배열

- 매핑

  delete는 값을 지우는게 아니라 0으로 값을 초기화하는 것!

  매핑에 저장된 key 목록을 얻을 수 있는 방법은 제공하지 않음

- 스트럭트

  여러 자료형을 하나의 관점으로 묶어서 관리

- 함수

  - view : 값을 변경하지 않음(gas 필요 x) => 경제적 프로그래밍, view를 쓰지 않고 상태변수에 접근하면 컴파일시 경고가 뜸
  - pure : 상태변수가 필요 없음

- 제어문

  - if/else
  - for/while : 블록체인과 다르게 이더리움은 반복문이 있어 튜링 완전머신이 되었음. 무한 루프는 gas를 통해 통제(gas limit)

- 화폐 단위

  - wei : 기본 단위
  - gwei : wei * 10**9
  - Ether : wei * 10**18
  - 이더리움은 소수점을 허용하지 않음



### 접근 제어자

- private : 컨트랙트 내에서만 접근 가능 (직접 접근 불가능 public으로 호출 가능)

- internal : 현재 컨트랙트와 자식 컨트랙트에서 접근 가능 (얘만 상태변수에서 가질 수 없음, 나머지 접근 제어자들은 상태변수, 함수에서 가질 수 있음)

  ​				(컨트랙트 내부, 자식에서 호출 가능)

- public : 현재 컨트랙트, 자식 컨트랙트, 외부 컨트랙트 및 주소에서 접근 가능(모두에게 공개)

- external : 외부 컨트랙트와 주소에서 접근 가능(외부에서만 접근 가능)