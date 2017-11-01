import { storiesOf } from "@storybook/react"
import * as React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "../../Relay/RootQueryRenderer"
import Follow from "../Follow"

function ArtistExample(props: { artistID: string; user: User }) {
  return (
    <RootQueryRenderer
      currentUser={props.user}
      query={graphql`
        query ArtistFollowQuery($artistID: String!) {
          artist(id: $artistID) {
            ...Follow_artist
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState => readyState.props && <Follow {...readyState.props as any} />}
    />
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
