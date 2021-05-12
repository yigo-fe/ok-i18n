import { OkI18n } from './i18n'

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$i18n: OkI18n
		$t: OkI18n['translate']
	}
}
