import { ethers } from "ethers";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import VoteEvenOrOdd from "../artifacts/contracts/circuits/VoteEvenOrOdd.sol/VoteEvenOrOdd.json";
import { useZokrates } from "../contexts/ZokratesContext";
import { arrayBufferToBase64, base64ToArrayBuffer } from "../utils/converter";
import { getProvider, getVoteAddress } from "../utils/web3";

interface HomeProps {
  proveKeyString: string;
  programString: string;
}

function Home({ proveKeyString, programString }: HomeProps) {
  const [provider, setProvider] =
    useState<ethers.providers.JsonRpcProvider | null>(null);
  const [voteResult, setVoteResult] = useState<{ even: number; odd: number }>({
    even: 0,
    odd: 0,
  });
  const [amount, setAmount] = useState<string | null>(null);
  const zk = useZokrates();

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchVote() {
    if (typeof window.ethereum !== "undefined") {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = getProvider();
      const contract = new ethers.Contract(
        getVoteAddress(),
        VoteEvenOrOdd.abi,
        provider
      );
      setProvider(provider);
      try {
        const even = await contract.votes(0);
        const odd = await contract.votes(1);
        setVoteResult({ even, odd });
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  useEffect(() => {
    fetchVote();
  }, []);

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setAmount(e.target.value);
    } else {
      setAmount(null);
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!zk) {
      console.log("ZK not ready");
      return;
    }
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        getVoteAddress(),
        VoteEvenOrOdd.abi,
        signer
      );
      try {
        console.log("ZK compile");
        // compilation
        const artifacts = zk.compile(programString);
        console.log("ZK artifacts");
        const { witness, output } = zk.computeWitness(artifacts, [amount]);
        console.log("ZK witness");
        // generate proof
        const proveKey = base64ToArrayBuffer(proveKeyString);
        console.log("ProveKey", proveKey.byteLength);
        const { proof, inputs } = zk.generateProof(
          artifacts.program,
          witness,
          proveKey
        );
        console.log("ZK proof", { proof });
        const transaction = await contract.vote(
          proof.a,
          proof.b,
          proof.c,
          inputs
        );
        await transaction.wait();
        fetchVote();
      } catch (e) {
        console.log("Error", e);
      }
    }
  };

  return (
    <div className="flex-auto">
      <Head>
        <title>ZKP Vote</title>
        <meta name="description" content="PoC of ZKP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-6">
        <p className="text-4xl font-bold pb-8">Vote: Even or Odd?</p>
        <form action="#" method="POST">
          <div className="shadow rounded-md overflow-hidden ">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                <div className="block text-sm font-medium text-gray-700 pb-2">
                  {`Input even number(0,2,4...) or odd number(1,3,...) and vote!\n
                  Your voted number will not be logged on blockchain but the
                  vote result will be updated.`}
                </div>
                <div className="md:col-span-1">
                  <input
                    id="x"
                    name="x"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 my-2 block sm:text-sm border border-gray-300 rounded-md p-2"
                    placeholder="Input value 0 - 255"
                    inputMode="numeric"
                    onChange={handleChangeAmount}
                  />
                </div>

                <p className="mt-2 text-sm text-gray-500">TODO: warning</p>
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                onClick={handleSubmit}
                disabled={amount === null}
              >
                Vote
              </button>
            </div>
            <div className="p-4 bg-gray-50 sm:px-6 m-3 rounded-md">
              <p className="text-xl font-bold pb-8">Result</p>
              <div className="grid grid-cols-2">
                <div className="col-span-1 justify-self-auto">
                  <div className="text-center text-base">Even</div>
                  <div className="text-center text-4xl font-bold p-3">
                    {voteResult.even}
                  </div>
                </div>
                <div className="col-span-1 justify-self-auto">
                  <div className="text-center text-base">Odd</div>
                  <div className="text-center text-4xl font-bold p-3">
                    {voteResult.odd}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    "https://github.com/tomoima525/zkp-toy/raw/main/public/proving.key"
  );
  const arrayBuffer = await res.arrayBuffer();

  const proveKeyString = arrayBufferToBase64(arrayBuffer);

  const res2 = await fetch(
    "https://github.com/tomoima525/zkp-toy/raw/main/public/voteEvenOrOdd.zok"
  );

  const programString = await res2.text();

  return {
    props: {
      proveKeyString,
      programString,
    },
  };
};

export default Home;
