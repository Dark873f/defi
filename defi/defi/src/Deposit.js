import React, { useState } from 'react';
import Web3 from 'web3';
import contractABI from './contractABI';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contract = new web3.eth.Contract(contractABI, contractAddress);

const Deposit = () => {
  const [amount, setAmount] = useState('');

  const handleDeposit = async () => {
    const accounts = await web3.eth.requestAccounts();
    await contract.methods.deposit().send({
      from: accounts[0],
      value: web3.utils.toWei(amount, 'ether')
    });
  };

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to deposit"
      />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
};

export default Deposit;
