import React, { memo } from 'react'
import { IntlProvider } from 'react-intl'

export const LocalizationProvider = memo(({ children, locale, messages }) => {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
})
