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
      {(imageUrl || initials) && (
        <Flex mr={1}>
          <Avatar size="xs" src={imageUrl} initials={initials} />
        </Flex>
      )}

      <Flex flexDirection="column" justifyContent="center" width="100%">
        <Serif size="3" weight="semibold" color="black100">
          {name}
        </Serif>

        <Sans size="2" color="black60">
          {!!meta && <span>{meta}</span>}

          {FollowButton && (
            <>
              {meta && (
                <Sans size="2" color="black60" mx={0.3} display="inline-block">
                  •
                </Sans>
              )}
              <Box
                display="inline-block"
                onClick={event => {
                  // Capture click event so that interacting with Follow doesn't
                  // trigger Container's link.
                  event.stopPropagation()
                }}
              >
                {FollowButton}
              </Box>
            </>
          )}
        </Sans>
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

EntityHeader.displayName = "EntityHeader"
