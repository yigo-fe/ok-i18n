## ok-i18n


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
在Vue3组件中
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
