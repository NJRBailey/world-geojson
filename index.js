function formatName(countryName) {
  return countryName
    .replace(/ /g, "_")
    .replace(/\./g, "")
    .replace(/&/g, "and")
    .toLowerCase()
}

async function importFile(filePath) {
  try {
    const data = await import(`${filePath}.json`, { assert: { type: 'json'} })
    return data
  } catch (e) {
    if (e.code !== 'ERR_MODULE_NOT_FOUND') throw e

    return null
  }
}

async function forCountry(countryName) {
  return await importFile(`./countries/${formatName(countryName)}`)
}

async function forArea(countryName, areaName) {
  return await importFile(`./areas/${formatName(countryName)}/${formatName(areaName)}`)
}

async function forState(countryName, stateName) {
  return await importFile(`./states/${formatName(countryName)}/${formatName(stateName)}`)
}

function requireFile(filePath) {
  try {
    return require(`${filePath}.json`)
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e

    return null
  }
}

function forCountrySync(countryName) {
  return requireFile(`./countries/${formatName(countryName)}`)
}

function forAreaSync(countryName, areaName) {
  return requireFile(`./areas/${formatName(countryName)}/${formatName(areaName)}`)
}

function forStateSync(countryName, stateName) {
  return requireFile(`./states/${formatName(countryName)}/${formatName(stateName)}`)
}

module.exports = {
  forCountry,
  forState,
  forArea,
  forCountrySync,
  forStateSync,
  forAreaSync
}