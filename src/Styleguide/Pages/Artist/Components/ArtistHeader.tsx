import { Serif } from "@artsy/palette"
import { ArtistHeader_artist } from "__generated__/ArtistHeader_artist.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { LargeSlider, SmallSlider } from "Styleguide/Components/Slider"
import { Box } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"

interface Props {
  artist: ArtistHeader_artist
}

export class ArtistHeader extends React.Component<Props> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <SmallArtistHeader {...this.props} />
          else return <LargeArtistHeader {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargeArtistHeader = (props: Props) => {
  const { carousel } = props.artist

  return (
    <Box width="100%">
      <SliderContainer my={3}>
        <LargeSlider>
          {carousel.images.map(image => {
            return <Image src={image.resized.url} />
          })}
        </LargeSlider>
      </SliderContainer>
      <Flex justifyContent="space-between">
        <Box>
          <Serif size="10">{props.artist.name}</Serif>
          <Flex>
            <Serif size="3">Brazilian, 1886-1973</Serif>
            <Spacer mr={2} />
            <Serif size="3">4,321 followers</Serif>
          </Flex>
        </Box>
        <Button variant="primaryBlack" size="medium">
          Follow
        </Button>
      </Flex>
    </Box>
  )
}

export const SmallArtistHeader = (props: Props) => {
  const { carousel } = props.artist
  return (
    <Flex flexDirection="column">
      <SmallSlider>
        {carousel.images.map(image => {
          return <Image src={image.resized.url} />
        })}
      </SmallSlider>
      <Flex flexDirection="column" alignItems="center">
        <Serif size="5">{props.artist.name}</Serif>
        <Flex>
          <Box mx={1}>
            <Serif size="2">Brazilian, 1886-1973</Serif>
          </Box>
          <Serif size="2">4,321 followers</Serif>
        </Flex>
      </Flex>
      <Box my={2}>
        <Button variant="primaryBlack" size="medium" width="100%">
          Follow
        </Button>
      </Box>
    </Flex>
  )
}

const SliderContainer = styled(Box)`
  position: relative;
  left: -${props => props.theme.space[2]}px;
  width: calc(100% + ${props => props.theme.space[4]}px);
`

export const ArtistHeaderFragmentContainer = createFragmentContainer(
  ArtistHeader,
  graphql`
    fragment ArtistHeader_artist on Artist {
      name
      bio
      carousel {
        images {
          resized(height: 300) {
            url
          }
        }
      }
    }
  `
)
