import cheerio from "cheerio"
import { compact, last, uniq } from "lodash"
import moment from "moment"
import momentTz from "moment-timezone"
import url from "url"
import { ArticleData, DateFormat } from "../Publishing/Typings"

const APP_URL = process.env.APP_URL || "https://www.artsy.net"

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
export const getArticleFullHref = slug => `${APP_URL}/article/${slug}`

/**
 * Get the pre-slug part of URL
 */

export const getPreSlugPath = layout => {
  return ["standard", "feature"].includes(layout) ? "article" : layout
}

/**
 * Relative path to editorial entity
 */

export const getEditorialHref = (layout, slug) => {
  const layoutType = getPreSlugPath(layout)
  return `/${layoutType}/${slug}`
}

/**
 * Absolute path to editorial entity
 */
export const getFullEditorialHref = (layout, slug) => {
  const layoutType = getPreSlugPath(layout)
  return `${APP_URL}/${layoutType}/${slug}`
}

/**
 * Absolute path to artsy entity
 */
export const getFullArtsyHref = slug => `${APP_URL}/${slug}`

/**
 * ByLine helpers
 * TODO: Move this into some kind of utils folder
 */
export const getAuthorByline = (authors, isEditoral = true) => {
  const authorCount = Number(authors && authors.length)

  if (authorCount === 1) {
    return authors[0].name || ""
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
  } else if (isEditoral) {
    return "Artsy Editors"
  }
}

export const getDate = (date, format: DateFormat = "default") => {
  const today = moment()
  const isToday = today.isSame(moment(date), "day")
  const isThisYear =
    moment(date).format("YYYY") === moment(today).format("YYYY")

  switch (format) {
    case "monthDay":
      return moment(date).format("MMM D")
    case "monthYear":
      return momentTz(date)
        .tz("America/New_York")
        .format("MMMM YYYY")
    case "condensed":
      return momentTz(date)
        .tz("America/New_York")
        .format("MMM D, YYYY")
    case "verbose":
      const day = isToday
        ? "Today"
        : momentTz(date)
            .tz("America/New_York")
            .format("MMM D, YYYY")
      const time = momentTz(date)
        .tz("America/New_York")
        .format("h:mm a")
      return `${day} at ${time}`
    case "news":
      return isToday
        ? "Today"
        : isThisYear
        ? momentTz(date)
            .tz("America/New_York")
            .format("MMM D")
        : momentTz(date)
            .tz("America/New_York")
            .format("MMM D, YYYY")
    default:
      return momentTz(date)
        .tz("America/New_York")
        .format("MMM D, YYYY h:mm a")
  }
}

export const getCurrentUnixTimestamp = () => moment().unix()

export const getMediaDate = article => {
  const { published_at, scheduled_publish_at, media } = article
  const { release_date } = media

  if (release_date) {
    return release_date
  } else {
    return published_at || scheduled_publish_at
  }
}

export const formatTime = time => {
  let minutes = Math.floor(time / 60) % 60
  let seconds = Math.floor(time % 60)
  minutes = minutes <= 0 ? 0 : minutes
  seconds = seconds <= 0 ? 0 : seconds

  const minutesStr = minutes < 10 ? "0" + minutes : minutes
  const secondsStr = seconds < 10 ? "0" + seconds : seconds
  return minutesStr + ":" + secondsStr
}

interface SlugsFromArticle {
  artists: string[]
  genes: string[]
}

export const getArtsySlugsFromArticle = (
  article: ArticleData
): SlugsFromArticle => {
  const articleBody = article.sections
    .map(section => {
      if (section.type === "text") {
        return section.body
      }
    })
    .join()

  const artists = uniq(getArtsySlugsFromHTML(articleBody, "artist"))
  const genes = uniq(getArtsySlugsFromHTML(articleBody, "gene"))

  return {
    artists,
    genes,
  }
}

export const getArtsySlugsFromHTML = (
  html: string,
  model: string
): string[] => {
  const $ = cheerio.load(html)

  const slugs = compact($("a")).map(a => {
    const href = $(a).attr("href")
    if (href) {
      if (href.match(`artsy.net/${model}`)) {
        return last(url.parse(href).pathname.split("/"))
      } else {
        return null
      }
    } else {
      return null
    }
  })
  return compact(slugs)
}
