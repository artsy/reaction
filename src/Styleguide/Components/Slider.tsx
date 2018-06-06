import React from "react"
import styled from "styled-components"

export const Slider = props => {
  const src =
    props.size === "large"
      ? "assets/images/placeholder-slider.png"
      : "assets/images/placeholder-slider-small.png"

  return (
    <Container>
      <SliderImage src={src} />
    </Container>
  )
}

const Container = styled.div``

const SliderImage = styled.img`
  width: 100%;
`
