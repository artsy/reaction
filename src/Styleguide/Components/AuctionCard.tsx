import React from "react"
import { Responsive } from "../Utils/Responsive"
import { BorderBox } from "../Elements/Box"
import { Flex } from "../Elements/Flex"
import { Image } from "../Elements/Image"
import { Serif, Sans } from "@artsy/palette"
import styled from "styled-components"
import { height, HeightProps } from "styled-system"

interface ImageWrapperProps extends HeightProps {}
const ImageWrapper = styled.div.attrs<ImageWrapperProps>({})`
  ${height};
`

const ScaledArtworkImage = props => (
  <ImageWrapper height={props.height}>
    <Image {...props} />
  </ImageWrapper>
)

export interface AuctionCardProps {
  src: string
  headline: string
  subHeadline: string
  badge: string
}

export class AuctionCard extends React.Component<AuctionCardProps> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <SmallAuctionCard {...this.props} />
          else return <LargeAuctionCard {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargeAuctionCard = props => (
  <BorderBox hover flexDirection="column">
    <Serif size="3t" weight="semibold">
      {props.headline}
    </Serif>
    <Serif size="3t">{props.subHeadline}</Serif>
    <Image src={props.src} m={4} />
    <Sans size="1" weight="medium">
      {props.badge}
    </Sans>
  </BorderBox>
)

export const SmallAuctionCard = props => (
  <Flex p={4}>
    <Flex flexDirection="column" justifyContent="space-between">
      <div>
        <Serif size="3t" weight="semibold">
          {props.headline}
        </Serif>
        <Serif size="3t">{props.subHeadline}</Serif>
      </div>
      <Sans size="1" weight="medium">
        {props.badge}
      </Sans>
    </Flex>
    <ScaledArtworkImage
      src={props.src}
      width="auto"
      height="82px"
      mr={4}
      ml={4}
    />
  </Flex>
)
