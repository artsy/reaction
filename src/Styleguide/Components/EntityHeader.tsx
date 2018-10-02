import { Avatar, Box, Flex, Sans, Serif } from "@artsy/palette"
import React, { SFC } from "react"
import styled, { css } from "styled-components"

interface EntityHeaderProps {
  href?: string
  imageUrl?: string
  initials?: string
  meta?: string
  name: string
  showFollow?: boolean
  FollowButton?: JSX.Element
}

export const EntityHeader: SFC<EntityHeaderProps> = ({
  href,
  imageUrl,
  initials,
  name,
  meta,
  FollowButton,
}) => {
  const handleContainerClick = () => {
    if (href) {
      location.href = href
    }
  }

  return (
    <Container onClick={() => handleContainerClick()} hasLink={!!href}>
      {imageUrl && (
        <Box mr={1} pt={2}>
          <Avatar size="xs" src={imageUrl} initials={initials} />
        </Box>
      )}

      <Flex flexDirection="column" justifyContent="center" width="100%">
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
                  <Sans size="2" color="black60">
                    •
                  </Sans>
                </Box>
              )}
              <span
                onClick={event => {
                  // Capture click event so that interacting with Follow doesn't
                  // trigger Container's link.
                  event.stopPropagation()
                }}
              >
                {FollowButton}
              </span>
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  )
}

const Container = styled(Flex)<{ hasLink: boolean }>`
  ${props => {
    if (props.hasLink) {
      return css`
        cursor: pointer;
      `
    }
  }};
`
