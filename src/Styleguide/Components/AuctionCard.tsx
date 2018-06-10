import React from "react"
import { Responsive } from "../Utils/Responsive"
import { Card } from "../Elements/Card"
import { Flex } from "../Elements/Flex"
import { Serif, Sans } from "@artsy/palette"
import styled from "styled-components"
import {
  space,
  width,
  SpaceProps,
  WidthProps,
  height,
  HeightProps,
} from "styled-system"

interface ImageWrapperProps extends HeightProps {}
const ImageWrapper = styled.div.attrs<ImageWrapperProps>({})`
  ${height};
`

interface ArtworkImageProps extends SpaceProps, WidthProps, HeightProps {
  src: string
}
const ArtworkImage = styled.img.attrs<ArtworkImageProps>({})`
  ${space};
  ${width};
  ${height};
`

const ScaledArtworkImage = props => (
  <ImageWrapper height={props.height}>
    <ArtworkImage {...props} />
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
  <Card flexDirection="column" p={4}>
    <Serif size="3t" weight="semibold">
      {props.headline}
    </Serif>
    <Serif size="3t">{props.subHeadline}</Serif>
    <ArtworkImage src={props.src} m={4} />
    <Sans size="1" weight="medium">
      {props.badge}
    </Sans>
  </Card>
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
