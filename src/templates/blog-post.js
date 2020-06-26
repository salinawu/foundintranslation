import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { defaultLang, supportedLanguages, langFonts } from '../../i18n'
import { loadFontForLang } from '../utils/i18n'

const getSlugByLang = (langKey, slug, srcLang) => {
  const rawSlug = slug.replace(`${srcLang}/`, '')
  return `${langKey}${rawSlug}`
}

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { langKey, slug } = data.markdownRemark.fields
  const { previous, next, translations } = pageContext
  const siteTitle = data.site.siteMetadata.title

  translations.concat(langKey).forEach((langKey) => loadFontForLang(langKey))

  const translatedLinks = translations
    .filter((lK) => lK !== langKey)
    .concat(langKey !== defaultLang ? [defaultLang] : [])
    .map((translatedLangKey) => (
      <Link
        to={getSlugByLang(translatedLangKey, slug, langKey)}
        key={translatedLangKey}
        className="font-medium hover:font-semibold text-xl mr-4"
        style={{ fontFamily: langFonts[translatedLangKey] }}
      >
        {supportedLanguages[translatedLangKey]}
      </Link>
    ))

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header className="mb-8">
          <span className="text-4xl">{post.frontmatter.title}</span>
          <p className="text-lg mb-4">{post.frontmatter.date}</p>
          {translatedLinks}
        </header>
        <section
          className="markdown"
          style={{ fontFamily: langFonts[langKey] }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
      fields {
        slug
        langKey
      }
    }
  }
`
