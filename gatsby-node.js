const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { defaultLang, supportedLanguages } = require('./i18n')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                directoryName
                langKey
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create index pages for supported languages
  Object.keys(supportedLanguages).forEach((langKey) =>
    createPage({
      path: langKey === defaultLang ? '/' : `/${langKey}`,
      component: path.resolve('./src/templates/blog-index.js'),
      context: {
        langKey,
      },
    })
  )

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  const translationsByDirectory = posts.reduce((res, post) => {
    const directoryName = post.node.fields.directoryName
    const langKey = post.node.fields.langKey

    if (!langKey || !directoryName || langKey === 'en') {
      return res
    }

    res[directoryName] = [...(res[directoryName] || []), langKey]
    return res
  })

  const defaultLangPosts = posts.filter(
    (post) => post.node.fields.langKey === defaultLang
  )

  defaultLangPosts.forEach((post, index) => {
    const previous =
      index === defaultLangPosts.length - 1
        ? null
        : defaultLangPosts[index + 1].node
    const next = index === 0 ? null : defaultLangPosts[index - 1].node
    const translations =
      translationsByDirectory[post.node.fields.directoryName] || []

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
        translations,
      },
    })
  })

  const translatedPosts = posts.filter(
    (post) => post.node.fields.langKey !== defaultLang
  )

  translatedPosts.forEach((post, index) => {
    const curLangPosts = posts.filter(
      (p) => p.node.fields.langKey === post.node.fields.langKey
    )
    const previous = curLangPosts[index + 1]?.node
    const next = curLangPosts[index - 1]?.node
    const translations =
      translationsByDirectory[post.node.fields.directoryName] || []

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        translations,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      name: `directoryName`,
      node,
      value: path.basename(path.dirname(node.fileAbsolutePath)),
    })
  }
}
