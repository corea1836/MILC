# 과제2

## 2.1 RPC API를 통해 데이터를 포함한 트랜잭션 보내기

1. "hello ethereum" 메세지를 포함하기 위한 코드 스니펫

![2](C:\Users\SSAFY\Desktop\특화프로젝트\bootcamp2\0222_day1\2.PNG)

2. MetaMask PlayGround에서 호출 전 화면

![3](C:\Users\SSAFY\Desktop\특화프로젝트\bootcamp2\0222_day1\3.PNG)

3. sign 화면

![4](C:\Users\SSAFY\Desktop\특화프로젝트\bootcamp2\0222_day1\4.PNG)

4. 호출 후 응답 화면

   ![5](C:\Users\SSAFY\Desktop\특화프로젝트\bootcamp2\0222_day1\5.PNG)

## 2.2 트랜잭션 호출 완료 후 결과로 받은 트랜잭션 해시 준비

1. 브라우저 콘솔에 수행한 명령어와 출력 결과 

   ![6](C:\Users\SSAFY\Desktop\특화프로젝트\bootcamp2\0222_day1\6.PNG)![6](C:\Users\SSAFY\Desktop\특화프로젝트\bootcamp2\0222_day1\7.PNG)

   (콘솔창 화면)

   ![8](C:\Users\SSAFY\Desktop\특화프로젝트\bootcamp2\0222_day1\8.PNG)

2. Transaction 과 Transaction Receipt의 다른 점과 쓰임

   ```
   Transaction은 변경될 수 없는 데이터로 트랜잭션이 성공하거나 실패한 Transaction의 수행 결과가 Transaction Receipt으로 저장된다. 즉, 완결된 트랜잭션에 대해서만 Transaction Receipt이 생성된다.
   따라서, Transaction Receipt에는 추가로 status, logs(트랜잭션 실행 중 생성된 로그 목록), logBloom(블룸 필터), cumulativeGasUsed(블록의 누적 가스 사용량), gasUsed(해당 트랜잭션의 가스 사용량) 정보를 포함한다.
   ```

   

3. Etherscan에 조회된 결과를 data가 확인되도록 캡쳐

![9](C:\Users\SSAFY\Desktop\특화프로젝트\bootcamp2\0222_day1\9.PNG)