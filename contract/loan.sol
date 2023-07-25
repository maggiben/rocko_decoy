pragma solidity ^0.8.0;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract LoanContract {
    IERC20 public USDT;
    IERC20 public ETH;
    address owner;

    uint256 public amountDue;
    uint256 public dueDate;
    uint256 public valueOfETH;
    uint256 public loanToValue = 70;
    uint256 public liquidationThreshold = 82;
    uint256 public liquidationPenalty = 5;
    
    constructor(address _usdt, address _eth) public {
        owner = msg.sender;
        USDT = IERC20(_usdt);
        ETH = IERC20(_eth);
    }

    function updateValueOfETH(uint256 _valueOfETH) external {
        require(msg.sender == owner, "Only owner can update the ETH value.");
        valueOfETH = _valueOfETH;
    }

    function borrow(uint256 _amount) external {
        require(ETH.balanceOf(msg.sender) >= _amount * 100 / loanToValue, "Insufficient ETH collateral posted.");
        USDT.transfer(msg.sender, _amount);
        amountDue += _amount * 10384 / 10000; // APR 3.84%
        dueDate = block.timestamp + 365 days; // One year term
    }

    function repay() external {
        require(USDT.balanceOf(msg.sender) >= amountDue, "Insufficient USDT.");
        USDT.transferFrom(msg.sender, address(this), amountDue);
        amountDue = 0;
    }

    function liquidate() external {
        require(block.timestamp >= dueDate || ETH.balanceOf(msg.sender) * valueOfETH < amountDue * 100 / liquidationThreshold, "Loan is not due or undercollateralized.");
        uint256 penalty = amountDue * liquidationPenalty / 100;
        require(USDT.balanceOf(msg.sender) >= penalty, "Insufficient USDT to cover penalty.");
        USDT.transferFrom(msg.sender, address(this), penalty);
        ETH.transfer(msg.sender, ETH.balanceOf(address(this)));
    }
}