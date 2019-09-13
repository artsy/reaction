import { Message } from "@artsy/palette"
import { AnalyticsSchema } from "Artsy"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import React from "react"
import { AuthModalIntent, openAuthModal } from "Utils/openAuthModal"

export const ZeroState = props => {
  const { is_followed, artist, user, mediator } = props

  function handleOpenAuth() {
    openAuthModal(mediator, {
      entity: artist,
      contextModule: AnalyticsSchema.ContextModule.ArtworkFilter,
      intent: AuthModalIntent.FollowArtist,
    })
  }

  return (
    <Message>
      There aren’t any works available by the artist at this time.{" "}
      {!is_followed && (
        <>
          <FollowArtistButton
            artist={artist}
            useDeprecatedButtonStyle={false}
            user={user}
            onOpenAuthModal={() => handleOpenAuth()}
          />{" "}
          to receive notifications when new works are added.
        </>
      )}
    </Message>
  )
}
