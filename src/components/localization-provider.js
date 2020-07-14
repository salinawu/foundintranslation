import React, { memo } from 'react'
import { IntlProvider } from 'react-intl'

const LocalizationProvider = memo(({ children, locale, messages }) => {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
})

export default LocalizationProvider
