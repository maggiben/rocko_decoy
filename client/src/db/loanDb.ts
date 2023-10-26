import axios from "axios";
import { BACKEND_URL } from "@/constants/env";

export const useLoanDB = () => {
    const finalizeLoan = (
        user: string, 
        transaction_hash: string, 
        lending_protocol: string, 
        loan_active: boolean,
        loan_asset: string,
        outstanding_balance: number,
        collateral: number,
        exist: boolean
    ) => {
        const loanObject = {
            user: user,
            transaction_hash: transaction_hash,
            lending_protocol: lending_protocol,
            loan_active: Number(loan_active),
            loan_asset: loan_asset,
            outstanding_balance: outstanding_balance,
            collateral: collateral,
            exist: exist
        };
        console.log("loanObject", loanObject);
        axios.post(`${BACKEND_URL}/add`, loanObject).then((res) => {
            console.log(res);
            console.log(res.data);
        });
    }
    
    const updateLoan = (updateType: string, id: number, loan: number, active: boolean, collateral: number) => {
        const updateObject = updateType === "repay" ?
        {
            updateType: updateType,
            id: id, 
            loan_active: Number(active),
            outstanding_balance: loan,
        } :
        {
            updateType: updateType,
            id: id, 
            collateral: collateral,
        };
        console.log("updateObject-----", updateObject);
        axios.post(`${BACKEND_URL}/update`, updateObject).then((res) => {
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

    const addUser = (auth0_id: string, email: string, wallet_address: string, active: boolean) => {
        const userObject = {
            auth0_id: auth0_id, 
            email: email,
            wallet_address: wallet_address,
            active: Number(active),
        };
        console.log("userObject", userObject);
        axios.post(`${BACKEND_URL}/addUser`, userObject).then((res) => {
            console.log(res);
            console.log(res.data);
        });
    }

    const getUserData = async ( email: string ) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/users?email=${email}`);
            console.log("response", response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    return {
        finalizeLoan,
        updateLoan,
        getLoanData,
        addUser,
        getUserData
    }
}

