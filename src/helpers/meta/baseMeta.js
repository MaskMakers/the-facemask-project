export default function baseMeta () {
  let baseMeta = {
    title: 'Mask Makers',
    description: 'Mask Makers is a grassroots way of helping to protect the medical staffs in our communities through the COVID-19 pandemic, by encouraging ordinary citizens under quarantine (and with a sewing machine) to become heroes of the pandemic!',
    keywords: 'coronavirus masks covid-19 handmade hospitals list template n95 makers volunteers pandemic community',
    image: '/og_mask-makers.jpg'
  }

  if (window.storeData) baseMeta = { ...baseMeta, ...window.storeData }

  return baseMeta
}
