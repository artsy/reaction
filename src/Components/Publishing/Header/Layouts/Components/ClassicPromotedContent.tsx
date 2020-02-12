import {
  Box,
  Button,
  Flex,
  Image,
  Sans,
  Separator,
  Serif,
  space,
} from "@artsy/palette"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"
import { Media } from "Utils/Responsive"

export const ClassicPromotedContent: React.SFC<{
  article: ArticleData
}> = props => {
  const {
    article: { partner, sale },
  } = props
  const name = partner ? partner.name : sale && sale.name
  const image = partner
    ? partner.profile.image.cropped.url
    : sale && sale.cover_image.cropped.url
  const href = partner ? partner.profile.href : sale && sale.href

  return (
    <Box px={space(2)} maxWidth={[1250]} mx="auto">
      <Flex justifyContent="space-between" mb={space(2)} alignItems="center">
        <Flex>
          <Media greaterThan="xs">
            <Image src={image} width="100px" mr={space(2)} />
          </Media>

          <Flex flexDirection="column">
            <Sans size={["3", "4"]} weight="medium">
              Promoted Content
            </Sans>
            <Serif size={["4", "5"]}>{name}</Serif>
          </Flex>
        </Flex>

        <Media greaterThan="xs">
          <a href={href}>
            <Button variant="secondaryOutline">
              Explore {partner ? "Gallery" : "Auction"}
            </Button>
          </a>
        </Media>
      </Flex>
      <Separator color="black60" />
    </Box>
  )
}
