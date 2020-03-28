import baseMeta from './baseMeta'
import setMetaHelper from './setMetaHelper'

export function setMeta (to) {
  let meta = { ...baseMeta() }
  if (window.storeData) meta = JSON.parse(JSON.stringify(window.storeData))

  if (to.name === 'Home') {
    meta.title = `Home | ${meta.title}`
  } else if (to.name === 'MakeMask') {
    meta.title = `Make A Mask | ${meta.title}`
    meta.description = 'The template you choose will be dependant on who you are making them for and what materials you have available.'
  } else if (to.name === 'SendMask') {
    meta.title = `Send A Mask | ${meta.title}`
    meta.description = 'Send a mask to a facility in need!'
  } else if (to.name === 'MaskDetail') {
    meta.title = `Make A Mask | ${meta.title}`
    meta.description = 'Directions on how to create a mask.'
  }

  setMetaHelper(meta)
}

export function setMetaForMaskDetail (detail) {
  const localbaseMeta = baseMeta()
  const meta = {
    ...localbaseMeta,
    title: `${detail.title} | ${localbaseMeta.title}`,
    description: detail.description
  }

  setMetaHelper(meta)
}
