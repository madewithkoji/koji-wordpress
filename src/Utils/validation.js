export const getHostname = (url) => {
  return new URL(url).hostname.replace("www.", "")
}

export const isURLValid = (url, domain = null) => {
  try {
    new URL(url)

    if (domain === null) {
      return true
    }

    if (typeof domain === "string") {
      return getHostname(url) === domain
    }

    if (typeof domain === "object") {
      return domain.includes(getHostname(url))
    }

    return false // unknown case
  } catch {
    return false
  }
}

export const getKojiApp = (url) => {
  const regex =
    //eslint-disable-next-line
    /(?:https?:)?\/\/(?:[A-z]+\.)?withkoji\.com\/@?(?<username>[A-z0-9_]+)\/(?<app_id>[A-z0-9_]+)\/?/gm

  const result = regex.exec(url)

  if (result === null) {
    return false
  }

  return [result.groups.username, result.groups.app_id]
}
