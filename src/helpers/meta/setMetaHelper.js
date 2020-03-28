import baseMeta from './baseMeta'
const localBaseMeta = baseMeta()

const metaOptions = {
  name: {},
  property: {},
  itemprop: {}
}

/**
 * Set Meta Data for relevant Page
 * @param  {object} data
 */
function setMetaHelper (data = localBaseMeta) {
  let head = document.getElementsByTagName('head')[0]
  let diff = []

  // titles
  document.title = Object.prototype.hasOwnProperty.call(data, 'title') ? data.title : localBaseMeta.title
  metaOptions.name.title = document.title
  metaOptions.name['twitter:title'] = document.title
  metaOptions.property['og:title'] = document.title
  metaOptions.itemprop.name = document.title
  // descriptions
  metaOptions.name.description = Object.prototype.hasOwnProperty.call(data, 'description') ? data.description : localBaseMeta.description
  metaOptions.name['twitter:description'] = metaOptions.name.description
  metaOptions.property['og:description'] = metaOptions.name.description
  metaOptions.itemprop.description = metaOptions.name.description
  // keywords
  metaOptions.name.keywords = Object.prototype.hasOwnProperty.call(data, 'keywords') ? data.keywords : localBaseMeta.keywords
  // image
  metaOptions.itemprop.image = Object.prototype.hasOwnProperty.call(data, 'image') ? data.image : localBaseMeta.image
  metaOptions.property['twitter:image'] = metaOptions.itemprop.image
  metaOptions.property['og:image'] = metaOptions.itemprop.image
  // others
  metaOptions.type = Object.prototype.hasOwnProperty.call(data, 'type') ? data.type : ''

  // push meta data
  // pulled from:
  // https://github.com/ktquez/vue-head/blob/master/vue-head.js
  // and modified
  Object.keys(metaOptions).map((prop) => {
    Object.keys(metaOptions[prop]).map((value) => {
      // set state of elements
      const el = head.querySelector(`meta[${prop}="${value}"]`) || document.createElement('meta')
      const clone = el.cloneNode(true)
      const state = {}

      // Assign Content
      el.setAttribute('content', metaOptions[prop][value])

      // If exists element
      if (el.getAttribute(prop)) {
        state.before = clone
        state.after = el
        diff.push(state)

        return
      }

      // If not exists element
      el.setAttribute(prop, value)
      head.appendChild(el)
      state.after = el
      diff.push(state)
    })
  })
}

export default setMetaHelper
