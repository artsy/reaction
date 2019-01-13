import {
  Avatar,
  Box,
  Flex,
  Link,
  Sans,
  Serif,
  SpacerProps,
} from "@artsy/palette"
import React, { SFC } from "react"
import styled from "styled-components"

interface EntityHeaderProps extends SpacerProps {
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
  ...remainderProps
}) => {
  const ContainerComponent = href ? FlexLink : Flex
  const containerProps = href
    ? { color: "black100", noUnderline: true, href }
    : {}

  return (
    <ContainerComponent {...remainderProps} {...containerProps}>
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
    </ContainerComponent>
  )
}

const FlexLink = styled(Link)`
  display: flex;
`

EntityHeader.displayName = "EntityHeader"
