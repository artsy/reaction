import React, { Component } from "react"
import { Col, Row } from "react-styled-flexboxgrid"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { Embed } from "../Sections/Embed"
import { ImageCollection } from "../Sections/ImageCollection"
import { Text } from "../Sections/Text"
import { Video } from "../Sections/Video"
import { Layout } from "../Typings"

interface Props {
  article: {
    layout: Layout
    authors?: any
    sections?: any
  }
}

interface ContainerProp {
  type: string
}

export class NewsSections extends Component<Props> {
  getSection(section, index) {
    const { article } = this.props

    const sections = {
      image_collection: (
        <ImageCollection
          sectionLayout={section.layout}
          articleLayout={article.layout}
          images={section.images}
          targetHeight={500}
          gutter={10}
        />
      ),
      text: <Text html={section.body} layout={this.props.article.layout} />,
      default: false,
    }

    const sectionComponent = sections[section.type] || sections.default
    return sectionComponent
  }

  renderSections() {
    const { article } = this.props

    const renderedSections = article.sections.map((section, index) => {
      const child = this.getSection(section, index)

      if (child) {
        return (
          <NewsSectionContainer key={index} type={section.type}>
            {child}
          </NewsSectionContainer>
        )
      }
    })

    return renderedSections
  }

  renderByline() {
    const { article: { authors } } = this.props

    if (authors) {
      return
      // Return a byline
    }
  }

  render() {
    return (
      <Col>
        {this.renderSections()}
        {this.renderByline()}
      </Col>
    )
  }
}

const getMaxWidth = type => {
  if (type === "text") {
    return "max-width: 660px;"
  } else if (type === "image_collection") {
    return ""
  } else {
    return "max-width: 560px;"
  }
}

const NewsSectionContainer = styled(Row)`
  ${(props: ContainerProp) => getMaxWidth(props.type)};
  margin-bottom: 20px;

  ${pMedia.sm`
    margin: 0 20px 15px 20px;
    padding: 0px;
  `};
`
