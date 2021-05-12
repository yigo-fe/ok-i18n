import OkI18n from "../src";

describe('测试i18n', () => {
  test('测试获取对应文案', () => {
    const messages = {
      en: {
        engine: 'engine',
        common: {
          submit: 'submit'
        }
      },
      ja: {
        engine: 'エンジン.エンジン',
        common: {
          submit: '提出'
        }
      }
    }
    const okI18n = new OkI18n({
      locale: 'en',
      messages,
    })
    expect(okI18n.$t('engine', '引擎')).toBe('engine')
    expect(okI18n.$t('common.submit', '提交')).toBe('submit')
    okI18n.setLocale('ja')
    expect(okI18n.$t('engine', '引擎')).toBe('エンジン.エンジン')
    expect(okI18n.$t('common.submit', '提交')).toBe('提出')
    okI18n.setLocale('zh')
    expect(okI18n.$t('engine', '引擎')).toBe('引擎')
    expect(okI18n.$t('common.submit', '提交')).toBe('提交')
  })

  test('测试变量', () => {
    const messages = {
      en: {
        engine: 'engine {variable}',
        common: {
          submit: '{pre_submit} submit {post_submit}'
        }
      },
    }
    const okI18n = new OkI18n({
      locale: 'en',
      messages,
    })
    expect(okI18n.$t('engine', '引擎', { variable: 'variable' })).toBe('engine variable')
    expect(okI18n.$t('common.submit', '提交', { pre_submit: 'pre submit', post_submit: 'post submit' })).toBe('pre submit submit post submit')

    okI18n.setLocale('zh')
    expect(okI18n.$t('engine', '引擎{variable}', { variable: '变量' })).toBe('引擎变量')
    expect(okI18n.$t('common.submit', '{pre_submit}_提交_{post_submit}', { pre_submit: '提交前', post_submit: '提交后' })).toBe('提交前_提交_提交后')
  })

  test('测试懒加载', async () => {
    const messages = {
      en: () => Promise.resolve({
        engine: 'engine',
        common: {
          submit: 'submit'
        }
      }),
    }
    const okI18n = new OkI18n({
      locale: 'en',
      messages,
    })
    expect(okI18n.$t('engine', '引擎')).toBe('引擎')
    expect(okI18n.$t('common.submit', '提交')).toBe('提交')
    // 在一次微任务之后才能加载完成数据
    await Promise.resolve()
    expect(okI18n.$t('engine', '引擎')).toBe('engine')
    expect(okI18n.$t('common.submit', '提交')).toBe('submit')
  })
})
