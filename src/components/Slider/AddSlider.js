import React, { useState } from 'react';
import "./Slider.css";

const AddSlider = ( { step } ) => {
    return (
      <div className="progressBar">
        <div className='step'>
          <div className={`circle ${step > 1 ? 'filled' : ''}`} />
          <div className='stepContent'>Collateral received</div>
        </div>
        <div className='stepBar' />
        <div className='step'>
          <div className={`circle ${step > 2 ? 'filled' : ''}`} />
          <div className='stepContent'>Collateral added</div>
        </div>
      </div>
    )
}

export default AddSlider;