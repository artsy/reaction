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
import { ContextProps, SystemContext } from "Artsy/SystemContext"
import React, { SFC, useContext } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import styled from "styled-components"
import { Provider } from "unstated"
import { FollowArtistPopoverRowFragmentContainer as FollowArtistPopoverRow } from "./FollowArtistPopoverRow"
import { FollowArtistPopoverState } from "./state"

// TODO: Revisit possibility of creating an Artsy popover for it.
const BorderedContainer = styled(BorderBox)`
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
`

const Container = Box
const TitleContainer = Box

interface Props extends ContextProps {
  suggested: FollowArtistPopover_suggested
  onClose?: () => void
}

const FollowArtistPopover: SFC<Props> = props => {
  const { suggested, user } = props
  const { related } = suggested
  const suggetionsCount = related.suggested.edges.length
  if (suggetionsCount === 0) return null
  const excludeArtistIds = related.suggested.edges.map(({ node: { _id } }) => {
    return _id
  })
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
          <Provider
            inject={[new FollowArtistPopoverState({ excludeArtistIds })]}
          >
            {related.suggested.edges.map(({ node: artist }, index) => {
              return (
                <React.Fragment key={artist.__id}>
                  <FollowArtistPopoverRow user={user} artist={artist} />
                  {index < suggetionsCount - 1 && <Separator />}
                </React.Fragment>
              )
            })}
          </Provider>
        </Flex>
      </Container>
    </BorderedContainer>
  )
}

export const FollowArtistPopoverFragmentContainer = createFragmentContainer(
  FollowArtistPopover,
  {
    suggested: graphql`
      fragment FollowArtistPopover_suggested on Artist {
        related {
          suggested(first: 3, exclude_followed_artists: true) {
            edges {
              node {
                __id
                _id
                ...FollowArtistPopoverRow_artist
              }
            }
          }
        }
      }
    `,
  }
)

export const FollowArtistPopoverQueryRenderer = ({
  artistID,
}: {
  artistID: string
}) => {
  const { relayEnvironment, user } = useContext(SystemContext)
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
}
