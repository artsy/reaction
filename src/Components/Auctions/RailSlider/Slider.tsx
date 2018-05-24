import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Slick from "react-slick"
import styled from "styled-components"

import FillwidthItem from "../../Artwork/FillwidthItem"
import Title from "../../Title"
import { Arrow } from "./Arrow"

const SETTINGS = {
  accessibility: true,
  className: "SlickContainer",
  dots: false,
  draggable: true,
  infinite: false,
  initialSlide: 0,
  lazyLoad: false,
  nextArrow: <Arrow direction="right" />,
  prevArrow: <Arrow direction="left" />,
  slidesToScroll: 4,
  slidesToShow: 4,
  variableWidth: true,
}

const ITEM_HEIGHT = 300

interface Props extends RelayProps {
  initialSlide?: number
}

const Content = styled.div`
  width: 100%;

  .SlickContainer {
    width: 80%;
    margin: auto;
  }
`

const Container = (props: Props) => {
  return (
    <Content>
      <Title style={{ marginLeft: "10%" }} titleSize="large">
        Lots by Followed Artists
      </Title>

      <Slick {...SETTINGS}>
        {props.sale.artworks.map((artwork, key) => {
          const {
            image: { aspect_ratio },
          } = artwork

          return (
            <div key={key}>
              <FillwidthItem
                artwork={artwork}
                targetHeight={ITEM_HEIGHT}
                imageHeight={ITEM_HEIGHT}
                width={ITEM_HEIGHT * aspect_ratio}
                margin={20}
              />
            </div>
          )
        })}
      </Slick>
    </Content>
  )
}

export const Slider = createFragmentContainer(
  Container,
  graphql`
    fragment Slider_sale on Sale {
      artworks {
        image {
          aspect_ratio
        }
        ...FillwidthItem_artwork
      }
    }
  `
)

interface RelayProps {
  sale: {
    artworks: any[] // FIXME: Add types
  }
}
