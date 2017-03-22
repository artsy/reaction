import * as Backbone from "backbone"

export default class CurrentUser extends Backbone.Model {
  get url() {
    return `${process.env.ARTSY_URL}/api/v1/me`
  }

  sync(method, model, options: any = {}) {
    options.headers = options.headers || {}
    options.headers["X-Access-Token"] = this.get("accessToken")
    return super.sync(method, model, options)
  }
}
