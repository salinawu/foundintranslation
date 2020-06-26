import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { langKey } = pageContext
  const posts = data.allMarkdownRemark.edges.filter(
    ({ node }) => node.fields.langKey === langKey
  )

  return (
    <Layout location={location}>
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
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
