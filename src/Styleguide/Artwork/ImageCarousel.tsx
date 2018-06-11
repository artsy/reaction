import React from "react"
import styled from "styled-components"

import { Flex } from "Styleguide/Elements/Flex"
import Icon from "Components/Icon"

const ImageContainer = styled.a`
  cursor: zoom-in;
`

export class ImageCarousel extends React.Component {
  render() {
    return (
      <Flex flexDirection="column">
        <ImageContainer>
          <img src="https://picsum.photos/622/755/?random" />
        </ImageContainer>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexBasis="60px"
        >
          <div>
            <a href="#TODO">
              <Icon name="heart" color="black" />
            </a>
            <a href="#TODO">
              <Icon name="share" color="black" />
            </a>
          </div>
        </Flex>
      </Flex>
    )
  }
}
