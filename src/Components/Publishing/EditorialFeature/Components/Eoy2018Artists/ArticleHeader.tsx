import { Box, color, Flex } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { BORDER_WIDTH } from "./index"

export class Eoy2018ArticleHeader extends React.Component<{
  images?: string[]
}> {
  render() {
    return (
      <ArticleHeader>
        <HeaderGrid flexWrap="wrap">
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
        </HeaderGrid>

        <Title>
          <TitleBlock>The Most </TitleBlock>
          <TitleBlock>Influential </TitleBlock>
          <TitleBlock>Artists of 2018</TitleBlock>
        </Title>
      </ArticleHeader>
    )
  }
}

const HeaderGrid = styled(Flex)`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  overflow: hidden;
`

const GridItem = styled(Box)`
  border: ${BORDER_WIDTH / 2}px solid ${color("purple100")};
  width: 25%;
  height: 30vh;
`

const ArticleHeader = styled.div`
  height: 90vh;
  border: ${BORDER_WIDTH}px solid ${color("purple100")};
  display: flex;
  align-items: center;
  position: relative;
`

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  ${unica("s100")};
`

const TitleBlock = styled.span`
  display: block;
  font-size: 20vh;
  line-height: initial;

  &:nth-child(2) {
    text-align: right;
  }
`
