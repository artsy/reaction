import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ArtistCard } from "../ArtistCard"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 220px;
  margin: 20px;
`

storiesOf("Styleguide/Components", module).add("ArtistCard", () => {
  return (
    <Wrapper>
      <ArtistCard
        src="https://picsum.photos/110/110/?random"
        headline="Francesca DiMattio"
        subHeadline="American, b. 1979"
      />
    </Wrapper>
  )
})
