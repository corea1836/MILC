## Smart Contract

: 한글이나 영어같은 특정 언어가 아닌 코드(숫자)로 명시된 서약들의 집합

서로 참여한 사람들끼리의 약속이기때문에 법적 맥락은 없음

블록체인이기 때문에 신뢰성을 보장



### 블록체인에서의 정의 : 블변의 컴퓨터 프로그램

- 컴퓨터 프로그램
- 불변 : 한 번 배포되면 변경 불가
- 결정적 실행한 결과가 모두 같음(IO가 모두 동일)
- EVM 위에서 동작(가상환경)
- 탈중앙화된 World Computer 동일한 상태를 유지



### Smart Contract 를 작성하는 언어

- **Solidity**
- LLL
- Viper
- Assembly



### Smart Contract 배포와 호출

1. Smart Contract Code => 컴파일
2. EVM Bytecode, ABI in JSON => 트랜잭션 설정
3. { from : ~, to : ~, data : bytecode, } => 서명
4. Sending transaction
5. 클라이언트 => CA(Contract Address)와 ABI를 통해 함수 호출