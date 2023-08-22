import axios from 'axios';
import { useState } from 'react';
import CoinbaseLoginButton from "../../components/CoinbaseLoginButton";
import { WITHDRAWAL_ADDRESS } from "../../constants/env";

const initiateWithdrawal = (accountId) => {

    const withdrawalAmount = '1.00'; 
    const currency = 'USDC'; 
    const withdrawalAddress = WITHDRAWAL_ADDRESS; 

    axios.post(`http://localhost:5000/send-withdrawal`, {
    accountId,
    amount: withdrawalAmount,
    currency: currency,
    crypto_address: withdrawalAddress
    }, {
        withCredentials: true
    })
    .then(response => {
    console.log(response.data);
    })
    .catch(error => {
    console.error('Error initiating withdrawal:', error);
    });

}

export default function CoinbaseCallback() {

  const [balance, setBalance] = useState(null);

  const fetchCoinbaseBalance = () => {
    fetch('http://localhost:5000/coinbase-balance', {
    method: 'GET',
    credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setBalance(data)
    })
    .catch(error => {
        console.error('Error fetching balance:', error);
    });
}


  return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <CoinbaseLoginButton />
        <br />
        <h1>{balance?.balance?.amount}</h1>
        <button onClick={fetchCoinbaseBalance}>Get Balance</button>
        {balance && <><br/>
        <h1>Send $1.00</h1>
        <button onClick={() => initiateWithdrawal(balance?.response?.id)}>Withdrawal</button></>}
      </div>
  );
}
