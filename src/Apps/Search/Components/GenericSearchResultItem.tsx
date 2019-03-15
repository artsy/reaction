import { Flex, Image, Link, Sans, Serif, Spacer } from "@artsy/palette"
import React, { SFC } from "react"

interface GenericSearchResultItemProps {
  item: any
  index: number
}

export const GenericSearchResultItem: SFC<
  GenericSearchResultItemProps
> = props => {
  const { item, index } = props

  return (
    <>
      <Flex flexDirection="row">
        <div>
          <Link href={item.href}>
            <Image
              width={70}
              height={70}
              mr={20}
              src={
                item.imageUrl || `https://picsum.photos/70/70/?random=${index}`
              }
            />
          </Link>
        </div>
        <div>
          <Sans color="black100" size="2" weight="medium">
            {item.searchableType}
          </Sans>
          <Spacer mb={0.5} />
          <Serif color="black100" size="3">
            {item.displayLabel}
          </Serif>
          <Spacer mb={0.5} />
          <Serif color="black60" size="3" maxWidth={536}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </Serif>
        </div>
      </Flex>
    </>
  )
}
