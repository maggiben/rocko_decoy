import { useState } from "react";
import ModalContent from "../ModalContent/ModalContent";
import CoinbaseLoginBtn from "../CoinbaseLoginBtn/CoinbaseLoginBtn";

const ChooseWallet = ({setOpenModalFor,setModalStep}) => {
    const [selectedWallet, setSelectedWallet] = useState();
    const loginExchange = () => {
        if (selectedWallet === "Coinbase") {

        } else {

        }
    }

    return (
    <ModalContent>
    {/* instruction */}
    <div className="flex items-start justify-between gap-2 ">
        <div className="space-y-2 ">
        <h4 className="text-2xl font-semibold font-inter">
            Choose Your Exchange Account
        </h4>
        <p className="text-sm text-[#141414] font-inter ">
            After logging in, you will be asked to grant your Rocko
            wallet permission to view wallet addresses and
            deposit/withdraw funds. Your Rocko wallet will only
            deposit/withdraw the amounts specified and authorized by
            you.
        </p>
        </div>
        <div className="">
        <button
            onClick={() => setOpenModalFor("")}
            className="w-8 h-8 rounded-full p-2 bg-[#EEE] block"
        >
            <img
            src="./assets/Close.svg"
            alt=""
            width={16}
            height={16}
            className="w-full"
            />
        </button>
        </div>
    </div>
    {/* select option */}
    <div className="space-y-4">
        <div className="flex items-center">
        <input
            type="radio"
            id="Coinbase"
            name="recommended-wallet"
            value="Coinbase"
            className="w-5 h-5 md:w-7 md:h-7 border-2 border-black"
            onChange={(e) => setSelectedWallet(e.target.value)}
        />
        <label htmlFor="Coinbase" className="pl-4">
            <p className="font-semibold">Coinbase</p>
        </label>
        </div>
        <div className="flex items-center">
        <input
            type="radio"
            id="Gemini"
            name="recommended-wallet"
            value="Gemini"
            className="w-5 h-5 md:w-7 md:h-7 border-2 border-black"
            onChange={(e) => setSelectedWallet(e.target.value)}
        />
        <label htmlFor="Gemini" className="pl-4">
            <p className="font-semibold">Gemini</p>
        </label>
        </div>
    </div>

    {/* continue button */}
    <div className="">
        {selectedWallet === "Coinbase" ? (
            <CoinbaseLoginBtn setModalStep={setModalStep} />
        ) : (
            <button onClick={()=>setModalStep(1)} className="py-[10px] px-6 bg-[#2C3B8D] rounded-full text-sm font-semibold text-white">
                Continue
            </button>
        )}
    </div>
    </ModalContent>
    )
}

export default ChooseWallet