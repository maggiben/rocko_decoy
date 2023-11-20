"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast";
import logo from "@/assets/logo.png";
import user from "@/assets/images/user.png";
import ModalContainer from "../ModalContainer/ModalContainer";
import AlreadyOpenModal from "../AlreadyOpenModal/AlreadyOpenModal";
import { useEffect, useState, useRef } from "react";
import { configureChains, useAccount, useConnect, useDisconnect } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import * as chains from 'wagmi/chains'
import { Auth0WalletConnector } from '@zerodev/wagmi';
import { NETWORK } from "@/constants/env";
import { useZeroDev } from "@/hooks/useZeroDev";
import { useLoanDB } from "@/db/loanDb";
import { usePathname } from "next/navigation";

const net = (chains as { [key: string]: any })[NETWORK];

const Header = () => {
    const { chains } = configureChains( [net], [publicProvider()] );
    const auth0Connector = new Auth0WalletConnector({chains, options: {
      projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID,
      shimDisconnect: true
    }});

    console.log({net, env: process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID, chains})

    const loginRef: any = useRef();
    const router = useRouter();
    const pathName = usePathname();

    const [toggle, setToggle] = useState(false);
    const [toggleDown, setToggleDown] = useState(false);
    const [openModalFor, setOpenModalFor] = useState("");

    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAccount();
    const { userInfo } = useZeroDev();
    const { getUserData, addUser, isVPN, getLoanData } = useLoanDB();
    const [isUnavailable, setIsUnavailable] = useState(false);

    const OnLogin = async () => {
      console.log({auth0Connector})
        await connect({
          connector: auth0Connector
        });
    };
    
    const OnLogout = async () => {
        await disconnect();
    };
      
    const handleClickOutside = (event: { target: any; }) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setToggleDown(false);
      }
    };

    const detectVPN = () => {
      if (sessionStorage.getItem('clientAllowed') !== 'true') {
        console.log("Start to detect vpn:");
        isVPN().then(response => {
          if (response.status === 200) {
            sessionStorage.setItem('clientAllowed', 'true');
          } else {
            setIsUnavailable(true);
            
            if (response.data === "Failed region/vpn test") {
              router.push(`/unavailable?reason=region`);
            } else {
              router.push(`/unavailable?reason=vpn`);
            }
          }
        });
      }
    }

    /* search user in users table and add userInfo to table if nothing */
    useEffect(() => {
      if (userInfo) {
        getUserData(userInfo.email).then(async (res) => {
          /* if user not exist */
          if (res && res.length === 0) {
            addUser(userInfo.idToken, userInfo.email, address as `0x${string}`, false);
          } else {
          /* if user exist */
            const result = await getLoanData(userInfo?.email);
            const active_loans = result.filter((loan: any) => loan.loan_active === 1);
            console.log(pathName)
            if (active_loans?.length > 0 && pathName === "/") { /* if there is an active loan */
              setOpenModalFor("Already Open");
            }
          }
        });
      }

      if (pathName === "/unavailable") {
        setIsUnavailable(true);
      } else {
        detectVPN();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo]);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener("resize", (e) => {
          if (window.innerWidth > 1023)
            setToggle(false);
        });
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    
    return (
        <nav className={`header-custom sticky top-0 left-0 z-50 ${isUnavailable ? 'pointer-events-none opacity-50' : ''}`}>
          <div className="w-full bg-white">
            <div className="container mx-auto px-[15px] bg-white ">
              <div className="flex justify-between  py-[10px] items-center">
                {/* close button here */}
                <button onClick={() => setToggle(!toggle)} className="lg:hidden ">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div
                      className={`w-4 h-[2px] rounded-full bg-slate-700 transform  relative duration-300  ${
                        toggle ? "rotate-45 top-[6px]" : " rotate-0  top-0"
                      } `}
                    ></div>
                    <div
                      className={` duration-300 w-4 h-[2px] rounded-full bg-slate-700 ${
                        toggle ? "opacity-0 invisible" : "opacity-100 visible"
                      } `}
                    ></div>
                    <div
                      className={` duration-300 w-4 h-[2px] rounded-full bg-slate-700 transform relative  ${
                        toggle ? " -rotate-45  -top-[6px]" : " rotate-0  top-0"
                      } `}
                    ></div>
                  </div>
                </button>
                <a href="/">
                  <Image className="w-[56px] lg:w-[97px] inline-block pb-2" src={logo} alt="logo" width={97} height={51.728} />
                </a>
                <div className="flex items-center gap-12 justify-end">
                  <div className="hidden  lg:flex items-center gap-8 justify-end">
                    <Link
                      href="/loan-dashboard"
                      className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm "
                    >
                      DASHBOARD
                    </Link>
                    <Link
                      href="/"
                      className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm "
                    >
                      BORROWING
                    </Link>
                    <Link
                      href="/"
                      className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm "
                    >
                      WHY DEFI?
                    </Link>
                    <Link
                      href="/"
                      className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm "
                    >
                      ABOUT US
                    </Link>
                    <Link
                      href="/"
                      className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm "
                    >
                      FAQ
                    </Link>
                    <Link
                      href="/"
                      className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm "
                    >
                      CONTACT
                    </Link>
                  </div>
    
                  {isConnected ? (
                    <div className="relative inline-block text-left" ref={loginRef}>
                      <button
                        onClick={() => setToggleDown(!toggleDown)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                      >
                        <Image className="h-7" src={user} alt="user" width={30} height={30} />
                      </button>
                      {
                        toggleDown && 
                        <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="" role="menu" aria-orientation="vertical">
                            <Link href="/profile" className="block px-4 py-2 text-sm w-full hover:bg-gray-100 hover:text-gray-900" role="menuitem">View Profile</Link>
                            <button className="block px-4 py-2 text-sm w-full hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={OnLogout}>Logout</button>
                          </div>
                        </div>
                      }
                    </div>
                    ) : (
                      <button className="bg-[#293992] py-[11px] px-[24.6px] text-sm font-semibold rounded-full text-white hover:bg-[#6b3493] duration-500 uppercase"
                        onClick={OnLogin}>
                        Login
                      </button>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          {toggle && (
            <div
              className={`responsive-navContainer fade-in absolute top-full left-0 `}
            >
              <div className="container mx-auto md:px-10 py-4  bg-white ">
                <Link
                  href="/loan-dashboard"
                  className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm py-4 block border-b border-b-[#e0e0e0] "
                >
                  DASHBOARD
                </Link>

                <Link
                  href="/"
                  className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm py-4 block border-b border-b-[#e0e0e0] "
                >
                  BORROWING
                </Link>
    
                <Link
                  href="/"
                  className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm py-4 block border-b border-b-[#e0e0e0] "
                >
                  WHY DEFI?
                </Link>
    
                <Link
                  href="/"
                  className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm py-4 block border-b border-b-[#e0e0e0] "
                >
                  ABOUT US
                </Link>
    
                <Link
                  href="/"
                  className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm py-4 block border-b border-b-[#e0e0e0] "
                >
                  FAQ
                </Link>
    
                <Link
                  href="/"
                  className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm py-4 block"
                >
                  CONTACT
                </Link>
              </div>
            </div>
          )}
        {openModalFor && openModalFor === "Already Open" && (
          <>
            <ModalContainer>
              <AlreadyOpenModal
                setOpenModalFor={setOpenModalFor}
              />
            </ModalContainer>
          </>
        )}          
        </nav>
    );
    
};

export default Header;
