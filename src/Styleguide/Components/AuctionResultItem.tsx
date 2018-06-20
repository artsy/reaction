import { Serif } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { themeGet } from "styled-system"
import TextLink from "../../Components/TextLink"
import { Box } from "../Elements/Box"
import { Flex } from "../Elements/Flex"
import { Image } from "../Elements/Image"
import { Responsive } from "../Utils/Responsive"

const ScaledArtworkImage = props => (
  <Flex height={props.height} justifyContent="center">
    <Image {...props} />
  </Flex>
)

export interface AuctionResultItemProps {
  imageUrl: string
  title: string
  date: string
  dimensions: string
  organization: string
  auctionDate: string
  salePrice?: string
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

export const ExtraSmallAuctionResultItem = (props: AuctionResultItemProps) => {
  return (
    <Flex width="100%" justifyContent="space-between">
      <Flex width="70%">
        <div>
          <ScaledArtworkImage
            src={props.imageUrl}
            width="auto"
            height="30px"
            mx={2}
          />
        </div>
        <div>
          <Serif size="2">
            <Title>{props.title}, </Title>
            {props.date}
          </Serif>
          <MetadataContainer>
            <Serif size="2">{props.dimensions}</Serif>
          </MetadataContainer>
          <Box pt={1}>
            <Serif size="2">{props.organization}</Serif>
            <MetadataContainer>
              <Serif size="2">{props.auctionDate}</Serif>
              <Serif size="2">
                <TextLink underline>View Details</TextLink>
              </Serif>
            </MetadataContainer>
          </Box>

          <Box pt={1}>
            {props.salePrice && (
              <Serif size="2">{`Sale: ${props.salePrice}`}</Serif>
            )}
            <MetadataContainer>
              <Serif size="2">Est: {props.estimate}</Serif>
            </MetadataContainer>
          </Box>
        </div>
      </Flex>
    </Flex>
  )
}

export const SmallAuctionResultItem = (props: AuctionResultItemProps) => {
  return (
    <Flex width="100%" justifyContent="space-between">
      <Flex width="70%">
        <div>
          <ScaledArtworkImage
            src={props.imageUrl}
            width="auto"
            height="70px"
            mx={2}
          />
        </div>
        <div>
          <Serif size="2">
            <Title>{props.title}, </Title>
            {props.date}
          </Serif>
          <MetadataContainer>
            <Serif size="2">{props.dimensions}</Serif>
          </MetadataContainer>
          <Box pt={1}>
            <Serif size="2">{props.organization}</Serif>
            <MetadataContainer>
              <Serif size="2">{props.auctionDate}</Serif>
              <Serif size="2">
                <TextLink underline>View Details</TextLink>
              </Serif>
            </MetadataContainer>
          </Box>
        </div>
      </Flex>

      <div>
        {props.salePrice && (
          <Serif size="2">{`Sale: ${props.salePrice}`}</Serif>
        )}
        <MetadataContainer>
          <Serif size="2">Est: {props.estimate}</Serif>
        </MetadataContainer>
      </div>
    </Flex>
  )
}

export const LargeAuctionResultItem = (props: AuctionResultItemProps) => {
  return (
    <Flex width="100%" justifyContent="space-between">
      <Flex width="40%">
        <div>
          <ScaledArtworkImage
            src={props.imageUrl}
            width="auto"
            height="70px"
            mx={2}
          />
        </div>
        <div>
          <Serif size="2">
            <Title>{props.title}, </Title>
            {props.date}
          </Serif>
          <MetadataContainer>
            <Serif size="2">{props.dimensions}</Serif>
            <Serif size="1">{props.description}</Serif>
          </MetadataContainer>
        </div>
      </Flex>
      <div>
        <Serif size="2">{props.organization}</Serif>
        <MetadataContainer>
          <Serif size="2">{props.auctionDate}</Serif>
          <Serif size="2">
            <TextLink underline>Full Description</TextLink>
          </Serif>
        </MetadataContainer>
      </div>
      <div>
        {props.salePrice && (
          <Serif size="2">{`Sale: ${props.salePrice}`}</Serif>
        )}
        <MetadataContainer>
          <Serif size="2">Est: {props.estimate}</Serif>
        </MetadataContainer>
      </div>
    </Flex>
  )
}

const MetadataContainer = styled.div`
  color: ${themeGet("colors.black60")};
`

const Title = styled.span`
  font-style: italic;
`
