const sizeMeRefreshRate = 500

const zIndex = {
  modal: 1070,
}

const articleHref = slug => `https://artsy.net/article/${slug}`

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export { articleHref, emailRegex, sizeMeRefreshRate, zIndex }
