import { FollowArtistPopover_suggested } from "__generated__/FollowArtistPopover_suggested.graphql"
import { FollowArtistPopoverQuery } from "__generated__/FollowArtistPopoverQuery.graphql"
import { ContextConsumer, ContextProps } from "Artsy/SystemContext"
import React, { SFC } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import styled from "styled-components"
import { FollowArtistPopoverRowFragmentContainer as FollowArtistPopoverRow } from "./FollowArtistPopoverRow"

const Container = styled.div``

interface Props extends ContextProps {
  suggested: FollowArtistPopover_suggested
}

const FollowArtistPopover: SFC<Props> = props => {
  const { suggested, user } = props
  const { related } = suggested
  return (
    <Container>
      {related.suggested.edges.map(({ node: artist }) => {
        return (
          <FollowArtistPopoverRow
            user={user}
            key={artist.__id}
            artist={artist}
          />
        )
      })}
    </Container>
  )
}

export const FollowArtistPopoverFragmentContainer = createFragmentContainer(
  FollowArtistPopover,
  graphql`
    fragment FollowArtistPopover_suggested on Artist {
      related {
        suggested(first: 3, exclude_followed_artists: true) {
          edges {
            node {
              __id
              ...FollowArtistPopoverRow_artist
            }
          }
        }
      }
    }
  `
)

export const FollowArtistPopoverQueryRenderer = ({
  artistID,
}: {
  artistID: string
}) => {
  return (
    <ContextConsumer>
      {({ relayEnvironment, user }) => {
        return (
          <QueryRenderer<FollowArtistPopoverQuery>
            environment={relayEnvironment}
            variables={{ artistID }}
            query={graphql`
              query FollowArtistPopoverQuery($artistID: String!) {
                artist(id: $artistID) {
                  ...FollowArtistPopover_suggested
                }
              }
            `}
            render={({ props }) => {
              return (
                props && (
                  <FollowArtistPopoverFragmentContainer
                    suggested={props.artist}
                    user={user}
                  />
                )
              )
            }}
          />
        )
      }}
    </ContextConsumer>
  )
}
