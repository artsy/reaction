import React from "react"
import { Box, BoxProps, Button } from "@artsy/palette"
import { ArtworkCaption as BaseArtworkCaption } from "../ArtworkCaption"

interface ArtworkCaptionProps extends BoxProps {
  section: unknown & { type: "artwork"; slug: string }
}

export const ArtworkCaption: React.FC<ArtworkCaptionProps> = ({
  section,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <BaseArtworkCaption
        flex="1"
        artwork={section}
        isFullscreenCaption
        linked
        color="black100"
      />

      <Button
        variant="secondaryGray"
        // TODO: event should be the correct type in palette
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          // TODO: This isn't a real link and that's annoying
          // <Button> doesn't support `as`, once it does, replace
          // click handler this with: as={RouterLink} to={`/artwork/${section.slug}`}
          const path = `/artwork/${section.slug}`

          if (event.metaKey) {
            window.open(path, "_blank")
            return
          }

          window.location.href = path
        }}
      >
        View
      </Button>
    </Box>
  )
}
