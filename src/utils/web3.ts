import { ethers } from "ethers";
import VoteEvenOrOdd from "../artifacts/contracts/circuits/VoteEvenOrOdd.sol/VoteEvenOrOdd.json";

export const getVoteAddress = () => {
  return window.location.hostname === "localhost"
    ? process.env.NEXT_PUBLIC_VOTE_ADDRESS_LOCAL
    : process.env.NEXT_PUBLIC_VOTE_ADDRESS;
};

export const getProvider = () => {
  if (typeof window.ethereum === "undefined") {
    throw new Error("Metamask not installed!");
  }
  return window.location.hostname === "localhost"
    ? new ethers.providers.JsonRpcProvider()
    : new ethers.providers.Web3Provider(window.ethereum);
};
