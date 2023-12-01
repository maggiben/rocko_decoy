import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Seo from '../components/seo'

import getBorrowApr from '../utils/getBorrowApr.ts'

function NotFoundPage() {
  const [currentApr, setCurrentApr] = React.useState(0)
  React.useEffect(async () => {
    setCurrentApr(await getBorrowApr())
  }, [])
  return (
    <Layout>
      <h1>404: Can&apos;t find what you&apos;re looking for</h1>
      <a href="/">
        {currentApr
          ? `Perhaps youre interested in a crypto loan as low as ${currentApr.toFixed(
              2,
            )}% APR?`
          : null}
      </a>
    </Layout>
  )
}

export function Head() {
  return <Seo title="404: Not Found" />
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
