import { ethers } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import VoteEvenOrOdd from "../artifacts/contracts/circuits/VoteEvenOrOdd.sol/VoteEvenOrOdd.json";

const voteAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const Home: NextPage = () => {
  const [voteResult, setVoteResult] = useState<{ even: number; odd: number }>({
    even: 0,
    odd: 0,
  });
  async function fetchVote() {
    if (typeof window.ethereum !== "undefined") {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = new ethers.Contract(
        voteAddress,
        VoteEvenOrOdd.abi,
        provider
      );
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
                  />
                </div>

                <p className="mt-2 text-sm text-gray-500">TODO: warning</p>
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
};

export default Home;
