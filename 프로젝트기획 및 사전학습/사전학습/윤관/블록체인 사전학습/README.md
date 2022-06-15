# 블록체인 사전학습

- 타원곡선전자서명 알고리즘(ECDSA, secp256k1)
- keccak-256 hashing 
  - 마지막 20byte가 계정주소가 된다.
- MetaMask Provider API 활용 실습

```solidity
1. ethereum 
=> Ethereum Provider(인스턴스) 확인

2. ethereum.isConnected() // boolean
=> 연결 여부 확인

3. ethereum.enable() // boolean
=> 계정 활성화해서 metamask 계정을 지갑에 연결하기

4. ethereum.selectedAddress // string
=> 활성화된 계정 주소 확인

5. 
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

ethereum.request(args: RequestArguments): Promise<unknown>;
=> RPC API 보내기

6.
ethereum.request({
    method:'eth_getBalance',
    params:['0xfbda10fb0ebf49ffe415335486cca827c843ab62','latest']
}).then(result => console.log(result));
=> eth_blockNumber RPC 요청하기, 지금 네트워크에 쌓여있는 블록이 몇 개인가?

7. parseInt('0xb7200e', 16)
=> 위 요청으로 받아온 값을 정수로 바꾸는 방법.

ethereum.request({
    method: 'eth_sendTransaction',
    params,
})
.then((result) => console.log(result))
```

![과제1(잔고확인)](C:\Users\SSAFY\Desktop\bootcamp2\0222_day1\과제1(잔고확인).PNG)

![image-20220222232115428](C:\Users\SSAFY\AppData\Roaming\Typora\typora-user-images\image-20220222232115428.png)

트랜잭션 호출(eth_sendTransaction)

![과제2.1 트랜잭션 호출](C:\Users\SSAFY\Desktop\bootcamp2\0222_day1\과제2.1 트랜잭션 호출.PNG)

트랜잭션 확인(eth_getTransactionReceipt)

![과제2.2 RPC API 결과확인](C:\Users\SSAFY\Desktop\bootcamp2\0222_day1\과제2.2 RPC API 결과확인.PNG)

- eth_sendTransaction vs eth_getTransactionReceipt 이 둘은 어떻게 다른가?

  - eth_sendTransaction 

    - 거래를 진행하기 위해서 필요한 모든 요청을 보내는 API입니다.

    ```javascript
    {
      "jsonrpc": "2.0",
      "result": "0xad2c28556657172a0c4726ad9667769c7bcbc346120f0ad71b0e8dad21551d55",
      "id": 0
    }
    ```

  - eth_getTransactionReceipt 

    - transaction에 성공하거나 실패한(완결된) 요청에 대한 서명된 증명서 정보를 제공해주는 API입니다.

    ```javascript
    {
      "jsonrpc": "2.0",
      "result": {
        "blockHash": "0x3aa6e537db2959447e40a52bc15165d4f0a21ed23594454e55759bbc0cfe7c53",
        "blockNumber": "0xb72865",
        "contractAddress": null,
        "cumulativeGasUsed": "0xa4c0",
        "effectiveGasPrice": "0x2e90edd000",
        "from": "0xfbda10fb0ebf49ffe415335486cca827c843ab62",
        "gasUsed": "0x52b8",
        "logs": [],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "status": "0x1",
        "to": "0x556fbd30dfd3de3943403178062a5dfb18662b6a",
        "transactionHash": "0xad2c28556657172a0c4726ad9667769c7bcbc346120f0ad71b0e8dad21551d55",
        "transactionIndex": "0x1",
        "type": "0x2"
      },
      "id": 0
    }
    ```

    

