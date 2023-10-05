import Header from '../Header/Header'
import * as React from "react"
const Layout = ({ children }) => {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <footer>
        © Copyright {new Date().getFullYear()}. All Rights Reserved.
      </footer>
    </>
  );
};

export default Layout;
