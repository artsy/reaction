import { storiesOf } from "@storybook/react"
import * as React from "react"
import * as Relay from "react-relay"

import FairBooth from "../Fair/Booth"
import ShowFeed from "../Fair/Feed"

import * as Artsy from "../../Components/Artsy"
import { artsyNetworkLayer } from "../../Relay/config"
import FairQueryConfig from "../../Relay/Queries/Fair"
import ShowQueryConfig from "../../Relay/Queries/Show"

function BoothExample(props: { showID: string }) {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return (
    <Artsy.ContextProvider>
      <Relay.RootContainer Component={FairBooth} route={new ShowQueryConfig({ showID: props.showID })} />
    </Artsy.ContextProvider>
  )
}

function FeedExample(props: { fairID: string }) {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return (
    <Artsy.ContextProvider>
      <Relay.RootContainer Component={ShowFeed} route={new FairQueryConfig({ fairID: props.fairID })} />
    </Artsy.ContextProvider>
  )
}

storiesOf("Components/Fair", module)
  .add("Booth", () => {
    return (
      <div>
        <BoothExample showID="sies-plus-hoke-1-sies-plus-hoke-at-art-basel-2017" />
      </div>
    )
  })
  .add("Feed", () => {
    return (
      <div>
        <FeedExample fairID="art-basel-2017" />
      </div>
    )
  })
