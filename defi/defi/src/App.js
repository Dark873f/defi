import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Deposit from './Deposit';
import Loan from './Loan';

const App = () => {
  return (
    <div>
      <h1>DeFi Lending and Borrowing</h1>
      <Deposit />
      <Loan />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
