import config from "config"
import urljoin from "url-join"
import fetch from "./fetch"

const { GOOGLE_CSE_API_BASE } = config

export default path => fetch(urljoin(GOOGLE_CSE_API_BASE, path))
