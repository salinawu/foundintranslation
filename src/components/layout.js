import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import { DEFAULT_LOCALE, getLocale, getMessages } from '../strings'

const Layout = ({
  children,
  pageContext: { locale = DEFAULT_LOCALE, redirectMap = {}, supportedLanguages = {} }
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <LocalizationProvider
      locale={getLocale(locale)}
      messages={getMessages(locale)}
      localizedPaths={supportedLanguages}
      redirectMap={redirectMap}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="mx-auto my-0 max-w-4xl">
        <main>{children}</main>
        <footer className="py-8 text-gray-600">
          © {new Date().getFullYear()}
        </footer>
      </div>
    </LocalizationProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
