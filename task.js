import { listen, parse, trigger } from 'anticore'

const { history } = globalThis

const has = (element, name) => element.classList.contains(name)

const stringify = ({ outerHTML }) => outerHTML

const replace = element => {
  const { name, nodeName, property, ownerDocument } = element
  const tag = nodeName.toLowerCase()
  const selector = tag !== 'meta'
    ? tag
    : `${tag}[${name ? 'name' : 'property'}="${name || property}"]`

  ownerDocument.querySelector(selector).replaceWith(element)
}

listen('popstate', globalThis, ({ state }) => {
  const body = parse(state, globalThis.document.location.href)

  body.classList.add('cached')
  trigger(body)
})

export default (main, url) => {
  const root = main.getRootNode()
  const body = main.closest('body')
  const title = root.querySelector('title')
  const metas = root.querySelectorAll('meta[name], meta[property]')
  const elements = [title, ...metas, main]
  const sources = elements.map(stringify)
  const args = [sources.join(''), title.innerHTML, url]

  if (!has(body, 'anticore')) {
    history.replaceState(...args)

    return
  }

  elements.forEach(replace)

  if (!has(body, 'cached') && !has(main, 'error')) {
    history.pushState(...args)
  }

  if (!globalThis.location.hash) {
    globalThis.scrollTo(0, 0)
  }
}
