import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import Button from './shared/Button'
import { supportedLanguages } from '../../i18n.js'

const Header = ({ siteTitle }) => {
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const handleToggleLanguageDropdown = useCallback(() => {
    setShowLanguageOptions(prevIsOpen => !prevIsOpen);
  }, [setShowLanguageOptions])

  const handleSelectLanguage = useCallback(language => {
    console.log("lang selected: ", language);
  })

  return (
    <header className="mb-8">
      <div className="flex justify-between items-center mx-auto my-0 max-w-4xl py-8 text-6xl font-bold uppercase">
        <Link to="/">{siteTitle}</Link>
        <div>
          <Button className="h-8 text-base border border-black border-solid" onClick={handleToggleLanguageDropdown} label="language"/>
          {showLanguageOptions && (
            <div className="flex flex-col text-2xl p-4 justify-center items-center absolute border border-black border-solid -mt-4">
              {Object.values(supportedLanguages).map(lang => (
                <div onClick={() => handleSelectLanguage(lang)}>{lang}</div>
              ))}
            </div>
          )}
        </div>
      </div>

    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
