import { storiesOf } from "@storybook/react"
import * as React from "react"
import * as Relay from "react-relay"

import FollowButton from "../follow"

import * as Artsy from "../../components/artsy"
import { artsyNetworkLayer } from "../../relay/config"
import ArtistQueryConfig from "../../relay/queries/artist"

function ArtistExample(props: { artistID: string, user: User }) {
  // TODO This is going to change with the stubbed local MP schema anyways.
  // Relay.injectNetworkLayer(artsyNetworkLayer(props.user))
  Relay.injectNetworkLayer(artsyNetworkLayer(props.user))
  return (
    <Artsy.ContextProvider currentUser={props.user}>
      <Relay.RootContainer Component={FollowButton} route={new ArtistQueryConfig({ artistID: props.artistID })} />
    </Artsy.ContextProvider>
  )
}

storiesOf("Follow Button", FollowButton)
  .add("Follow Button (artist)", () => {
    const user = {
      id: "some-id",
      accessToken: "some-token",
    } as User
    return (
      <div>
        <ArtistExample
          artistID="damon-zucconi"
          user={user}
        />
      </div>
    )
  })
