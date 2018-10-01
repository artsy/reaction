import { Avatar, Box, Flex, Sans, Serif } from "@artsy/palette"
import React, { SFC } from "react"

interface EntityHeaderProps {
  imageUrl?: string
  initials?: string
  meta?: string
  name: string
  showFollow?: boolean
  FollowButton?: JSX.Element
}

export const EntityHeader: SFC<EntityHeaderProps> = ({
  imageUrl,
  initials,
  name,
  meta,
  FollowButton,
}) => {
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
            {!!meta && (
              <Sans size="2" color="black60">
                {meta}
              </Sans>
            )}

            {FollowButton && (
              <>
                {meta && (
                  <Box mx={0.3}>
                    <Sans size="2">•</Sans>
                  </Box>
                )}
                {FollowButton}
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
