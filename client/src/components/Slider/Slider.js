import React, { useState } from 'react';
import "./Slider.css";

const Slider = ( { step } ) => {
  // const [step, setStep] = useState(0)
    return (
      <div className="progressBar">
        <div className='step'>
          <div className={`circle ${step > 1 ? 'filled' : ''}`} />
          <div className='stepContent'>Collateral received</div>
        </div>
        <div className='stepBar' />
        <div className='step'>
          <div className={`circle ${step > 2 ? 'filled' : ''}`} />
          <div className='stepContent'>Collateral deposited in lending protocol</div>
        </div>
        <div className='stepBar' />
        <div className='step'>
          <div className={`circle ${step > 3 ? 'filled' : ''}`} />
          <div className='stepContent'>Loan delivered to your account</div>
        </div>
      </div>
    )
}

export default Slider;