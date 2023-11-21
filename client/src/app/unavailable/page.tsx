'use client';

import { useSearchParams } from 'next/navigation';

const alert = {
  vpn: {
    title: (
      <h1 className="text-2xl font-semibold mb-8 text-center">VPN Detected</h1>
    ),
    content: (
      <p>
        If you are trying to access rocko.co using a VPN, please disconnect and
        try again. VPNs are not supported.
      </p>
    ),
  },
  region: {
    title: (
      <h1 className="text-2xl font-semibold mb-8 text-center">
        Not Available in Your Region
      </h1>
    ),
    content: (
      <p>
        Our service is not available in your region. If you believe this is a
        mistake, please contact support@rocko.co
      </p>
    ),
  },
};

function Unavailable() {
  const router = useSearchParams(); //! use the hooks for getting the URL parameters
  const reason = router.get('reason'); //! get the URL parameter reason value

  return (
    <main className="container mx-auto px-4 lg:py-10 flex justify-center">
      <div className="bg-gray-100 rounded-lg p-8 pb-24 max-w-md w-full mt-[8%]">
        {reason == 'region' ? (
          <>
            {alert.region.title}
            {alert.region.content}
          </>
        ) : (
          <>
            {alert.vpn.title}
            {alert.vpn.content}
          </>
        )}
      </div>
    </main>
  );
}

export default Unavailable;
