import { Box, color, Flex, Sans, space } from "@artsy/palette"
import { FollowArtistPopover_suggested } from "__generated__/FollowArtistPopover_suggested.graphql"
import { FollowArtistPopoverQuery } from "__generated__/FollowArtistPopoverQuery.graphql"
import { ContextConsumer, ContextProps } from "Artsy/SystemContext"
import Icon from "Components/Icon"
import React, { SFC } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import styled from "styled-components"
import { FollowArtistPopoverRowFragmentContainer as FollowArtistPopoverRow } from "./FollowArtistPopoverRow"

// TODO: Revisit and style this better.
const Container = styled.div`
  background-color: white;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
`

const TitleContainer = styled.div`
  background-color: white;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-top: 1px solid black;
`

const CloseIcon = styled(Icon)`
  color: ${color("black30")};
  cursor: pointer;
  font-size: 12px;
`

interface Props extends ContextProps {
  suggested: FollowArtistPopover_suggested
}

interface TitleProps {
  onClose?: () => void
}

export const FollowArtistPopoverTitle: SFC<TitleProps> = props => {
  return (
    <TitleContainer>
      <Sans size="1" weight="medium">
        Other artists you might like
      </Sans>
      <Box position="absolute" top={space(1)} right={space(1)}>
        <CloseIcon name="close" onClick={props.onClose} />
      </Box>
    </TitleContainer>
  )
}

const FollowArtistPopover: SFC<Props> = props => {
  const { suggested, user } = props
  const { related } = suggested
  return (
    <Container>
      <Flex flexDirection="column">
        {related.suggested.edges.map(({ node: artist }) => {
          return (
            <FollowArtistPopoverRow
              user={user}
              key={artist.__id}
              artist={artist}
            />
          )
        })}
      </Flex>
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
