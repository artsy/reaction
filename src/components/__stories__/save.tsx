import { action, storiesOf } from "@kadira/storybook"
import * as React from "react"
import * as Relay from "react-relay"

import Artwork from "../artwork/grid_item"
import SaveButton from "../artwork/save"

import { artsyNetworkLayer } from "../../relay/config"
import ArtworkQueryConfig from "../../relay/queries/artwork"

function ArtworkExample(props: { artworkID: string, user?: any }) {
  Relay.injectNetworkLayer(artsyNetworkLayer(props.user))
  return <Relay.RootContainer Component={Artwork} route={new ArtworkQueryConfig({ artworkID: props.artworkID })} />
}

storiesOf("Save Button", SaveButton)
  .add("Save Button (logged in)", () => {
    return (
      <div style={{width: "200px"}}>
        <ArtworkExample
          artworkID="damon-zucconi-tetradic-edit-1"
          user={{id: "547e891d7261691220dc0000", accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NDdlODkxZDcyNjE2OTEyMjBkYzAwMDAiLCJzYWx0X2hhc2giOiI2OTg3ZjUzZmExOTQxZGUwM2E0YTA2NWNjZjA0YjBiZiIsInJvbGVzIjoidXNlcixhZG1pbiIsInBhcnRuZXJfaWRzIjpbXSwiZXhwIjoxNDk1OTg1MTU0LCJpYXQiOjE0OTA4MDExNTQsImF1ZCI6IjRlMzZlZmE0ZGI0ZTMyMDAwMTAwMDM1OSIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI1OGRiZDIwMjhiMGMxNDU3OWQ1YTEzOTgifQ.NNxQnjIAX8DTLtkR8XwB8-FTrZNqjLU9Y_Sf20kviLc"}}
        />
      </div>
    )
  })
