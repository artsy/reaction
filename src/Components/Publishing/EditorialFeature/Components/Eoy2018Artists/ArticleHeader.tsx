import { Box, color, Flex } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import { flatten, map } from "lodash"
import React from "react"
import styled from "styled-components"
import { resize } from "Utils/resizer"
import { Media } from "Utils/Responsive"

export class Eoy2018ArticleHeader extends React.Component<{
  images?: any
}> {
  getImageUrls = gridSize => {
    const bgImages = map(flatten(this.props.images), "url")
    const resizedImages = bgImages.map(url => resize(url, { width: 300 }))
    const urls = []

    let i = 0
    for (i; i < gridSize; i++) {
      const bgIndex = Math.floor(
        Math.random() * Math.floor(resizedImages.length)
      )
      urls.push(resizedImages[bgIndex])
    }
    return urls
  }

  render() {
    const gridSize = 12 // TODO: responsive gridSize
    const imageUrls = this.getImageUrls(gridSize)
    return (
      <ArticleHeader>
        <HeaderGrid flexWrap="wrap">
          {imageUrls.map((src, i) => (
            <GridItem key={i}>
              <Img src={src} />
            </GridItem>
          ))}
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`

const Img = styled.div<{ src?: string }>`
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s;

  ${({ src }) =>
    src &&
    `
    background: url(${src});
    background-size: cover;
    background-position: 50%;
    mix-blend-mode: screen;
    filter: grayscale(100%);
  `};
`

const GridItem = styled(Box)`
  border: 3px solid ${color("purple100")};
  width: 25%;
  transition: background-color 0.5s;

  &:hover {
    background-color: ${color("purple100")};
    ${Img} {
      opacity: 1;
    }
  }
`

const ArticleHeader = styled.div`
  height: 90vh;
  border: 3px solid ${color("purple100")};
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
