import {
  BorderBox,
  Box,
  CloseIcon,
  Flex,
  Link,
  Sans,
  Separator,
  space,
} from "@artsy/palette"
import { FollowArtistPopover_suggested } from "__generated__/FollowArtistPopover_suggested.graphql"
import { FollowArtistPopoverQuery } from "__generated__/FollowArtistPopoverQuery.graphql"
import { SystemContextConsumer, SystemContextProps } from "Artsy/SystemContext"
import React, { SFC } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import styled from "styled-components"
import { FollowArtistPopoverRowFragmentContainer as FollowArtistPopoverRow } from "./FollowArtistPopoverRow"

// TODO: Revisit possibility of creating an Artsy popover for it.
const BorderedContainer = styled(BorderBox)`
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
`

const Container = Box
const TitleContainer = Box

interface Props extends SystemContextProps {
  suggested: FollowArtistPopover_suggested
  onClose?: () => void
}

const FollowArtistPopover: SFC<Props> = props => {
  const { suggested, user } = props
  const { related } = suggested
  const suggetionsCount = related.suggested.edges.length
  if (suggetionsCount === 0) return null
  return (
    <BorderedContainer>
      <Container>
        <TitleContainer mb={1}>
          <Sans size="3" weight="medium" color="black100">
            Other artists you might like
          </Sans>
          <Box position="absolute" top={space(1)} right={space(1)}>
            <Link onClick={props.onClose}>
              <CloseIcon fill={"black30"} />
            </Link>
          </Box>
        </TitleContainer>
        <Flex flexDirection="column">
          {related.suggested.edges.map(({ node: artist }, index) => {
            return (
              <React.Fragment key={artist.__id}>
                <FollowArtistPopoverRow user={user} artist={artist} />
                {index < suggetionsCount - 1 && <Separator />}
              </React.Fragment>
            )
          })}
        </Flex>
      </Container>
    </BorderedContainer>
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
    <SystemContextConsumer>
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
    </SystemContextConsumer>
  )
}
