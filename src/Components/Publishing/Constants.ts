import moment from "moment-timezone"

// TODO: Eventually remove sizeMe
export const sizeMeRefreshRate = 500
export const zIndex = { modal: 1070 }
export const articleHref = slug => `/article/${slug}`
export const articleFullHref = slug => `https://www.artsy.net/article/${slug}`
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// TODO: Move / find a better place for the below

/**
 * <ByLine /> helpers
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
    return "Artsy Editorial"
  }
}

export const getDate = (date, layout = '') => {
  return layout === "condensed"
    ? moment(date).tz("America/New_York").format("MMM D, YYYY")
    : moment(date).tz("America/New_York").format("MMM D, YYYY h:mm a")
}
