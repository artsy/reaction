import React from "react"
import styled from "styled-components"
import { Arrow } from "Styleguide/Elements/Arrow"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { ImageProps } from "Styleguide/Elements/Image"
import { Responsive } from "Styleguide/Utils/Responsive"

import {
  BorderProps,
  borders,
  height,
  HeightProps,
  themeGet,
  width,
  WidthProps,
} from "styled-system"

export class Slider extends React.Component {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <SmallSlider {...this.props} />
          else return <LargeSlider {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargeSlider = props => {
  return (
    <Box>
      <Flex justifyContent="space-around" alignItems="center">
        <Button>
          <Arrow direction="left" color="black10" />
        </Button>
        <ImageContainer>
          {React.Children.map(
            props.children,
            (child: React.ReactElement<ImageProps>) => {
              return React.cloneElement(child, {
                mx: 0.5,
              })
            }
          )}
        </ImageContainer>
        <Button>
          <Arrow direction="right" color="black10" />
        </Button>
      </Flex>
    </Box>
  )
}

export const SmallSlider = props => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
    >
      <ImageContainer {...props}>
        {React.Children.map(
          props.children,
          (child: React.ReactElement<ImageProps>) => {
            return React.cloneElement(child, {
              style: {
                objectFit: "cover",
              },
              mx: 0.5,
              width: "100%",
              height: "200px",
            })
          }
        )}
      </ImageContainer>
      <Dots justifyContent="center" mt={1}>
        <Dot active />
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </Dots>
    </Flex>
  )
}

const Button = styled.div`
  height: 100%;
  position: relative;
`

interface ImageContainerProps extends WidthProps, HeightProps, BorderProps {}
const ImageContainer = styled.div.attrs<ImageContainerProps>({})`
  overflow-x: scroll;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  height: 100%;

  img {
    display: inline-block;
  }

  ${width};
  ${height};
  ${borders};
`

const Dots = styled(Flex)``

const Dot = styled.div.attrs<{ active?: boolean }>({})`
  ${props => {
    const colors = themeGet("colors")(props)
    const activeColor = props.active ? colors.black100 : colors.black10

    return `
      background: ${activeColor};
      border-radius: 50%;
      width: 3px;
      height: 3px;
      margin: 1px;
    `
  }};
`
