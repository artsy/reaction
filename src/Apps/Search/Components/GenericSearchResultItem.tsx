import {
  Box,
  Flex,
  Image,
  Link,
  ReadMore,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"
import React, { FC } from "react"

interface GenericSearchResultItemProps {
  imageUrl: string
  name: string
  description?: string
  href: string
  entityType: string
}

export const GenericSearchResultItem: FC<
  GenericSearchResultItemProps
> = props => {
  const { imageUrl, href, name, description, entityType } = props

  const translateEntityType = anEntityType => {
    switch (anEntityType) {
      case "PartnerShow":
        return "Show"
        break
      default:
        return anEntityType
    }
  }

  return (
    <>
      <Flex flexDirection="row">
        <Link href={href}>
          <Box height={70} width={70} mr={2} bg="black5">
            {imageUrl && <Image width={70} height={70} src={imageUrl} />}
          </Box>
        </Link>
        <Box>
          <Sans color="black100" size="2" weight="medium">
            {translateEntityType(entityType)}
          </Sans>
          <Spacer mb={0.5} />
          <Link href={href} underlineBehavior="hover">
            <Serif color="black100" size="3">
              {name}
            </Serif>
          </Link>
          {description && (
            <>
              <Spacer mb={0.5} />
              <Serif color="black60" size="3" maxWidth={536}>
                <ReadMore maxChars={200} content={description} />
              </Serif>
            </>
          )}
        </Box>
      </Flex>
    </>
  )
}
