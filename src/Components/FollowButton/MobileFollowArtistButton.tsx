import React from "react"
import { QueryRenderer, graphql } from "react-relay"
import { SystemContextProps, withSystemContext } from "Artsy/SystemContext"
import { Flex, Spinner } from "@artsy/palette"
import {
  MobileFollowArtistButtonQuery,
  MobileFollowArtistButtonQueryResponse,
  MobileFollowArtistButtonQueryVariables,
} from "__generated__/MobileFollowArtistButtonQuery.graphql"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "./FollowArtistButton"
import { ContextModule } from "@artsy/cohesion"

export const MobileFollowArtistButton: React.FC<MobileFollowArtistButtonQueryResponse> = props => {
  return (
    <FollowArtistButton
      contextModule={ContextModule.intextTooltip}
      artist={props.artist}
    />
  )
}

export const MobileFollowArtistButtonQueryRenderer = withSystemContext(
  ({
    artistId,
    relayEnvironment,
  }: SystemContextProps & MobileFollowArtistButtonQueryVariables) => {
    return (
      <QueryRenderer<MobileFollowArtistButtonQuery>
        // @ts-ignore
        environment={relayEnvironment}
        query={graphql`
          query MobileFollowArtistButtonQuery($artistId: String!) {
            artist(id: $artistId) {
              ...FollowArtistButton_artist
            }
          }
        `}
        variables={{ artistId }}
        render={({ props }) => {
          if (props) {
            return <MobileFollowArtistButton {...props} />
          } else {
            return (
              <Flex position="relative" height="178px">
                <Spinner />
              </Flex>
            )
          }
        }}
      />
    )
  }
)
