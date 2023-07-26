// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract CryptoLoan {
    IERC20 public USDC;
    uint256 constant public LOAN_TO_VALUE = 70;
    uint256 constant public LIQUIDATION_THRESHOLD = 82;
    uint256 constant public LIQUIDATION_PENALTY = 5;
    
    uint256 public APR = 384; // APR represented in basis points
    uint256 constant BASIS_POINT = 10000; // Basis point definition, 1 = 0.01%

    mapping(address => uint256) public loans;

    struct Loan {
        uint256 amount;
        uint256 interest;
        uint256 buffer;
    }

    mapping(address => Loan) public loanInfo;

    constructor(address _usdc) {
        USDC = IERC20(_usdc);
    }

    function changeAPR(uint256 _newAPR) public {
        APR = _newAPR;
    }

    function borrow(uint256 _loanAmount, uint256 _buffer) public payable {
        require(_buffer >= 50 && _buffer <= 200, "Invalid buffer amount");
        uint256 collateralNeeded = (_loanAmount / LOAN_TO_VALUE) * _buffer;
        require(msg.value >= collateralNeeded, "Not enough collateral");
        USDC.transfer(msg.sender, _loanAmount);
        loans[msg.sender] += _loanAmount;
        loanInfo[msg.sender] = Loan(_loanAmount, calculateInterest(_loanAmount), _buffer);
    }

    function calculateInterest(uint256 _loanAmount) internal view returns(uint256) {
        return (_loanAmount * APR) / BASIS_POINT;
    }

    function repay(uint256 _amount) public {
        require(USDC.balanceOf(msg.sender) >= (loanInfo[msg.sender].amount * (APR / BASIS_POINT) + _amount), "Not enough USDC to repay loan and interest");
        USDC.transferFrom(msg.sender, address(this), _amount + loanInfo[msg.sender].interest);
        (bool success,) = msg.sender.call{value: loanInfo[msg.sender].amount}("");
        require(success, "Transfer of ETH failed");
        loanInfo[msg.sender].amount -= _amount;
        loanInfo[msg.sender].interest = 0;
        loans[msg.sender] -= _amount;
    }

    function addCollateral(uint256 _amount) public payable {
        loanInfo[msg.sender].buffer += _amount;
    }

    function withdraw() public {
        (bool success,) = msg.sender.call{value: address(this).balance}("");
        require(success, "Withdraw of ETH failed");
    }

    function withdrawUSDC(uint256 _amount) public {
        require(_amount <= USDC.balanceOf(address(this)), "Not enough USDC");
        require(USDC.transfer(msg.sender, _amount), "USDC transfer failed");
    }
}
