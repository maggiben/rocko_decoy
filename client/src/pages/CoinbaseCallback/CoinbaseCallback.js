import axios from 'axios';
import { useState } from 'react';
import CoinbaseLoginButton from "../../components/CoinbaseLoginButton";
import { WITHDRAWAL_ADDRESS } from "../../constants/env";

const initiateWithdrawal = ({accountId, cb2fa, address, amount}) => {

    const withdrawalAmount = amount; 
    const currency = 'USDC'; 
    const withdrawalAddress = address; 

    axios.post(`http://localhost:5000/send-withdrawal`, {
    accountId,
    amount: withdrawalAmount,
    currency: currency,
    crypto_address: withdrawalAddress,
    cb_2fa_token: cb2fa,
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
  const [get2fa, set2fa] = useState('');
  const [getAddress, setAddress] = useState(WITHDRAWAL_ADDRESS);
  const [getAmount, setAmount] = useState('1.00');

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
        <h1>Send</h1>
        <input type="text" onChange={(e) => setAmount(e.target.value)} placeholder={"Amount"} value={getAmount} />
        <br />  
        <input type="text" onChange={(e) => setAddress(e.target.value)} placeholder={"Address"} value={getAddress} />
        <br />       
        <input type="text" onChange={(e) => set2fa(e.target.value)} placeholder={"2FA Token"} value={get2fa} />
        <br />
        <button onClick={() => initiateWithdrawal({accountId: balance?.response?.id, cb2fa: get2fa, address: getAddress, amount: getAmount})}>Withdrawal</button></>}
      </div>
  );
}
