import React from "react"
import { Responsive } from "../Utils/Responsive"
import { Flex } from "../Elements/Flex"
import { Image } from "../Elements/Image"
import { Serif } from "@artsy/palette"
import styled from "styled-components"
import { themeGet } from "styled-system"
import TextLink from "../../Components/TextLink"

const ScaledArtworkImage = props => (
  <Flex height={props.height} justifyContent="center">
    <Image {...props} />
  </Flex>
)

export interface Dimensions {
  in: string
  cm: string
}

export interface AuctionResultItemProps {
  imageUrl: string
  title: string
  date: string
  dimensions: Dimensions
  organization: string
  auctionDate: string
  salePrice: string
  estimate: string
  description: string
}

export class AuctionResultItem extends React.Component<AuctionResultItemProps> {
  render() {
    return (
      <Responsive>
        {({ xs, sm }) => {
          if (xs) return <ExtraSmallAuctionResultItem {...this.props} />
          else if (sm) return <SmallAuctionResultItem {...this.props} />
          return <LargeAuctionResultItem {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const ExtraSmallAuctionResultItem = (props: AuctionResultItemProps) => (
  <Flex p={2} width="100%" justifyContent="space-between">
    <Flex flexDirection="column" justifyContent="space-between">
      <div>
        <ScaledArtworkImage
          src={props.imageUrl}
          width="auto"
          height="30px"
          mr={4}
          ml={4}
        />
      </div>
    </Flex>
    <Flex flexDirection="column" justifyContent="space-between">
      <div>
        <Serif size="3t">
          <Title>{props.title}, </Title>
          {props.date}
        </Serif>
        <MetadataContainer>
          <Serif size="3t">{props.dimensions.in}</Serif>
          <Serif size="3t">{props.dimensions.cm}</Serif>
        </MetadataContainer>
        <br />
        <Serif size="3t">{props.organization}</Serif>
        <MetadataContainer>
          <Serif size="3t">{props.auctionDate}</Serif>
        </MetadataContainer>
        <Serif size="3t">Sale: {props.salePrice}</Serif>
        <MetadataContainer>
          <Serif size="3t">Est: {props.estimate}</Serif>
        </MetadataContainer>
      </div>
    </Flex>
  </Flex>
)

export const SmallAuctionResultItem = (props: AuctionResultItemProps) => (
  <Flex p={3} width="100%" justifyContent="space-between">
    <Flex flexDirection="column" justifyContent="space-between">
      <div>
        <ScaledArtworkImage
          src={props.imageUrl}
          width="auto"
          height="70px"
          mr={4}
          ml={4}
        />
      </div>
    </Flex>
    <Flex flexDirection="column" justifyContent="space-between">
      <div>
        <Serif size="3t">
          <Title>{props.title}, </Title>
          {props.date}
        </Serif>
        <MetadataContainer>
          <Serif size="3t">{props.dimensions.in}</Serif>
          <Serif size="3t">{props.dimensions.cm}</Serif>
        </MetadataContainer>
        <br />
        <Serif size="3t">{props.organization}</Serif>
        <MetadataContainer>
          <Serif size="3t">{props.auctionDate}</Serif>
          <Serif size="3t">
            <TextLink underline>View Details</TextLink>
          </Serif>
        </MetadataContainer>
      </div>
    </Flex>
    <Flex flexDirection="column" justifyContent="space-between">
      <div>
        <Serif size="3t">Sale: {props.salePrice}</Serif>
        <MetadataContainer>
          <Serif size="3t">Est: {props.estimate}</Serif>
        </MetadataContainer>
      </div>
    </Flex>
  </Flex>
)

export const LargeAuctionResultItem = (props: AuctionResultItemProps) => (
  <Flex p={4} width="100%" justifyContent="space-between">
    <Flex flexDirection="column" justifyContent="space-between">
      <div>
        <ScaledArtworkImage
          src={props.imageUrl}
          width="auto"
          height="70px"
          mr={4}
          ml={4}
        />
      </div>
    </Flex>
    <Flex flexDirection="column" justifyContent="space-between">
      <div>
        <Serif size="3t">
          <Title>{props.title}, </Title>
          {props.date}
        </Serif>
        <MetadataContainer>
          <Serif size="3t">{props.dimensions.in}</Serif>
          <Serif size="3t">{props.dimensions.cm}</Serif>
          <Serif size="3t">{props.description}</Serif>
        </MetadataContainer>
      </div>
    </Flex>
    <Flex flexDirection="column" justifyContent="space-between">
      <div>
        <Serif size="3t">{props.organization}</Serif>
        <MetadataContainer>
          <Serif size="3t">{props.auctionDate}</Serif>
          <Serif size="3t">
            <TextLink underline>Full Description</TextLink>
          </Serif>
        </MetadataContainer>
      </div>
    </Flex>
    <Flex flexDirection="column" justifyContent="space-between">
      <div>
        <Serif size="3t">Sale: {props.salePrice}</Serif>
        <MetadataContainer>
          <Serif size="3t">Est: {props.estimate}</Serif>
        </MetadataContainer>
      </div>
    </Flex>
  </Flex>
)

const MetadataContainer = styled.div`
  color: ${themeGet("colors.black60")};
`

const Title = styled.span`
  font-style: italic;
`
