interface Window {
  importOkI18nMessage(messages: Record<string, any>): void
  okI18nPreImport: Record<string, any>
}
;(function (window: Window) {
  function getCookie(key: string): string | undefined {
    const cookies = document.cookie.split('; ')
    let result
    for (let i = 0; i < cookies.length; i++) {
      const [_key, value] = cookies[i].split('=')
      if (key === _key) {
        result = value
        break
      }
    }
    return result
  }
  function getCurrentScript(): HTMLScriptElement | null {
    if (document.currentScript) {
      return document.currentScript as HTMLScriptElement
    }
    return null
  }
  function createScriptNode(src: string) {
    const script = document.createElement('script')
    script.src = src
    return script
  }
  function createStyleNode(text: string) {
    if (!text) {
      return null
    }
    const style = document.createElement('style')
    style.innerText = text
    return style
  }
  function setDocumentLang(locale: string) {
    document.documentElement.lang = locale
  }
  function insertNodeAfterCurrentScript(
    newNode: HTMLElement,
    refNode: HTMLElement
  ) {
    const parent = refNode.parentNode
    return parent?.insertBefore(newNode, refNode.nextElementSibling)
  }
  const DEFAULT_OPTIONS = {
    baseUrl: '/',
    localeKey: 'local',
    defaultLocale: 'zh-CN',
  }
  const FONT_FAMILY: Record<string, string> = {
    'ja-JP': `html:lang(ja-JP) body{font-family: "メイリオ", "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", "ＭＳ Ｐゴシック", Osaka, sans-serif;}`,
  }
  function getOptions(el: HTMLElement | null): typeof DEFAULT_OPTIONS {
    return Object.assign({}, DEFAULT_OPTIONS, el ? el.dataset : {})
  }
  const currentScript = getCurrentScript()
  const options = getOptions(currentScript)
  const locale = getCookie(options.localeKey) ?? options.defaultLocale
  const script = createScriptNode(options.baseUrl + locale + '.js')
  const style = createStyleNode(FONT_FAMILY[locale])
  const localeKey = locale.replace('-', '')
  if (currentScript) {
    window.importOkI18nMessage = (messages: Record<string, any>) => {
      window.okI18nPreImport = {
        [localeKey]: messages,
      }
    }
    setDocumentLang(locale)
    insertNodeAfterCurrentScript(script, currentScript)
    if (style) {
      insertNodeAfterCurrentScript(style, currentScript)
    }
  }
})(window)
