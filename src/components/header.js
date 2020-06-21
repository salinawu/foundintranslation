import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <header className="mb-8">
    <div className="mx-auto my-0 max-w-4xl py-8 text-6xl font-bold uppercase">
      <Link to="/">{siteTitle}</Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
