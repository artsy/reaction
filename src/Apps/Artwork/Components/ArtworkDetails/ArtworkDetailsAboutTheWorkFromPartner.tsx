import { Box, Sans, Serif, Spacer, StackableBorderBox } from "@artsy/palette"
import { filterLocations } from "Apps/Artwork/Utils/filterLocations"
import { limitWithCount } from "Apps/Artwork/Utils/limitWithCount"
import { ContextConsumer } from "Artsy/Router"
import { FollowProfileButtonFragmentContainer as FollowProfileButton } from "Components/FollowButton/FollowProfileButton"
import { EntityHeader, ReadMore } from "Components/v2"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"
import { Media } from "Utils/Responsive"
import { READ_MORE_MAX_CHARS } from "./ArtworkDetailsAboutTheWorkFromArtsy"

import { ArtworkDetailsAboutTheWorkFromPartner_artwork } from "__generated__/ArtworkDetailsAboutTheWorkFromPartner_artwork.graphql"
import { data as sd } from "sharify"

import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import Events from "Utils/Events"

export interface ArtworkDetailsAboutTheWorkFromPartnerProps {
  artwork: ArtworkDetailsAboutTheWorkFromPartner_artwork
}

@track(
  {
    context_module: Schema.ContextModule.AboutTheWorkPartner,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class ArtworkDetailsAboutTheWorkFromPartner extends React.Component<
  ArtworkDetailsAboutTheWorkFromPartnerProps
> {
  @track({
    action_type: Schema.ActionType.Click,
    flow: Schema.Flow.ArtworkAboutTheWork,
    subject: Schema.Subject.ReadMore,
    type: Schema.Type.Button,
  })
  trackReadMoreClick() {
    // noop
  }

  renderReadMore(breakpoint?: string) {
    const { additional_information } = this.props.artwork
    const xs = breakpoint === "xs"
    const maxChars = xs ? READ_MORE_MAX_CHARS.xs : READ_MORE_MAX_CHARS.default

    return (
      <ReadMore
        maxChars={maxChars}
        content={additional_information}
        onReadMoreClicked={this.trackReadMoreClick.bind(this)}
      />
    )
  }

  render() {
    const { artwork } = this.props
    const { additional_information, partner } = artwork
    const locationNames = get(
      partner,
      p => limitWithCount(filterLocations(p.locations), 2),
      []
    ).join(", ")

    // Partner avatar is not shown for artworks from auctions
    const showPartnerLogo = !(artwork.sale && artwork.sale.is_benefit)
    const imageUrl = showPartnerLogo && get(partner, p => p.profile.icon.url)
    const partnerInitials = showPartnerLogo && partner.initials

    return (
      <ContextConsumer>
        {({ user, mediator }) => {
          return (
            <StackableBorderBox p={2}>
              <Box>
                <EntityHeader
                  name={partner.name}
                  href={
                    partner.is_default_profile_public &&
                    `${sd.APP_URL}${partner.href}`
                  }
                  meta={locationNames}
                  imageUrl={imageUrl}
                  initials={partnerInitials}
                  FollowButton={
                    partner.type !== "Auction House" &&
                    partner.profile && (
                      <FollowProfileButton
                        profile={partner.profile}
                        user={user}
                        trackingData={{
                          modelName: Schema.OwnerType.Partner,
                          context_module:
                            Schema.ContextModule.AboutTheWorkPartner,
                          entity_id: partner._id,
                          entity_slug: partner.id,
                        }}
                        onOpenAuthModal={() => {
                          mediator &&
                            mediator.trigger("open:auth", {
                              mode: "signup",
                              copy: `Sign up to follow ${partner.name}`,
                              signupIntent: "follow gallery",
                              afterSignUpAction: {
                                kind: "profile",
                                action: "follow",
                                objectId: partner.profile && partner.profile.id,
                              },
                            })
                        }}
                        render={profile => {
                          const is_followed = profile.is_followed || false
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
                      >
                        Follow
                      </FollowProfileButton>
                    )
                  }
                />
                {additional_information && (
                  <React.Fragment>
                    <Spacer mb={1} />
                    <Serif size="3">
                      <Media at="xs">{this.renderReadMore("xs")}</Media>
                      <Media greaterThan="xs">{this.renderReadMore()}</Media>
                    </Serif>
                  </React.Fragment>
                )}
              </Box>
            </StackableBorderBox>
          )
        }}
      </ContextConsumer>
    )
  }
}

export const ArtworkDetailsAboutTheWorkFromPartnerFragmentContainer = createFragmentContainer(
  ArtworkDetailsAboutTheWorkFromPartner,
  graphql`
    fragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {
      additional_information(format: HTML)
      sale {
        is_benefit
      }
      partner {
        _id
        id
        type
        href
        name
        initials
        locations {
          city
        }
        is_default_profile_public
        profile {
          ...FollowProfileButton_profile
          id
          icon {
            url(version: "square140")
          }
        }
      }
    }
  `
)
