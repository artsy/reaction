import Artwork from "./Artwork"
import ArtworkFilter from "./ArtworkFilter"
import ArtworkGrid from "./ArtworkGrid"
import BorderedPulldown from "./BorderedPulldown"
import Buttons from "./Buttons"
import Checkbox from "./Checkbox"
import Gene from "./Gene"
import Grid from "./Grid"
import Icon from "./Icon"
import Input from "./Input"
import Modal from "./Modal/Modal"
import Nav from "./Nav"
import Text from "./Text"
import TextArea from "./TextArea"
import TextLink from "./TextLink"
import Title from "./Title"

import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Relay from "react-relay"

import { artsyNetworkLayer } from "../Relay/config"
import * as Artsy from "./Artsy"

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
