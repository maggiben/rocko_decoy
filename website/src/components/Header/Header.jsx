import * as React from "react"
import logo from "../../images/logo.svg";
import { Link } from "gatsby";

const Header = ({}) => {
  const [toggle, setToggle] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", (e) => {
      if (window.innerWidth > 1023) {
        setToggle(false);
      }
    });
  }, []);
  return (
    <>
      <nav className="header-custom sticky top-0 left-0 z-50">
        <div className="w-full bg-white">
          <div className="container mx-auto px-[15px] bg-white ">
            <div className="flex justify-between  py-[10px] items-center">
              {/* close button here */}
              <button onClick={() => setToggle(!toggle)} className="lg:hidden ">
                <div className="flex flex-col items-center justify-center gap-1">
                  <div
                    className={`w-4 h-[2px] rounded-full bg-slate-700 transform  relative duration-300  ${
                      toggle ? "rotate-45 top-[6px]" : " rotate-0  top-0"
                    } `}
                  ></div>
                  <div
                    className={` duration-300 w-4 h-[2px] rounded-full bg-slate-700 ${
                      toggle ? "opacity-0 invisible" : "opacity-100 visible"
                    } `}
                  ></div>
                  <div
                    className={` duration-300 w-4 h-[2px] rounded-full bg-slate-700 transform relative  ${
                      toggle ? " -rotate-45  -top-[6px]" : " rotate-0  top-0"
                    } `}
                  ></div>
                </div>
              </button>
              <Link to="/">
                <img
                  src={logo}
                  alt="logo"
                  width={148}
                  height={51.728}
                  className="w-[86px] lg:w-[148px] inline-block pb-2"
                />
              </Link>
              <div className="flex items-center gap-12 justify-end">
                <div className="hidden  lg:flex items-center gap-8 justify-end">
                  <Link
                    to="/"
                    className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm "
                  >
                    BORROWING
                  </Link>
                  <Link
                    to="/"
                    className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm "
                  >
                    WHY DEFI?
                  </Link>
                  <Link
                    to="/"
                    className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm "
                  >
                    ABOUT US
                  </Link>
                  <Link
                    to="/"
                    className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm "
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/"
                    className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm "
                  >
                    CONTACT
                  </Link>
                </div>

                <button className="bg-[#293992] py-[11px] px-[24.6px] text-sm font-semibold rounded-full text-white hover:bg-[#6b3493] duration-500 uppercase">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        {toggle && (
          <div
            className={`responsive-navContainer fade-in absolute top-full left-0 `}
          >
            <div className="container mx-auto md:px-10 py-4  bg-white ">
              <Link
                to="/"
                className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm py-4 block border-b border-b-[#e0e0e0] "
              >
                BORROWING
              </Link>

              <Link
                to="/"
                className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm py-4 block border-b border-b-[#e0e0e0] "
              >
                WHY DEFI?
              </Link>

              <Link
                to="/"
                className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm py-4 block border-b border-b-[#e0e0e0] "
              >
                ABOUT US
              </Link>

              <Link
                to="/"
                className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm py-4 block border-b border-b-[#e0e0e0] "
              >
                FAQ
              </Link>

              <Link
                to="/"
                className="text-blackPrimary font-semibold hover:text-[#6b3493] duration-200 text-sm py-4 block"
              >
                CONTACT
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
