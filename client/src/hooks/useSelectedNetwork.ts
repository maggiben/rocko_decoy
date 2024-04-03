import { useState } from 'react';
import { NETWORK } from '@/constants/env';

export default () => {
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORK);

  return { selectedNetwork, setSelectedNetwork };
};
