import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ShareButtons from '../components/ShareButtons'
import { defaultLang, supportedLanguages, langFonts } from '../../i18n'
import { loadFontForLang } from '../utils/i18n'
import { getLocale, getMessages } from '../strings'
import { LocalizationProvider } from '../components/language-provider'

const getSlugByLang = (langKey, slug, srcLang) => {
  const rawSlug = slug.replace(`${srcLang}/`, '')
  return `${langKey}${rawSlug}`
}

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { date, description, title } = post.frontmatter
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
    <LocalizationProvider
      locale={getLocale(langKey)}
      messages={getMessages(langKey)}
    >
      <Layout location={location} title={siteTitle}>
        <SEO title={title} description={description || post.excerpt} />
        <article>
          <header className="mb-8">
            <span className="text-4xl">{title}</span>
            <p className="text-lg mb-4">{date}</p>
            <ShareButtons
              description={description}
              postUrl={'www.foundintranslation.com'}
              title={title}
            />
            {translatedLinks}
          </header>
          <section
            className="markdown"
            style={{ fontFamily: langFonts[langKey] }}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </Layout>
    </LocalizationProvider>
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
