- eth_sendTransaction vs eth_getTransactionReceipt 이 둘은 어떻게 다른가?

  - transaction은 거래를 진행하기 위해 필요한 요청이고 TransactionReceipt는 요청이 성공하거나 실패했을때 그에 대한 정보들을 모두 모아놓은 것이다.

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

    

