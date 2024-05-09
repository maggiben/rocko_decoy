'use client';

import React, { useEffect } from 'react';
import 'react-phone-input-2/lib/style.css';
import { useUserInfo } from '@/hooks/useUserInfo';

const Blank: React.FC = () => {
  const { userInfo, loginUser } = useUserInfo();

  useEffect(() => {
    if (!userInfo) loginUser();
  }, [userInfo]);

  return <main className="container mx-auto px-4 md:8 py-4 sm:py-6 lg:py-10" />;
};

export default Blank;
