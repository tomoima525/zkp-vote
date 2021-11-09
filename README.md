# Zero Knowledge Proof Voting Contract

Even or Odd voting smart contract using Zero Knowledge Proof(zkSNARKs) on Ethereum. Zero Knowledge Proof allows you to vote with privacy.

The number you used for voting is hidden; Only the result is verified by zkSNARKs and stored on the blockchain.



https://user-images.githubusercontent.com/6277118/140975106-735b1803-627e-464c-9d5f-3475f64a9d49.mov



Example of transaction result: https://ropsten.etherscan.io/tx/0x9447fd2e774b7a9bc465806d69539b53b8bc0d388edaa1eea2a76590f608fa29

## Try it out

https://zkp-vote-tomoima525.vercel.app/

**Make sure that you are connected to Ropsten network and have some ether in your account**

<img src="https://user-images.githubusercontent.com/6277118/140975326-02107676-1e37-4357-9df8-9437bc6e7da3.png" width=200px />

## How does this work?

[Zokrates](https://github.com/Zokrates/ZoKrates) is used for Zero Knowledge Proof. Here's the steps:

1. Compute `witness` by [calculating Even or Odd](https://github.com/tomoima525/zkp-toy/blob/main/src/pages/index.tsx#L84) using a program compiled with zokrates-js.
2. Using `witness` and the `proving.key` provided by the verifier(in this project, proving.key is in https://github.com/tomoima525/zkp-toy/blob/main/public/proving.key), we generate `proof` and `inputs`
3. Submit tranactions to the blockchain. After the zkSNARKs-powered smart contract [verifies your `proof` and `inputs`](https://github.com/tomoima525/zkp-toy/blob/main/contracts/circuits/VoteEvenOrOdd.sol#L359), it will update the stored result.

The figure below illustrates the flow  

<img width="1226" alt="zk-figure" src="https://user-images.githubusercontent.com/6277118/140989020-222129df-cfad-48b3-9ad4-b41013765465.png">


## Run locally

We use hardhat for deployment and testing

- Run `yarn install`
- Start the local node
  ```
  $ npx hardhat node
  ```
- Deploy the smart contract to your local network
  ```
  $ npx hardhat run --network localhost scripts/deploy.ts
  ...
  VoteEvenOrOdd deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
  ```
- Create `.env.local` file under the root of the project and copy the deployed address
  ```
  NEXT_PUBLIC_VOTE_ADDRESS_LOCAL=0x5FbDB2315678afecb367f032d93F642f64180aa3
  ```
- Start the frontend
  ```
  $ yarn run dev
  ```

## Running test

```
$ npx hardhat test
```

## Setup your own proving.key

You can provide your own proving.key by running Zokrates locally. **You also need to generate one when you change your program code**

- You need Docker!! E.g. https://docs.docker.com/desktop/mac/install/
- After installing Docker, run the command below to start zokrates with the root directory set to the contracts repository
  ```
  $ docker run -v <path for circuits locally>:/home/zokrates/code -ti zokrates/zokrates /bin/bash
  ```
  e.g.
  ```
  $ docker run -v ~/workspace/solidity/zkp-toy/contracts/:/home/zokrates/code -ti zokrates/zokrates /bin/bash
  ```
- Run the command below to generate the proving.key and the verification.key
  ```
  $ zokrates setup
  ```
- Upload proving.key somewhere accessible
- Update the download link at https://github.com/tomoima525/zkp-toy/blob/main/src/pages/index.tsx#L175
  ```
  const res = await fetch("https://your-public.site/proving.key");
  ```
