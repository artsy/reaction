import moment from "moment-timezone"

/**
 * Matches for Email / Instant Articles
 */
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * The quality to request from image CDN
 */
export const GLOBAL_IMAGE_QUALITY = 80

/**
 * TODO: Eventually remove sizeMe
 */
export const SIZE_ME_REFRESH_RATE = 500

/**
 * Relative path to article
 */
export const getArticleHref = slug => `/article/${slug}`

/**
 * Absolute path to article
 */
export const getArticleFullHref = slug => `https://www.artsy.net/article/${slug}`

/**
 * ByLine helpers
 * TODO: Move this into some kind of utils folder
 */
export const getAuthorByline = authors => {
  const authorCount = Number(authors && authors.length)

  if (authorCount === 1) {
    return authors[0].name || ''
  } else if (authorCount > 1) {
    const names = authors.reduce((prev, curr, i) => {
      let delim
      const len = authors.length
      if (i === len - 1) {
        delim = " and "
      } else if (i === 0) {
        delim = ""
      } else {
        delim = ", "
      }
      return prev + delim + curr.name
    }, "")
    return names

    // No Author
  } else {
    return "Artsy Editors"
  }
}

export const getDate = (date, layout = '') => {
  return layout === "condensed"
    ? moment(date).tz("America/New_York").format("MMM D, YYYY")
    : moment(date).tz("America/New_York").format("MMM D, YYYY h:mm a")
}

export const getMediaDate = (article) => {
  const { published_at, scheduled_publish_at, media } = article
  const { release_date } = media

  if (release_date) {
    return release_date
  } else {
    return published_at || scheduled_publish_at
  }
}

export const formatTime = (time) => {
  let minutes = Math.floor(time / 60) % 60
  let seconds = Math.floor(time % 60)
  minutes = minutes <= 0 ? 0 : minutes
  seconds = seconds <= 0 ? 0 : seconds

  const minutesStr = minutes < 10 ? "0" + minutes : minutes
  const secondsStr = seconds < 10 ? "0" + seconds : seconds
  return minutesStr + ":" + secondsStr
}
