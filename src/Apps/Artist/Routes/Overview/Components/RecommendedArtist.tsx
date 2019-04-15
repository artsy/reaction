import { EntityHeader, Sans, Spacer } from "@artsy/palette"
import { RecommendedArtist_artist } from "__generated__/RecommendedArtist_artist.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { SystemContext } from "Artsy/SystemContext"
import FillwidthItem from "Components/Artwork/FillwidthItem"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import { Carousel } from "Components/v2"
import { stringify } from "qs"
import React, { FC, useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { get } from "Utils/get"

interface RecommendedArtistProps {
  artist: RecommendedArtist_artist
}
const HEIGHT = 150

const handleOpenAuth = (mediator, artist) => {
  if (sd.IS_MOBILE) {
    openMobileAuth(artist)
  } else if (mediator) {
    openDesktopAuth(mediator, artist)
  } else {
    window.location.href = "/login"
  }
}

const openMobileAuth = artist => {
  const params = stringify({
    action: "follow",
    contextModule: Schema.ContextModule.RecommendedArtists,
    intent: "follow artist",
    kind: "artist",
    objectId: artist.id,
    signUpIntent: "follow artist",
    trigger: "click",
    entityName: artist.name,
  })
  const href = `/sign_up?redirect-to=${window.location}&${params}`

  window.location.href = href
}

const openDesktopAuth = (mediator, artist) => {
  mediator.trigger("open:auth", {
    mode: "signup",
    copy: `Sign up to follow ${artist.name}`,
    signupIntent: "follow artist",
    afterSignUpAction: {
      kind: "artist",
      action: "follow",
      objectId: artist.id,
    },
  })
}

@track({
  context_module: Schema.ContextModule.RecommendedArtists,
})
class RecommendedArtistWithTracking extends React.Component<
  RecommendedArtistProps
> {
  @track({
    type: Schema.Type.Thumbnail,
    action_type: Schema.ActionType.Click,
  })
  trackArtworkClicked() {
    // noop
  }

  render() {
    return (
      <RecommendedArtist
        {...this.props}
        onArtworkClicked={this.trackArtworkClicked.bind(this)}
      />
    )
  }
}

const RecommendedArtist: FC<
  RecommendedArtistProps & { onArtworkClicked: () => void }
> = ({ artist, onArtworkClicked }) => {
  const { user, mediator } = useContext(SystemContext)

  return (
    <>
      <EntityHeader
        mt={4}
        imageUrl={get(artist, a => a.image.cropped.url, "")}
        name={artist.name}
        meta={artist.formatted_nationality_and_birthday}
        href={artist.href}
        FollowButton={
          <FollowArtistButton
            artist={artist}
            user={user}
            trackingData={{
              modelName: Schema.OwnerType.Artist,
              context_module: Schema.ContextModule.RecommendedArtists,
              entity_id: artist._id,
              entity_slug: artist.id,
            }}
            onOpenAuthModal={() => handleOpenAuth(mediator, artist)}
            render={({ is_followed }) => {
              return (
                <Sans
                  size="2"
                  weight="medium"
                  color="black"
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {is_followed ? "Following" : "Follow"}
                </Sans>
              )
            }}
          />
        }
      />

      <Spacer mb={3} />

      <Carousel
        height={240}
        data={get(artist, a => a.artworks_connection.edges, []) as object[]}
        render={artwork => {
          const aspect_ratio = get(artwork, a => a.node.image.aspect_ratio, 1)

          return (
            <FillwidthItem
              artwork={artwork.node}
              targetHeight={HEIGHT}
              imageHeight={HEIGHT}
              width={HEIGHT * aspect_ratio}
              margin={10}
              user={user}
              mediator={mediator}
              onClick={onArtworkClicked}
            />
          )
        }}
      />
    </>
  )
}

export const RecommendedArtistFragmentContainer = createFragmentContainer(
  RecommendedArtistWithTracking,
  {
    artist: graphql`
      fragment RecommendedArtist_artist on Artist {
        id
        _id
        name
        formatted_nationality_and_birthday
        href
        image {
          cropped(width: 100, height: 100) {
            url
          }
        }
        artworks_connection(first: 20, sort: PUBLISHED_AT_DESC) {
          edges {
            node {
              __id
              image {
                aspect_ratio
              }
              ...FillwidthItem_artwork
            }
          }
        }
        ...FollowArtistButton_artist
      }
    `,
  }
)
