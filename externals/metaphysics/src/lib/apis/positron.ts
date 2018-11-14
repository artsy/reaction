import config from "config"
import urljoin from "url-join"
import fetch from "./fetch"

const { POSITRON_API_BASE } = config

export default path => fetch(urljoin(POSITRON_API_BASE, path))
