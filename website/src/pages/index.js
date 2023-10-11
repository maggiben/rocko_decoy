import * as React from "react"
import rockoLogo from "../images/logo.svg"
import Footer from "../../../ui-lib/Footer/Footer"
// import website styles
// import "../styles/style.scss"

const Index = ({}) => {
  return (
    <>
      <a className="accessibility" href="#main">
        Skip to Content
      </a>
      <noscript>
        <div>Javascript must be enabled for the correct page display</div>
      </noscript>
      <div className="wrapper">
        <header className="header">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="header__buttons d-flex justify-content-end">
                  <a
                    href="mailto:&#104;&#101;&#108;&#108;&#111;&#064;&#114;&#111;&#099;&#107;&#111;&#046;&#099;&#111;"
                    className="btn btn-light"
                  >
                    <span className="rocko rocko-mail"></span>
                    &#104;&#101;&#108;&#108;&#111;&#064;&#114;&#111;&#099;&#107;&#111;&#046;&#099;&#111;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="page-holder">
          <main className="main" id="main">
            <section className="banner">
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-8 col-lg-6">
                    <div className="banner__content text-center">
                      <div className="banner__logo">
                        <a href="#">
                          <img src={rockoLogo} alt="rocko.co" />
                        </a>
                      </div>
                      <h1 className="launching-h1">Launching Soon!</h1>
                      <div className="banner__text">
                        <p>
                          Rocko enables crypto owners to easily borrow USDC or
                          cash using their crypto as collateral. Access low-rate
                          loans from trusted DeFi protocols in minutes! Sign up
                          below to be notified as soon as we launch!
                        </p>
                      </div>
                      <form
                        className="form form--banner"
                        action="https://rocko.us11.list-manage.com/subscribe/post?u=a55ca9db1b050104dac6c18a3&amp;id=d64d1776bc&amp;f_id=0036a0e0f0"
                        method="post"
                      >
                        <div className="input-holder">
                          <input
                            name="EMAIL"
                            id="EMAIL"
                            type="email"
                            className="form-control"
                            placeholder="Type your email here"
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary !text-white !bg-[#293991] notify_button"
                        >
                          NOTIFY ME
                        </button>

                        <div
                          aria-hidden="true"
                          style={{ position: "absolute", left: "-5000px" }}
                        >
                          <input
                            type="text"
                            name="b_a55ca9db1b050104dac6c18a3_d64d1776bc"
                            tabindex="-1"
                            value=""
                          />
                        </div>
                      </form>
                      <div className="banner__social">
                        <ul className="d-flex justify-content-center align-items-center">
                          <li>
                            <a
                              href="https://twitter.com/rockodefi"
                              className="d-flex align-items-center justify-content-center rounded-circle"
                              target="_blank"
                            >
                              <span className="rocko rocko-twitter !text-[#293992]"></span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>

     
      </div>
      <Footer/>
    </>
  )
}

export default Index
