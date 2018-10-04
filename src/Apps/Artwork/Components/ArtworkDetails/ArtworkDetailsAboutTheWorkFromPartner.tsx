import {
  Avatar,
  Box,
  Sans,
  Serif,
  Spacer,
  StackableBorderBox,
} from "@artsy/palette"
import { filterLocations } from "Apps/Artwork/Utils/filterLocations"
import { FollowProfileButtonFragmentContainer as FollowProfileButton } from "Components/FollowButton/FollowProfileButton"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReadMore } from "Styleguide/Components"
import { EntityHeader } from "Styleguide/Components"
import { get } from "Utils/get"

import { ArtworkDetailsAboutTheWorkFromPartner_artwork } from "__generated__/ArtworkDetailsAboutTheWorkFromPartner_artwork.graphql"
import { ContextConsumer } from "Artsy/Router"
import { Responsive } from "Utils/Responsive"
import { READ_MORE_MAX_CHARS } from "./ArtworkDetailsAboutTheWorkFromArtsy"

export interface ArtworkDetailsAboutTheWorkFromPartnerProps {
  artwork: ArtworkDetailsAboutTheWorkFromPartner_artwork
}

export class ArtworkDetailsAboutTheWorkFromPartner extends React.Component<
  ArtworkDetailsAboutTheWorkFromPartnerProps
> {
  renderProfileImage(imageUrl?: string, initials?: string) {
    return <Avatar size="xs" src={imageUrl} initials={initials} mr={1} />
  }

  render() {
    const { artwork } = this.props
    const { additional_information, partner } = artwork
    const locationNames = get(
      partner,
      p => filterLocations(p.locations),
      []
    ).join(", ")

    const imageUrl = get(partner, p => p.profile.icon.url)

    return (
      <ContextConsumer>
        {({ user, mediator }) => {
          return (
            <Responsive>
              {({ xs }) => {
                const maxChars = xs
                  ? READ_MORE_MAX_CHARS.xs
                  : READ_MORE_MAX_CHARS.default

                return (
                  <StackableBorderBox p={2}>
                    <Box>
                      <EntityHeader
                        name={partner.name}
                        meta={locationNames}
                        imageUrl={imageUrl}
                        initials={partner.initials}
                        FollowButton={
                          partner.profile && (
                            <FollowProfileButton
                              profile={partner.profile}
                              user={user}
                              onOpenAuthModal={() => {
                                mediator &&
                                  mediator.trigger("open:auth", {
                                    mode: "signup",
                                    copy: `Sign up to follow ${partner.name}`,
                                    signupIntent: "follow gallery",
                                    afterSignUpAction: {
                                      kind: "profile",
                                      action: "follow",
                                      objectId:
                                        partner.profile && partner.profile.id,
                                    },
                                  })
                              }}
                              render={profile => {
                                const is_followed = profile.is_followed || false
                                return (
                                  <Sans
                                    size="2"
                                    weight="medium"
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
                            <ReadMore
                              maxChars={maxChars}
                              content={additional_information}
                            />
                          </Serif>
                        </React.Fragment>
                      )}
                    </Box>
                  </StackableBorderBox>
                )
              }}
            </Responsive>
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
      additional_information
      partner {
        name
        initials
        locations {
          city
        }
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
