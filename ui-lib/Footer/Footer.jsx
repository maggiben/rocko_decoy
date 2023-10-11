import React from "react"

const Footer = () => {
  return (
    <footer class="footer">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-5">
            <div class="copyright">
              <p>&copy; Copyright 2023. All Rights Reserved.</p>
            </div>
          </div>
          <div class="col-md-7">
            <div class="footer__right">
              <ul class="footer__menu">
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
