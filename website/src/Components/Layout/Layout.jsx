import Footer from "../../../../ui-lib/Footer/Footer"
import Header from "../../../../ui-lib/Header/Header"
import * as React from "react"
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
