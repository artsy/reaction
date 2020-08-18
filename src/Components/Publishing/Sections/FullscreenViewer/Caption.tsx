import { Box, Clickable, HTML, Text } from "@artsy/palette"
import React from "react"
import PropTypes from "prop-types"
import { ArtworkCaption } from "./ArtworkCaption"
import { Media } from "Utils/Responsive"

interface CaptionProps {
  section?: any // TODO: What am I?
  total: number
  index: number
  open: boolean
}

export const Caption: React.FC<CaptionProps> = (
  { index, open, section, total },
  context
) => {
  const isArtwork = section.type === "artwork"

  return (
    <>
      <Media lessThan="sm">
        <Box p={2} bg="black5">
          <Clickable
            display="flex"
            width="100%"
            onClick={context.onToggleCaption}
          >
            <Text
              flex="1"
              variant="caption"
              textAlign="left"
              style={{ textDecoration: "underline" }}
            >
              {open ? "Hide" : "View Caption"}
            </Text>

            <Text variant="caption">
              {index} of {total}
            </Text>
          </Clickable>

          {open && (
            <Box pt={2}>
              {isArtwork ? (
                <ArtworkCaption display="flex" flex="1" section={section} />
              ) : (
                <HTML variant="caption" html={section.caption} />
              )}
            </Box>
          )}
        </Box>
      </Media>

      <Media greaterThanOrEqual="sm">
        <Box
          position="relative"
          zIndex={2}
          display="flex"
          px={6}
          py={3}
          bg="black5"
        >
          <Box flex="1">
            {isArtwork ? (
              <ArtworkCaption display="flex" flex="1" section={section} />
            ) : (
              <HTML variant="caption" html={section.caption} />
            )}
          </Box>

          <Text variant="caption" pl={2}>
            {index} of {total}
          </Text>
        </Box>
      </Media>
    </>
  )
}

Caption.contextTypes = {
  onToggleCaption: PropTypes.func,
}
