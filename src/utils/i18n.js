/* eslint-disable no-unused-expressions */

export const loadFontForLang = (langKey) => {
  switch (langKey) {
    case 'ja':
      import('../styles/font-Noto-Sans-JP.css')
      break
    case 'zh-hans':
      import('../styles/font-Noto-Sans-SC.css')
      break
    case 'zh-hant':
      import('../styles/font-Noto-Sans-TC.css')
      break
    default:
      break
  }
}
