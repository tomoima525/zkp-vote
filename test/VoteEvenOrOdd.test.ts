import { expect } from "chai";
import { ethers } from "hardhat";

describe("VoteEvenOrOdd", function () {
  it("Voted for Even", async function () {
    const VerifierContract = await ethers.getContractFactory("VoteEvenOrOdd");
    const verifier = await VerifierContract.deploy();
    const proof = {
      a: [
        "0x0abd8bdf28cd93481a5d5ec5f41b1fd57b8be44e5f9b06409d60f7d8a02eabdd",
        "0x29ee128be5ced0adbe8d89fdbd6e52b1d868b6c63a7f696084417fe1c6962dc4",
      ],
      b: [
        [
          "0x1c4b9665fb4b8407fd0d1bf1cba8e75a3d17debae9ba74f74f876e9f8912bd64",
          "0x00c55185acdb94534016894a3b0f75cf51fe1e346d7977a537c32f07370698fe",
        ],
        [
          "0x016575e38ead6ce4c6a5557d1b2116e9c46b4e4b6b735203a13340082e9ccef5",
          "0x219fe14bd6683d02cb1d05c536fbaf3ea0e4c35f46f6eb31d7da91021c3b9083",
        ],
      ],
      c: [
        "0x0c41da38540437e1093c7702bf9adb02751d78276d225a7076a2ae8659d2f867",
        "0x0fe39464e18d566d247dba4d0f0811b3c514c421bc72bba528e94a8ac9cc93f8",
      ],
    };
    const input = [
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    ];
    await verifier.vote(proof.a, proof.b, proof.c, input);
    expect(await verifier.votes(0)).to.equal(1);
    expect(await verifier.votes(1)).to.equal(0);
  });

  it("Vote for Odd", async function () {
    const VerifierContract = await ethers.getContractFactory("VoteEvenOrOdd");
    const verifier = await VerifierContract.deploy();
    const proof = {
      a: [
        "0x142bb57ad2129f540e23a899f089edbd33dd524b920c58701d80761e92c8c32c",
        "0x10c6b5db2bff19ff25b13364f5585a7c7f554e0c4705b00b1599685c7428c6d2",
      ],
      b: [
        [
          "0x21f38a07032baa9e3de811703985fa06b972f8438ac4ec4b43147d7d81dced9b",
          "0x049e218d4d51dc1ba324bfab9d4a3bc645bda88d077e7f3767551734924339c1",
        ],
        [
          "0x27d271dbb5bdd954bd50cf8de0dcb8868ebb9689016d26fb11b0b2caebe91741",
          "0x283e74cad8016d875a40a2183287ab727b836a806555acc8bb658304b63ecbe4",
        ],
      ],
      c: [
        "0x04ee46a759abf21853305b083bc79ce6f826d0f15abce2cfab2c0006a3b09831",
        "0x1be0a65fd96de4af600d3ad4179e1168005ec15e93f1d4d8bbeef50cb3a8b137",
      ],
    };
    const input = [
      "0x0000000000000000000000000000000000000000000000000000000000000001",
    ];
    await verifier.vote(proof.a, proof.b, proof.c, input);
    expect(await verifier.votes(0)).to.equal(0);
    expect(await verifier.votes(1)).to.equal(1);
  });
});
