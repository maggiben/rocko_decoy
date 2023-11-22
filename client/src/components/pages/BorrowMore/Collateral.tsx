import Card from '@/components/Card';
import CardDataRow from '@/components/Card/CardDataRow';
import Divider from '@/components/Divider';
import React from 'react';
import Button from '@/components/Button';
import Link from 'next/link';
import RangeInput from '@/components/RangeInput';
import Alerts from './Alerts';

function Collateral() {
  const classes = {
    title: '!text-base !font-medium',
    value: '!text-sm !text-blackSecondary !font-normal',
  };

  return (
    <Card title="Collateral">
      <div className="py-4 mt-4">
        <RangeInput />
      </div>
      <Divider />
      <CardDataRow
        items={[
          { title: 'Collateral Posted', value: '', classes },
          { title: '1.841892113 ETH', value: '$2,791.49', classes },
        ]}
      />
      <Divider />
      <CardDataRow
        items={[
          { title: 'Liquidation Price', value: 'Current ETH Price', classes },
          { title: '$1,301.55', value: '$1,891.49', classes },
        ]}
      />
      <Divider />
      <CardDataRow
        items={[
          { title: 'Collateral Buffer', value: '', classes },
          { title: '101%', value: '', classes },
        ]}
      />
      <Alerts title="Collateral Buffer Alerts" className="py-4 sm:py-2" />
      <div className="flex mt-6 gap-6 items-center sm:flex-row flex-col">
        <Button variant="secondary" className="sm:w-auto w-full">
          Modify Collateral
        </Button>
        <p className="text-sm text-blackSecondary flex-1">
          You can post additional collateral for this loan at anytime. Doing so
          will decrease the possibility of liquidation.{' '}
          <Link href="#" className="underline">
            Learn more.
          </Link>
        </p>
      </div>
    </Card>
  );
}

export default Collateral;
