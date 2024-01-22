'use client';

import React, { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import TransferFundModal from '@/components/chips/TransferFundModal/TransferFundModal';
import ModalContainer from '@/components/chips/ModalContainer/ModalContainer';
import { useZeroDev } from '@/hooks/useZeroDev';
import { useUserDB } from '@/db/userDb';
import { USDCContract, WETHContract, networkChainId } from '@/constants';
import financial from '@/utility/currencyFormate';
import { etherscanLink, formatPhoneNumber } from '@/utility/utils';
import { PHONE_EMAIL_PASS_SETTINGS } from '@/constants/featureFlags';

const Profile: React.FC = () => {
  const [openModalFor, setOpenModalFor] = useState('');
  const { userInfo } = useZeroDev();
  const { address: zerodevAccount } = useAccount();
  const { updateUser, getUserData } = useUserDB();

  const { data: ETH_Balance } = useBalance({
    address: zerodevAccount as `0x${string}`,
  });

  const { data: USDC_Balance } = useBalance({
    address: zerodevAccount as `0x${string}`,
    token: USDCContract[networkChainId] as `0x${string}`,
  });

  const { data: WETH_Balance } = useBalance({
    address: zerodevAccount as `0x${string}`,
    token: WETHContract[networkChainId] as `0x${string}`,
  });

  const [openContactEmailEditBox, setOpenContactEmailEditBox] =
    useState<boolean>(false);
  const [contactEmail, setContactEmail] = useState('');
  const [inputContact, setInputContact] = useState('');
  const [openContactNumberEdit, setOpenContactNumberEdit] =
    useState<boolean>(false);
  const [contactNumber, setContactNumber] = useState('');
  const [inputContactNumber, setInputContactNumber] = useState('');

  const phoneEmailPass = PHONE_EMAIL_PASS_SETTINGS
    ? [
        {
          description: 'Contact Email',
          details: contactEmail,
        },
        {
          description: 'Contact Number',
          details: contactNumber,
        },
        {
          description: 'Password',
          details: <button className="underline">Reset Password</button>,
        },
      ]
    : [];

  const invoice1 = [
    {
      description: 'Wallet Login',
      details: userInfo ? userInfo.email : '',
    },
    ...phoneEmailPass,
  ];

  const invoice2 = [
    {
      description: 'Address',
      details: zerodevAccount ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={etherscanLink(zerodevAccount, 'address')}
          className="underline"
        >
          {zerodevAccount}
        </a>
      ) : (
        ''
      ),
    },
    {
      description: 'Total Balance',
      details:
        ETH_Balance?.formatted &&
        WETH_Balance?.formatted &&
        `${financial(ETH_Balance?.formatted + WETH_Balance?.formatted, 3)} ETH`,
      subDescription: [
        {
          description: (
            <div className="flex items-center lg:gap-x-1 w-max">
              <span className="mr-1 lg:mr-0">ETH </span>{' '}
            </div>
          ),
          details: (
            <div className="flex items-center lg:gap-x-1 w-max">
              <span className="mr-1 lg:mr-0">
                {userInfo && `${financial(ETH_Balance?.formatted, 3)} ETH`}
              </span>{' '}
            </div>
          ),
        },
        {
          description: (
            <div className="flex items-center lg:gap-x-1">
              <span className="mr-1 lg:mr-0">WETH </span>{' '}
            </div>
          ),
          details: (
            <div className="flex items-center lg:gap-x-1 w-max">
              <span className="mr-1 lg:mr-0">
                {userInfo && `${financial(WETH_Balance?.formatted, 3)} WETH`}
              </span>{' '}
            </div>
          ),
        },
        {
          description: (
            <div className="flex items-center lg:gap-x-1">
              <span className="mr-1 lg:mr-0">USDC </span>{' '}
            </div>
          ),
          details: (
            <div className="flex items-center lg:gap-x-1 w-max">
              <span className="mr-1 lg:mr-0">
                {userInfo && `${financial(USDC_Balance?.formatted, 6)} USDC`}
              </span>{' '}
            </div>
          ),
        },
        {
          description: '',
          details: (
            <div className="flex items-center lg:gap-x-1 w-max mt-6">
              <button
                className="font-semibold  text-xs md:text-sm text-blue py-[10px]  px-6 rounded-full bg-grayPrimary mr-2"
                onClick={() => setOpenModalFor('Transfer Fund')}
              >
                Transfer Funds
              </button>
            </div>
          ),
        },
      ],
    },
  ];

  const handleSavePhoneClick = () => {
    setContactNumber(inputContactNumber === '+' ? '' : inputContactNumber);
    setOpenContactNumberEdit(!openContactNumberEdit);

    const phoneFlattened =
      inputContactNumber === '+' ? '' : formatPhoneNumber(inputContactNumber);
    updateUser(userInfo?.email, phoneFlattened);
  };

  const fetchPhone = async (email: string) => {
    try {
      const user = await getUserData(email);
      setInputContactNumber(user?.[0]?.phone);
      setContactNumber(user?.[0]?.phone);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userInfo) fetchPhone(userInfo?.email);
  }, [userInfo]);

  return (
    <main className="container mx-auto px-4 md:8 py-4 sm:py-6 lg:py-10">
      <h1 className="text-2xl lg:text-3xl font-semibold">Profile & Settings</h1>
      {/* ---------------------- First Section Start ------------------------ */}
      <section className="my-6 space-y-2">
        <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-6">
          <h3 className="text-xl font-medium mb-4">Account</h3>
          <div className="divide-y-2">
            {invoice1.map((info, i) => (
              <React.Fragment key={i}>
                <div>
                  <div className="flex pb-3 pt-2 flex-wrap items-center space-y-2">
                    <p className="font-medium w-[62%] md:w-1/2">
                      {info?.description}
                    </p>
                    <div className="w-[38%] md:w-1/2 text-right md:text-right">
                      <div className="flex gap-1 justify-end md:justify-end">
                        <p>{info?.details}</p>
                        {info?.description === 'Contact Email' && (
                          <Image
                            src={
                              !openContactEmailEditBox
                                ? '/icons/right-arrow.png'
                                : '/icons/top-arrow.png'
                            }
                            width={21}
                            height={21}
                            alt=""
                            onClick={() =>
                              setOpenContactEmailEditBox(
                                !openContactEmailEditBox,
                              )
                            }
                          />
                        )}
                        {info?.description === 'Contact Number' && (
                          <Image
                            src={
                              !openContactNumberEdit
                                ? '/icons/right-arrow.png'
                                : '/icons/top-arrow.png'
                            }
                            width={21}
                            height={21}
                            alt=""
                            onClick={() =>
                              setOpenContactNumberEdit(!openContactNumberEdit)
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    {info?.description === 'Contact Email' &&
                      openContactEmailEditBox && (
                        <>
                          <input
                            type="text"
                            autoComplete="off"
                            value={inputContact}
                            onChange={(e) => setInputContact(e.target.value)}
                            className="w-full p-3 focus:outline-none border-2 border-gray-200 rounded-lg bg-white number-input mb-4"
                          />
                          <div className="mb-4 flex justify-between">
                            <div />
                            <div>
                              <button
                                className="font-semibold  text-xs md:text-sm text-blue py-[10px]  px-6 rounded-full bg-grayPrimary mr-2"
                                onClick={() =>
                                  setOpenContactEmailEditBox(
                                    !openContactEmailEditBox,
                                  )
                                }
                              >
                                Cancel
                              </button>
                              <button
                                className="font-semibold  text-xs md:text-sm text-white py-[10px] w-[95px] px-6 rounded-full bg-blue mr-2"
                                onClick={() => {
                                  setContactEmail(inputContact);
                                  setOpenContactEmailEditBox(
                                    !openContactEmailEditBox,
                                  );
                                }}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    {info?.description === 'Contact Number' &&
                      openContactNumberEdit && (
                        <>
                          <PhoneInput
                            country="us"
                            excludeCountries={[
                              'cu',
                              'ir',
                              'kp',
                              'ru',
                              'sy',
                              'ua',
                            ]}
                            containerClass="border-2 border-gray-200 rounded-lg bg-white mb-4"
                            inputClass="w-full focus:outline-none bg-white number-input"
                            inputStyle={{
                              width: '100%',
                              height: '50px',
                              fontSize: '16px',
                              fontWeight: '300',
                            }}
                            enableAreaCodes
                            enableSearch
                            value={inputContactNumber}
                            onChange={(value, country, e, formattedValue) => {
                              setInputContactNumber(formattedValue);
                            }}
                          />
                          <div className="mb-4 flex justify-between">
                            <div />
                            <div>
                              <button
                                className="font-semibold  text-xs md:text-sm text-blue py-[10px]  px-6 rounded-full bg-grayPrimary mr-2"
                                onClick={() =>
                                  setOpenContactNumberEdit(
                                    !openContactNumberEdit,
                                  )
                                }
                              >
                                Cancel
                              </button>
                              <button
                                className="font-semibold  text-xs md:text-sm text-white py-[10px] w-[95px] px-6 rounded-full bg-blue mr-2"
                                onClick={handleSavePhoneClick}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-6">
          <h3 className="text-xl font-medium mb-4">Wallet</h3>
          <div className="divide-y-2">
            {invoice2.map((info, i) => (
              <React.Fragment key={i}>
                <div className="flex pb-3 pt-2 flex-wrap items-center space-y-2">
                  <p className="font-medium w-[62%] md:w-1/2">
                    {info?.description}
                  </p>
                  <div className="w-[38%] md:w-1/2 text-right md:text-right">
                    <div className="flex gap-1 justify-end md:justify-end">
                      <p>{info?.details}</p>
                    </div>
                  </div>
                  {info?.subDescription &&
                    info?.subDescription.map((innerInfo, i) => (
                      <React.Fragment key={i}>
                        <div className="pt-1 md:pt-0 w-[65%] md:w-1/2 lg:pl-6">
                          {innerInfo?.description}
                        </div>
                        <div className="pt-1 md:pt-0 w-[35%] md:w-1/2 text-right md:text-right">
                          <div className="flex gap-1 justify-end md:justify-end">
                            <p>{innerInfo?.details}</p>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-6">
          <h3 className="text-xl font-medium mb-4">Security</h3>
          <div className="divide-y-2" />
        </div> */}
      </section>
      {/* ---------------------- First Section End ------------------------ */}

      {/* ---------------------- when choose Coinbase or Gemini Account start ------------------------ */}
      {openModalFor && openModalFor === 'Transfer Fund' && (
        <ModalContainer>
          <TransferFundModal
            setOpenModalFor={setOpenModalFor}
            ethBalance={ETH_Balance?.value}
            wethBalance={WETH_Balance?.formatted}
            usdcBalance={USDC_Balance?.formatted}
          />
        </ModalContainer>
      )}
      {/* ---------------------- when choose Coinbase or Gemini Account End ------------------------ */}
    </main>
  );
};

export default Profile;
