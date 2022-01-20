export class URLService {
  get url(): Location {
    return location
  }

  search: URLSearchParams

  constructor() {
    this.search = new URLSearchParams(this.url.search)
  }

  hasParam(param: string) {
    return this.search.has(param)
  }

  addParam(param: string, value: string | number) {
    this.search.append(param, `${value}`)
  }

  setParam(param: string, value: string | number) {
    this.search.set(param, `${value}`)
  }

  getParams() {
    return Object.fromEntries(this.search.entries())
  }

  reload() {
    this.url.reload()
  }

  clear() {
    history.pushState({}, document.title, '/')
  }
}
