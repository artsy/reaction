import { storiesOf } from "@storybook/react"
import * as React from "react"
import { graphql } from "react-relay/compat"

import { RootQueryRenderer } from "../../Relay/RootQueryRenderer"
import Fillwidth from "../Artwork/Fillwidth"

function FillwidthExample(props: { artistID: string; user: User }) {
  return (
    <RootQueryRenderer
      currentUser={props.user}
      query={graphql`
        query FillwidthQuery($artistID: String!) {
          artist(id: $artistID) {
            artworks: artworks_connection(first: 6) {
              ...Fillwidth_artworks
            }
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState => {
        return readyState.props && <Fillwidth {...readyState.props.artist as any} />
      }}
    />
  )
}

storiesOf("Components/Artworks/Fillwidth", module).add("A typical fillwidth", () => {
  const user = {
    id: "547c73d57261692d83d70000",
    accessToken:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NDdjNzNkNTcyNjE2OTJkODNkNzAwMDAiLCJzYWx0X2hhc2giOiJhMzkxZmU2NzBlYWY3MDJlZGViMmNjODk3YTk3ZTQyNSIsInJvbGVzIjoidXNlciIsInBhcnRuZXJfaWRzIjpbXSwiZXhwIjoxNTE0MjA4Nzg3LCJpYXQiOjE1MDkwMjQ3ODcsImF1ZCI6IjRlMzZlZmE0ZGI0ZTMyMDAwMTAwMDM1OSIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI1OWYxZTQxMzhiM2I4MTU4ZjgwZjYxNjYifQ.yK6ise21DS0ohlpqPllMacd9prqGpccraeziiS-V4MY",
  } as User
  return <FillwidthExample artistID="stephen-willats" user={user} />
})
