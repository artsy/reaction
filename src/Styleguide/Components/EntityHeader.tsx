import { Avatar, Box, Flex, Sans, Serif } from "@artsy/palette"
import FollowArtistButton from "Components/FollowButton/FollowArtistButton"
import React, { Component } from "react"

interface EntityHeaderProps {
  imageUrl?: string
  initials?: string
  meta: string | null
  name: string
  showFollow: boolean
}

export class EntityHeader extends Component<EntityHeaderProps> {
  static defaultProps: Partial<EntityHeaderProps> = {
    showFollow: true,
  }

  render() {
    const { imageUrl, initials, name, meta, showFollow } = this.props

    return (
      <>
        <Flex alignItems="center">
          <Box mr={1} pt={0.5}>
            <Avatar size="xs" src={imageUrl} initials={initials} />
          </Box>

          <Flex flexDirection="column" justifyContent="center">
            <Serif size="3" weight="semibold" color="black100">
              {name}
            </Serif>

            <Flex>
              <Sans size="2" color="black60">
                {meta}
              </Sans>

              {showFollow && (
                <>
                  {meta && (
                    <Box mx={0.3}>
                      <Sans size="2">•</Sans>
                    </Box>
                  )}

                  <FollowArtistButton
                    // artist={props.artist}
                    // user={props.user}
                    onOpenAuthModal={maybeAuthenticated}
                    render={_props => {
                      return (
                        <Sans
                          size="2"
                          weight="medium"
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          Follow
                        </Sans>
                      )
                    }}
                  >
                    Follow
                  </FollowArtistButton>
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </>
    )
  }
}

// FIXME: Implement
function maybeAuthenticated() {
  return true
}
