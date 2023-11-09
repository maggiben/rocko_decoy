import axios from "axios";
import { BACKEND_URL } from "@/constants/env";
import {publicIp, publicIpv4, publicIpv6} from 'public-ip';

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
        axios.post(`${BACKEND_URL}/add`, loanObject).then((res) => {
            console.log(res.data);
        });
    }
    
    const updateLoan = (updateType: string, id: number, loan: number, active: boolean, collateral: number, interest: number, txHash: string) => {
        const updateObject = updateType === "repay" ?
        {
            updateType: updateType,
            id: id, 
            loan_active: Number(active),
            outstanding_balance: loan,
            interest: interest,
            transaction_hash: txHash
        } :
        {
            updateType: updateType,
            id: id, 
            collateral: collateral,
            transaction_hash: txHash
        };
        axios.post(`${BACKEND_URL}/update`, updateObject).then((res) => {
            console.log(res.data);
        });        
    }

    const getLoanData = async ( user: string ) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/loans?user=${user}`);
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
        axios.post(`${BACKEND_URL}/addUser`, userObject).then((res) => {
            console.log(res.data);
        });
    }

    const getUserData = async ( email: string ) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/users?email=${email}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const getAverageAPR = async ( openDate: Date ) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/average_apr?openDate=${openDate}`);
            return response.data.length > 0 ? response.data[0].average_apr : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const getMonthAverageAPR = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/average_apr?openDate=month`);
            return response.data.length > 0 ? response.data[0].average_apr : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const getYearAverageAPR = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/average_apr?openDate=year`);
            return response.data.length > 0 ? response.data[0].average_apr : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    const getYearAvgRewardRate = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/average_reward_rate?openDate=year`);
            return response.data.length > 0 ? response.data[0].average_reward_rate : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    const getRewardRate = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/reward_rate`);
            return response.data.length > 0 ? response.data[0].borrow_reward_rate : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const isVPN = async () => {
        try {
            const ip = await publicIpv4();
            const response = await axios.get(`${BACKEND_URL}/vpn?ip=${ip}`);

            return response.status !== 200
        } catch (error) {
            return true;
        }
    }
   
    return {
        finalizeLoan,
        updateLoan,
        getLoanData,
        addUser,
        getUserData,
        getAverageAPR,
        getMonthAverageAPR,
        getYearAverageAPR,
        getYearAvgRewardRate,
        getRewardRate,
        isVPN
    }
}

