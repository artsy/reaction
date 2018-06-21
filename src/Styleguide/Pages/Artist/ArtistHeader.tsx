import { Serif } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { LargeSlider, SmallSlider } from "Styleguide/Components/Slider"
import { Box } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"

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
      <SliderContainer my={3}>
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
