import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../layout'
import Seo from '../components/seo'

import getBorrowApr from '../utils/getBorrowApr.ts'

function NotFoundPage() {
  const [currentApr, setCurrentApr] = React.useState(0)
  React.useEffect(async () => {
    setCurrentApr(await getBorrowApr())
  }, [])
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-6xl font-bold">
          404: Can&apos;t find what you&apos;re looking for
        </h1>
        <a
          className="text-3xl"
          style={{ textDecoration: 'underline' }}
          href="/"
        >
          {currentApr
            ? `Perhaps youre interested in a crypto loan as low as ${currentApr.toFixed(
                2,
              )}% APR?`
            : null}
        </a>
      </div>
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
