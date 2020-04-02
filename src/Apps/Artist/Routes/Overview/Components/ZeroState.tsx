import { Link, Message } from "@artsy/palette"
import { useSystemContext } from "Artsy"
import * as SchemaV2 from "Artsy/Analytics/v2/Schema"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import React from "react"
import { openAuthToFollowSave } from "Utils/openAuthModal"

export const ZeroState = props => {
  const { mediator, user } = useSystemContext()
  const { is_followed, artist } = props

  function handleOpenAuth() {
    openAuthToFollowSave(mediator, {
      entity: artist,
      contextModule: SchemaV2.ContextModule.worksForSaleRail,
      intent: SchemaV2.AuthIntent.followArtist,
    })
  }

  return (
    <Message justifyContent="center" textSize="4">
      There aren’t any works available by the artist at this time.{" "}
      {!is_followed && (
        <>
          <FollowArtistButton
            artist={artist}
            useDeprecatedButtonStyle={false}
            user={user}
            onOpenAuthModal={() => handleOpenAuth()}
            render={({ name }) => {
              return (
                <span>
                  Follow <Link>{name}</Link>
                </span>
              )
            }}
          />{" "}
          to receive notifications when new works are added.
        </>
      )}
    </Message>
  )
}
