import React from 'react'
import { Link, graphql } from 'gatsby'
import { FormattedMessage } from 'react-intl'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import { getLocale, getMessages } from '../strings'
import LocalizationProvider from '../components/localization-provider'
import { defaultLang } from '../../i18n.js'

const IndexPage = ({
  data,
  pageContext: { langKey = defaultLang },
  location,
}) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <LocalizationProvider
      locale={getLocale(langKey)}
      messages={getMessages(langKey)}
    >
      <Layout location={location}>
        <FormattedMessage id="test.string" />
        <SEO title="All posts" />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug} className="mb-8">
              <header>
                <span className="text-4xl pr-4 hover:font-semibold">
                  <Link to={node.fields.slug}>{title}</Link>
                </span>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  className="markdown"
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    </LocalizationProvider>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query($langKey: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            langKey
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
