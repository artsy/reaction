import Artwork from "./artwork"
import ArtworkFilter from "./artwork_filter"
import ArtworkGrid from "./artwork_grid"
import BorderedPulldown from "./bordered_pulldown"
import Buttons from "./buttons/index"
import Checkbox from "./checkbox"
import Gene from "./gene/index"
import Grid from "./grid"
import Icon from "./icon"
import Input from "./input"
import Modal from "./modal/modal"
import Nav from "./nav"
import Text from "./text"
import TextArea from "./text_area"
import TextLink from "./text_link"
import Title from "./title"

import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Relay from "react-relay"

import { artsyNetworkLayer } from "../relay/config"
import * as Artsy from "./artsy"

interface InitOptions {
  user: User
  component: any
  domID: string
  queryConfig: any
}

export function init(options: InitOptions) {
  Relay.injectNetworkLayer(artsyNetworkLayer(options.user))

  const rootRoute = (
    <Artsy.ContextProvider currentUser={options.user}>
      <Relay.RootContainer Component={options.component} route={options.queryConfig} />
    </Artsy.ContextProvider>
  )

  ReactDOM.render(rootRoute, document.getElementById(options.domID))
}

export default {
  Artwork,
  ArtworkFilter,
  Buttons,
  Modal,
  ArtworkGrid,
  BorderedPulldown,
  Checkbox,
  Gene,
  Grid,
  Icon,
  Input,
  Nav,
  Text,
  TextArea,
  TextLink,
  Title,
}
