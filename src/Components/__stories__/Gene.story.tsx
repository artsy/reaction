import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "../../Relay/RootQueryRenderer"
import Gene from "../Gene"
import ArtistRow from "../Gene/ArtistRow"
import { NewContents } from "../Gene/NewContents"

import { ContextProvider } from "../Artsy"

function GeneExample(props: { geneID: string }) {
  return (
    <RootQueryRenderer
      query={graphql`
        query GeneQuery($geneID: String!) {
          gene(id: $geneID) {
            ...Gene_gene
          }
        }
      `}
      variables={{ geneID: props.geneID }}
      render={readyState => readyState.props && <Gene {...readyState.props as any} />}
    />
  )
}

function ArtistExample(props: { artistID: string }) {
  return (
    <RootQueryRenderer
      query={graphql`
        query GeneArtistRowQuery($artistID: String!) {
          artist(id: $artistID) {
            ...ArtistRow_artist
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState => readyState.props && <ArtistRow {...readyState.props as any} />}
    />
  )
}

storiesOf("Components/Rows/Gene", module)
  .add("Gene Row - Artist: Stephen Willats", () => {
    return (
      <div>
        <ArtistExample artistID="stephen-willats" />
      </div>
    )
  })
  .add("Gene Row - Artist: Banksy", () => {
    return (
      <div>
        <ArtistExample artistID="banksy" />
      </div>
    )
  })
  .add("Gene Row - Artist: Glenn Brown", () => {
    return (
      <div>
        <ArtistExample artistID="glenn-brown" />
      </div>
    )
  })

storiesOf("Components/Pages/Gene", module)
  .add("Integration - Minimalism", () => {
    return (
      <div>
        <GeneExample geneID="minimalism" />
      </div>
    )
  })
  .add("Integration - The Fantastic", () => {
    return (
      <div>
        <GeneExample geneID="the-fantastic" />
      </div>
    )
  })
  .add("Integration - Old Master Influenced Fantasy", () => {
    return (
      <div>
        <GeneExample geneID="old-master-influenced-fantasy" />
      </div>
    )
  })

  storiesOf("Components/Pages/Gene/NewContents", module)
  .add("Integration - Minimalism", () => {
    return (
      <div>
        < ContextProvider currentUser={{id: "58ed621f9c18db55bc6b2dde", name: "Matt", accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGVkNjIxZjljMThkYjU1YmM2YjJkZGUiLCJzYWx0X2hhc2giOiI2ZTVkMWVhYzJmMWQzNDhmZmZmOGJmMDAyOGQ1OTViOCIsInJvbGVzIjoidXNlciIsInBhcnRuZXJfaWRzIjpbXSwiZXhwIjoxNTE3NzYwMjA0LCJpYXQiOjE1MTI1NzYyMDQsImF1ZCI6IjRlMzZlZmE0ZGI0ZTMyMDAwMTAwMDM1OSIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI1YTI4MTRjYzhiM2I4MTQ1ZjI2YTliNzUifQ.ksCRUaQRvGNRW2VnOSAAT32r9PM9s04axn7SqI-_Kno"}}>
          <NewContents geneID="minimalism" mode="artists" />
        </ContextProvider>
      </div>
    )
  })
