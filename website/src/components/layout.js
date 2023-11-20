import * as React from 'react'
import Header from '../../../ui-lib/Header/Header'
import Footer from '../../../ui-lib/Footer/Footer'

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
