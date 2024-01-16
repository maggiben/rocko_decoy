import React, { useEffect, useState } from 'react'
import Twitter from  '../assets/svg-icons/twitter.svg';
import FacebookIcon from  '../assets/svg-icons/facebook.svg';
import Thread from  '../assets/svg-icons/thread.svg';
import Copy from  '../assets/svg-icons/coppy.svg';
import Linkedin from  '../assets/svg-icons/linkedin.svg';
import { Link, navigate } from 'gatsby';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import copy from "copy-to-clipboard";
import Layout from '../layout';
import { ClipLoader } from 'react-spinners';
import Tooltip from '../components/Tooltip';

function WaitListConfirmation() {
    const url = "https://rocko.co";
    const [count, setCount] = useState(Number);
    const [loading, setLoading] = useState(true);
    const [toolTip, setToolTip] = useState(false);
    const [sectoolTip, setSecToolTip] = useState(false);

    const openThread = () => {
        window.open(`https://threads.net?url=${encodeURIComponent(url)}`, '_blank');
    };

    const copyToClipboard = () => {
        copy(unescape(url))
    }

    const goHome = () => {
        navigate(`/`)
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/marketing/follower-count');
          const apiData = await response.json();
          setCount(apiData?.email);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }

      };

      fetchData();
    }, []);

  
    const secTooltip = (e) => {
        e.preventDefault()
        setSecToolTip(true)
        setTimeout(() => {
            setSecToolTip(false);
           }, 2000)
    }
    const openToolTip = (e) => {
        e.preventDefault()
        setToolTip(true)
        setTimeout(() => {
            setToolTip(false);
           }, 2000);
    }
  return (
    <>
 
      
    <Layout>
    <div className="max-w-[675px] w-full lg:py-[80px] py-[40px] m-[auto] px-[15px]">
      <h2 className="defi lg:text-[48px] md:text-[30px] text-[20px] text-[#141414] lg:leading-[56px] font-normal lg:mb-[40px] mb-[16px]">You’re on the waitlist!</h2>
      <div className='bg-[#0E2A32] rounded-[20px] lg:pt-[70px] md:pt-[40px] pt-[24px] md:pb-[32px] pb-[24px] flex items-center justify-center flex-wrap'>
        <div className='w-full text-center'>
            <p className='text-[#F9F9F9] text-[12px] leading-5	font-medium	tracking-tighter uppercase mb-[8px]'>Your Position</p>
            <b className='text-[#FFF] lg:text-[80px] md:text-[50px] sm:text-[35px] text-[30px] lg:mb-[57px] md:mb-[30px] mb-[20px] block'>{loading ? (<div className=' flex items-center justify-center'>
                <ClipLoader
                    size={40}
                    color='white'
                    loading={loading}
                />
            </div>) : count}
            </b>
        </div>
        <div className='w-full text-center'>
            <p className='text-[#FFF] text-[16px] lg:text-[20px] !mb-[11px]'>Help spread the word!</p>
            <ul className='flex  items-center justify-center  gap-x-2 '>
                <FacebookShareButton url={url}>
                    <li className='flex items-center justify-center lg:h-[48px] h-[40px] lg:w-[48px] w-[40px] rounded-full bg-[#ffffff1a] cursor-pointer mb-0'><Link to=''><FacebookIcon/></Link></li>
                </FacebookShareButton>

                <TwitterShareButton url={url}>
                    <li className='flex items-center justify-center lg:h-[48px] h-[40px] lg:w-[48px] w-[40px] rounded-full bg-[#ffffff1a] cursor-pointer mb-0'><Link to=''><Twitter/></Link></li>
                </TwitterShareButton>

                <LinkedinShareButton url={url}>
                    <li className='flex items-center justify-center lg:h-[48px] h-[40px] lg:w-[48px] w-[40px] rounded-full bg-[#ffffff1a] cursor-pointer mb-0'><Link to=''><Linkedin/></Link></li>
                </LinkedinShareButton>
                
                <li className='flex items-center justify-center lg:h-[48px] h-[40px] lg:w-[48px] w-[40px] rounded-full bg-[#ffffff1a] cursor-pointer mb-0'><Link to='' onClick={openThread}><Thread/></Link></li>
                <li className='flex items-center justify-center lg:h-[48px] h-[40px] lg:w-[48px] w-[40px] rounded-full bg-[#ffffff1a] cursor-pointer mb-0 relative'>
                    <Tooltip title="Copied" onClick={copyToClipboard}><Copy/></Tooltip>
                </li>
              
            </ul>
          
        </div>
      </div>
      <div className='mt-[48px]'>
        <h6 className='text-[#141414] lg:text-[28px] text-[20px]   lg:mb-[32px] mb-[24px] font-medium'>Thanks for your support! </h6>
        <p className='text-[#141414] lg:text-[20px] text-[16px] pb-[20px] font-medium lg:leading-7 leading-6'>We’ll notify you as soon as you’re able to use Rocko. Please help us spread the word. The faster we grow, the more resources we can spend on improving Rocko and adding new features. </p>
        <div className='flex items-center justify-between gap-1 mt-[24px]'>
            <div className='flex items-center relative  gap-4'>
                <Link to='' className=' max-w-[80px] w-full '><span className='text-[#141414] lg:text-[20px] text-[16px] block w-full md:border-e-2 md:pe-[20px] pe-[0] border-e-0 '>Share</span></Link>
                <div>
                <ul className='flex  items-center justify-center  gap-x-2 svg-icons '>
                <FacebookShareButton url={url}>
                    <li className='flex items-center justify-center lg:h-[48px] h-[35px] lg:w-[48px] w-[35px] rounded-full bg-[#EEE] cursor-pointer mb-0'><Link to=''><FacebookIcon className='text-black'/></Link></li>
                </FacebookShareButton>
                <TwitterShareButton url={url}>
                    <li className='flex items-center justify-center lg:h-[48px] h-[35px] lg:w-[48px] w-[35px] rounded-full bg-[#EEE] cursor-pointer mb-0'><Link to=''><Twitter/></Link></li>
                </TwitterShareButton>
                <LinkedinShareButton url={url}>
                    <li className='flex items-center justify-center lg:h-[48px] h-[35px] lg:w-[48px] w-[35px] rounded-full bg-[#EEE] cursor-pointer mb-0'><Link to=''><Linkedin/></Link></li>
                </LinkedinShareButton>
                <li className='flex items-center justify-center lg:h-[48px] h-[35px] lg:w-[48px] w-[35px] rounded-full bg-[#EEE] cursor-pointer mb-0'><Link to='' onClick={openThread}><Thread/></Link></li>
                <li className='flex items-center justify-center lg:h-[48px] h-[35px] lg:w-[48px] w-[35px] rounded-full bg-[#EEE] cursor-pointer mb-0 relative'>
                    <Tooltip title="Copied" onClick={copyToClipboard}><Copy/></Tooltip>
                </li>
              
            </ul>
                </div>
            </div>
            <Link className='bg-[#EEE] rounded-full py-[10px] px-4 text-[#2C3B8D] text-[14px] max-w-[120px] w-full text-center font-medium	' to='/'><span onClick={goHome}>Home</span></Link>
        </div>
      </div>
    </div>
    </Layout>
    </>
  )
}

export default WaitListConfirmation;
