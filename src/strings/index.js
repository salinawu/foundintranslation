import { Locales } from 'locale'
import { defaultLang, supportedLanguages } from '../../i18n.js'

export const SUPPORTED_LOCALES = new Locales(Object.keys(supportedLanguages), defaultLang);

export const getLocale = (locale = defaultLang) =>
  new Locales(locale).best(SUPPORTED_LOCALES).toString();

export const getMessages = (locale = defaultLang) => require(`./${getLocale(locale)}.json`);
