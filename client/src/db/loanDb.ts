import axios from "axios";
import { BACKEND_URL } from "@/constants/env";

export const useLoanDB = () => {
    const finalizeLoan = (
        user: string, 
        transaction_hash: string, 
        lending_protocol: string, 
        loan_active: boolean,
        loan_asset: string,
        outstanding_balance: Number,
        collateral: Number,
        liquidation_price: Number,
        collateral_buffer: Number,
    ) => {
        const loanObject = {
            user: user, 
            transaction_hash: transaction_hash,
            lending_protocol: lending_protocol,
            loan_active: Number(loan_active),
            loan_asset: loan_asset,
            outstanding_balance: outstanding_balance,
            collateral: collateral,
            liquidation_price: liquidation_price,
            collateral_buffer: collateral_buffer,
        };
        console.log("loanObject", loanObject);
        axios.post(`${BACKEND_URL}/add`, loanObject).then((res) => {
            console.log(res);
            console.log(res.data);
        });
    }
    
    const getLoanData = async ( user: string ) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/loans?user=${user}`);
            console.log("response", response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    return {
        finalizeLoan,
        getLoanData
    }
}

