import { App, getCurrentInstance } from 'vue'
import { OkI18n, OkI18nOptions } from './i18n'

export function install(app: App, i18n: OkI18n) {
	app.config.globalProperties.$i18n = i18n
	app.config.globalProperties.$t = i18n.$t.bind(i18n)
}
export function useI18n() {
	const instance = getCurrentInstance()
	return instance?.proxy?.$i18n as OkI18n
}
export function createI18n(options: OkI18nOptions) {
	const okI18n = new OkI18n(options)
	return {
		global: okI18n,
		locale: okI18n.locale,
		$t: okI18n.$t.bind(okI18n),
		install(app: App) {
			install(app, okI18n)
		},
	}
}
export default install
