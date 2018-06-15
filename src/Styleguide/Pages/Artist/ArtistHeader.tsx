import React from "react"
import styled from "styled-components"
import { Serif } from "@artsy/palette"
import { Flex } from "Styleguide/Elements/Flex"
import { Button } from "Styleguide/Elements/Button"
import { Responsive } from "Styleguide/Utils/Responsive"
import { Box } from "Styleguide/Elements/Box"
import { LargeSlider, SmallSlider } from "Styleguide/Components/Slider"
import { Image } from "Styleguide/Elements/Image"

export class ArtistHeader extends React.Component {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <SmallArtistHeader />
          else return <LargeArtistHeader />
        }}
      </Responsive>
    )
  }
}

export const LargeArtistHeader = () => {
  return (
    <Box width="100%">
      <SliderContainer my={1}>
        <LargeSlider>
          <Image src="https://picsum.photos/400/200/?random" />
          <Image src="https://picsum.photos/200/200/?random" />
          <Image src="https://picsum.photos/500/200/?random" />
          <Image src="https://picsum.photos/200/200/?random" />
          <Image src="https://picsum.photos/300/200j/?random" />
        </LargeSlider>
      </SliderContainer>
      <Flex justifyContent="space-between">
        <Box>
          <Serif size="10">Donald Judd</Serif>
          <Box>
            <Serif size="3">Brazilian, 1886-1973</Serif>
            <Serif size="3">4,321 followers</Serif>
          </Box>
        </Box>
        <Button variant="primaryBlack" size="medium">
          Follow
        </Button>
      </Flex>
    </Box>
  );
}

export const SmallArtistHeader = () => {
  return (
    <Flex flexDirection="column">
      <SmallSlider>
        <Image src="https://picsum.photos/400/200/?random" />
        <Image src="https://picsum.photos/200/200/?random" />
        <Image src="https://picsum.photos/500/200/?random" />
        <Image src="https://picsum.photos/200/200/?random" />
        <Image src="https://picsum.photos/300/200j/?random" />
      </SmallSlider>
      <Flex flexDirection="column" alignItems="center">
        <Serif size="5">Donald Judd</Serif>
        <Flex>
          <Box mx={0.3}>
            <Serif size="2">Brazilian, 1886-1973</Serif>
          </Box>
          <Serif size="2">4,321 followers</Serif>
        </Flex>
      </Flex>
      <Box my={0.5}>
        <Button variant="primaryBlack" size="medium" width="100%">
          Follow
        </Button>
      </Box>
    </Flex>
  );
}

const SliderContainer = styled(Box)`
  position: relative;
  left: -${props => props.theme.space[4]}px;
  width: calc(100% + ${props => props.theme.space[6]}px);
`
