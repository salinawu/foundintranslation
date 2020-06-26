import React, { createContext, memo, useMemo } from 'react';
import { IntlProvider } from 'react-intl';

export const LocalizationContext = createContext({
  locale: 'en',
  localizedPaths: {},
  redirectMap: {},
});

export const LocalizationProvider = memo(
  ({ children, locale, messages, localizedPaths, redirectMap }) => {
    const localizationContext = useMemo(() => ({ locale, localizedPaths, redirectMap }), [
      locale,
      localizedPaths,
      redirectMap,
    ]);
    return (
      <IntlProvider locale={locale} messages={messages}>
        <LocalizationContext.Provider value={localizationContext}>
          {children}
        </LocalizationContext.Provider>
      </IntlProvider>
    );
  }
);

export default LocalizationContext;
