import { storiesOf } from "@storybook/react"
import React from "react"
import Relay from "react-relay"

import FollowButton from "../Follow"

import * as Artsy from "../../Components/Artsy"
import { artsyNetworkLayer } from "../../Relay/config"
import ArtistQueryConfig from "../../Relay/Queries/Artist"

function ArtistExample(props: { artistID: string; user: User }) {
  // TODO This is going to change with the stubbed local MP schema anyways.
  // Relay.injectNetworkLayer(artsyNetworkLayer(props.user))
  Relay.injectNetworkLayer(artsyNetworkLayer(props.user))
  return (
    <Artsy.ContextProvider currentUser={props.user}>
      <Relay.RootContainer Component={FollowButton} route={new ArtistQueryConfig({ artistID: props.artistID })} />
    </Artsy.ContextProvider>
  )
}

storiesOf("Components/Follow Button", module).add("Follow Button (artist)", () => {
  const user = {
    id: "some-id",
    accessToken: "some-token",
  } as User
  return (
    <div>
      <ArtistExample artistID="damon-zucconi" user={user} />
    </div>
  )
})
