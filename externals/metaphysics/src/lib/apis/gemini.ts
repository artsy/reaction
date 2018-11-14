import config from "config"
import urljoin from "url-join"
import fetch from "./fetch"

const { GEMINI_API_BASE } = config
export default (path, params) => fetch(urljoin(GEMINI_API_BASE, path), params)
