import { storiesOf } from "@storybook/react"
import * as React from "react"
import * as Relay from "react-relay"

import FairBooth from "../fair/booth"

import * as Artsy from "../../components/artsy"
import { artsyNetworkLayer } from "../../relay/config"
import ShowQueryConfig from "../../relay/queries/show"

function BoothExample(props: { showID: string }) {
  Relay.injectNetworkLayer(artsyNetworkLayer())
  return (
    <Artsy.ContextProvider>
      <Relay.RootContainer Component={FairBooth} route={new ShowQueryConfig({ showID: props.showID })} />
    </Artsy.ContextProvider>
  )
}

storiesOf("Fair", FairBooth)
  .add("Booth", () => {
    return (
      <div>
        <BoothExample
          showID="sies-plus-hoke-1-sies-plus-hoke-at-art-basel-2017"
        />
      </div>
    )
  })
