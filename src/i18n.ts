import {isPromise, isString} from './utils'
type Message = Record<string, any>
type PromiseMessage = Promise<Message>
type AsyncImportFunction = () => PromiseMessage
export interface OkI18nOptions {
	locale: string
	messages: {
		[locale: string]: Message | AsyncImportFunction
	}
}
type Variables = Record<string, string | number> | undefined
const formatReg = /\{([0-9a-zA-Z_]+)\}/g
export class OkI18n {
	public locale!: string
	private _messageCache: Map<string, string | undefined> = new Map()
	private messages: Message = {}
	private _messages: OkI18nOptions['messages']
	constructor(options: OkI18nOptions) {
		this._messages = Object.freeze(options.messages)
    this.setLocale(options.locale)
	}

	setLocale(locale: OkI18nOptions['locale']) {
    this.locale = locale
    this._messageCache.clear()
    const data = this.getMessageData()
    if (isPromise(data)) {
      data.then((res: Message) => {
        this._messageCache.clear()
        this.messages[this.localeInMessageKey] = res
      })
    } else {
      this.messages[this.localeInMessageKey] = data
    }
  }

	getMessageData(): PromiseMessage | Message {
		const result = this._messages[this.localeInMessageKey]
		if (typeof result === 'function') {
			return result()
		}
		return result
	}

	translate(path: string, fallback: string, variables?: Variables) {
		const message = this.getMessage(path)
		if (message) {
			return this.formatMessage(message, variables)
		}
		return this.formatMessage(fallback, variables)
	}

	getMessage(path: string): string | undefined {
		if (this._messageCache.has(path)) {
			return this._messageCache.get(path)
		}
		const pathArray = this.getPathArray(path)
		const result = pathArray.reduce(
			(
				message: Record<string, any> | undefined,
				path: string,
				index: number,
				arr: string[]
			) => {
				if (message === undefined) {
					return undefined
				}
				const result = message[path]
				if (index === arr.length - 1) {
					if (!isString(result)) {
						return undefined
					}
				}
				return result
			},
			this.message
		) as string | undefined
		this._messageCache.set(path, result)
		return result
	}

	formatMessage(message: string, variables?: Variables) {
		if (!variables) {
			return message
		}
		return message.replace(formatReg, (text: string, $1: string) => {
			const value = variables[$1]
			return value !== undefined ? String(value) : text
		})
	}

	getPathArray(path: string): string[] {
		return path.split('.')
	}

	get $t() {
		return this.translate
	}

	get localeInMessageKey() {
		return this.locale.replace(/-/g, '')
	}

	get message() {
		return this.messages[this.localeInMessageKey] ?? {}
	}
}
