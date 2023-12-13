import React from 'react'
import { Link } from 'gatsby'
import LogoIcon from '../assets/svg-icons/logo.svg'
// import logo from '../../images/logo.svg'

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  )
}

export default Layout

function Navbar() {
  const [toggle, setToggle] = React.useState(false)

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1023) {
        setToggle(false)
      }
    })
  }, [])
  const menuItems = [
    {
      labelText: ' WHY DEFI?',
      location: '/',
    },
    {
      labelText: 'ABOUT US',
      location: '/',
    },
    {
      labelText: 'FAQ',
    },
    {
      labelText: 'CONTACT',
      location: '/contact-us',
    },
    {
      labelText: 'LEARN',
      location: '/learn',
    },
  ]
  return (
    <nav className="header-custom sticky top-0 left-0 z-50 shadow">
      <div className="w-full bg-white">
        <div className="container mx-auto px-[15px] bg-white ">
          <div className="flex justify-between  py-[10px] items-center">
            <Link to="/" className="w-64 h-52 inline-block">
              <LogoIcon className="sm-w-[100px] md:w-[auto]" />
            </Link>
            <div className="flex items-center gap-12 justify-end">
              <div className="hidden  lg:flex items-center gap-8 justify-end">
                <div className=" items-center">
                  {menuItems.map(navItems =>
                    navItems.location ? (
                      <Link
                        to={navItems.location}
                        key={navItems.labelText}
                        className="text-[#141414] font-semibold hover:text-[#6b3493] duration-200 text-sm  px-[16px]"
                      >
                        {navItems.labelText}
                      </Link>
                    ) : null,
                  )}
                </div>
              </div>
              <Link
                to="/waitlist"
                className="waitlist py-[11px] px-[24.6px] text-sm font-semibold rounded-full text-white hover:bg-[#6b3493] duration-500 uppercase hidden lg:flex"
              >
                Join the waitlist
              </Link>
              {/* close button here */}
              <button
                aria-label="Toggle"
                type="button"
                onClick={() => setToggle(!toggle)}
                className="lg:hidden "
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <div
                    className={`w-4 h-[2px] rounded-full bg-slate-700 transform  relative duration-300  ${
                      toggle ? 'rotate-45 top-[6px]' : ' rotate-0  top-0'
                    } `}
                  />
                  <div
                    className={` duration-300 w-4 h-[2px] rounded-full bg-slate-700 ${
                      toggle ? 'opacity-0 invisible' : 'opacity-100 visible'
                    } `}
                  />
                  <div
                    className={` duration-300 w-4 h-[2px] rounded-full bg-slate-700 transform relative  ${
                      toggle ? ' -rotate-45  -top-[6px]' : ' rotate-0  top-0'
                    } `}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
        {toggle && (
          <div className="responsive-navContainer fade-in w-full">
            <div className="mx-auto  p-[24px]  bg-white w-full text-center">
              <div className="">
                <div className="flex flex-col items-center pt-8 gap-y-[16px] mb-8">
                  {menuItems.map(navItems =>
                    navItems.location ? (
                      <Link
                        to={navItems.location}
                        key={navItems.labelText}
                        className="text-[#141414] font-semibold hover:text-[#6b3493] duration-200 text-sm  px-[16px]"
                      >
                        {navItems.labelText}
                      </Link>
                    ) : null,
                  )}
                </div>
                <Link
                  to="/waitlist"
                  className="waitlist bg-[#006AFF] py-[11px] px-[24.6px] text-sm font-semibold rounded-full text-white hover:bg-[#6b3493] duration-500 uppercase "
                >
                  Join the waitlist
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
