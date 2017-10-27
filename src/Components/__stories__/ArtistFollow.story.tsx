import { storiesOf } from "@storybook/react"
import * as React from "react"
import * as Relay from "react-relay/classic"

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
    id: "547c73d57261692d83d70000",
    accessToken:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NDdjNzNkNTcyNjE2OTJkODNkNzAwMDAiLCJzYWx0X2hhc2giOiJhMzkxZmU2NzBlYWY3MDJlZGViMmNjODk3YTk3ZTQyNSIsInJvbGVzIjoidXNlciIsInBhcnRuZXJfaWRzIjpbXSwiZXhwIjoxNTE0MjA4Nzg3LCJpYXQiOjE1MDkwMjQ3ODcsImF1ZCI6IjRlMzZlZmE0ZGI0ZTMyMDAwMTAwMDM1OSIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI1OWYxZTQxMzhiM2I4MTU4ZjgwZjYxNjYifQ.yK6ise21DS0ohlpqPllMacd9prqGpccraeziiS-V4MY",
  } as User
  return (
    <div>
      <ArtistExample artistID="damon-zucconi" user={user} />
    </div>
  )
})
