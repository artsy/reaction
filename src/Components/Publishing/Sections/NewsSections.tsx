import React, { Component } from "react"
import { Col, Row } from "react-styled-flexboxgrid"
import styled from "styled-components"
import { Layout } from "../Typings"
import { Embed } from "./Embed"
import { ImageCollection } from "./ImageCollection"
import { Text } from "./Text"
import { Video } from "./Video"

interface Props {
  article: {
    layout: Layout
    authors?: any
    postscript?: string
    sections?: any
  }
  isMobile?: boolean
}

export class NewsSections extends Component<Props, null> {
  static defaultProps = {
    isMobile: false,
  }

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
      video: <Video section={section} />,
      embed: <Embed section={section} />,
      text: <Text html={section.body} layout={this.props.article.layout} />,
      default: false,
    }

    const sectionComponent = sections[section.type] || sections.default
    return sectionComponent
  }

  renderSections() {
    const { article } = this.props

    const renderedSections = article.sections.map((sectionItem, index) => {
      const child = this.getSection(sectionItem, index)

      if (child) {
        return <Row key={index}>{child}</Row>
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
