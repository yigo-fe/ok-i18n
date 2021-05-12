# ok-i18n


## 安装方式
```
npm install ok-i18n
yarn add ok-i18n
```

## 使用方式
### Vue3项目

```typescript
import { createI18n } from 'ok-i18n'

const messages = {
  enUs: {
    language: 'English'
  },
  jaJP: {
    language: '日本語'
  }
}

const i18n = createI18n({
  locale: 'zh-CN',
  messages,
})
// i18n.locale 当前语言
// i18n.$t     通过js/ts直接使用翻译文案
// i18n.global 当前的OkI18n实例

const app = createApp(App).use(i18n)
```
#### 在Vue3组件中

```vue
<template>
  <div>{{ $t('language', '中文') }}</div>
</template>

<script >
import { defineComponent } from 'vue'
import { useI18n } from 'ok-i18n'
export default defineComponent({
  setup() {
    const i18n = useI18n()
    // 直接使用实例
    const text = i18n.$t('language')
    // 获取当前语言
    const locale = i18n.locale
  }
})
</script>
```

### 在非Vue3项目中

```typescript
import { OkI18n } from 'ok-i18n'

const messages = {
  enUs: {
    language: 'English'
  },
  jaJP: {
    language: '日本語'
  }
}
const i18n = new OkI18n({
  locale: 'zh-CN',
  messages
})

const text = i18n.$t('language', '中文')
```

### 使用变量

```typescript
import { OkI18n } from 'ok-i18n'

const messages = {
  enUs: {
    language: 'English {variable}'
  },
  jaJP: {
    language: ' {variable} 日本語'
  }
}
const i18n = new OkI18n({
  locale: 'zh-CN',
  messages
})

const text = i18n.$t('language', '中文 {variable}', { variable: '变量' })
```



## API

### OkI18nOptions

| 参数名称       | 是否必填 | 默认值                 | 可选值 | 描述                              | 版本  |
| -------------- | -------- | ---------------------- | ------ | --------------------------------- | ----- |
| locale         | 是       |                        |        | 设置语言                          | 1.0.0 |
| messages       | 是       |                        |        | 需要和语言相对应，如zh-CN对应zhCN | 1.0.0 |
| variableRegExp | 否       | /\{([0-9a-zA-Z_]+)\}/g |        |                                   | 1.0.1 |

### OkI18n实例方法和属性

| 名称      | 方法/属性 | 类型                                                         | 描述                                                         | 版本  |
| --------- | --------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ----- |
| locale    | 属性      | string                                                       | options中设置的语言                                          | 1.0.0 |
| $t        | 方法      | (path: string, fallback: string, variables?: Record<string, string \| number>): string | 获取翻译文案，当获取不到时会采用fallback，如果传入variables，会对获取到的文案或者fallback都生效 | 1.0.0 |
| setLocale | 方法      | (locale: string): void                                       | 设置语言                                                     | 1.0.0 |

