import React, { useState } from 'react';
import "./Slider.css";

const RepaySlider = ( { step, fullyRepaid } ) => {
    return (
      <div className="progressBar">
        <div className='step'>
          <div className={`circle ${step > 1 ? 'filled' : ''}`} />
          <div className='stepContent'>Loan repayment received</div>
        </div>
        <div className='stepBar' />
        <div className='step'>
          <div className={`circle ${step > 2 ? 'filled' : ''}`} />
          <div className='stepContent'>Loan repaid</div>
        </div>
        {fullyRepaid && (
            <>
                <div className='stepBar' />
                <div className='step'>
                <div className={`circle ${step > 3 ? 'filled' : ''}`} />
                <div className='stepContent'>Collateral delivered to your account</div>
                </div>
            </>
        )}
      </div>
    )
}

export default RepaySlider;