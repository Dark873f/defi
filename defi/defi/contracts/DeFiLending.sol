// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeFiLending {
    struct Loan {
        uint256 amount;
        address borrower;
        uint256 interest;
        uint256 dueDate;
        bool repaid;
    }

    mapping(address => uint256) public deposits;
    mapping(uint256 => Loan) public loans;
    uint256 public loanCounter;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event LoanCreated(uint256 indexed loanId, address indexed borrower, uint256 amount, uint256 interest, uint256 dueDate);
    event LoanRepaid(uint256 indexed loanId, address indexed borrower);

    function deposit() public payable {
        deposits[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public {
        require(deposits[msg.sender] >= amount, "Insufficient balance");
        deposits[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

    function createLoan(uint256 amount, uint256 interest, uint256 duration) public {
        require(deposits[msg.sender] >= amount, "Insufficient balance");
        deposits[msg.sender] -= amount;

        loans[loanCounter] = Loan({
            amount: amount,
            borrower: msg.sender,
            interest: interest,
            dueDate: block.timestamp + duration,
            repaid: false
        });

        emit LoanCreated(loanCounter, msg.sender, amount, interest, block.timestamp + duration);
        loanCounter++;
    }

    function repayLoan(uint256 loanId) public payable {
        Loan storage loan = loans[loanId];
        require(msg.sender == loan.borrower, "Not the borrower");
        require(!loan.repaid, "Loan already repaid");
        require(msg.value == loan.amount + loan.interest, "Incorrect repayment amount");

        loan.repaid = true;
        deposits[address(this)] += loan.interest;
        emit LoanRepaid(loanId, msg.sender);
    }
}
