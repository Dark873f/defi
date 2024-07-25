import React, { useState } from 'react';
import Web3 from 'web3';
import contractABI from './contractABI';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contract = new web3.eth.Contract(contractABI, contractAddress);

const Loan = () => {
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [duration, setDuration] = useState('');

  const handleCreateLoan = async () => {
    const accounts = await web3.eth.requestAccounts();
    await contract.methods.createLoan(
      web3.utils.toWei(amount, 'ether'),
      web3.utils.toWei(interest, 'ether'),
      duration
    ).send({ from: accounts[0] });
  };

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Loan amount"
      />
      <input
        type="text"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        placeholder="Interest amount"
      />
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Loan duration (seconds)"
      />
      <button onClick={handleCreateLoan}>Create Loan</button>
    </div>
  );
};

export default Loan;
