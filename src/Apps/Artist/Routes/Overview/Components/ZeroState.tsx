import { Link, Message } from "@artsy/palette"
import { AnalyticsSchema, useSystemContext } from "Artsy"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import React from "react"
import { AuthModalIntent, openAuthModal } from "Utils/openAuthModal"

export const ZeroState = props => {
  const { mediator, user } = useSystemContext()
  const { is_followed, artist } = props

  function handleOpenAuth() {
    openAuthModal(mediator, {
      entity: artist,
      contextModule: AnalyticsSchema.ContextModule.ArtworkFilter,
      intent: AuthModalIntent.FollowArtist,
    })
  }

  return (
    <Message justifyContent="center" textSize="5">
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
