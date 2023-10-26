import React from "react"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5">
            <div className="copyright">
              <p>&copy; Copyright 2023. All Rights Reserved.</p>
            </div>
          </div>
          <div className="col-md-7">
            <div className="footer__right">
              <ul className="footer__menu">
                {/* <li><a href="/blog">Blog</a></li> */}
                <li>
                  <a href="/terms">Terms of Service</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
