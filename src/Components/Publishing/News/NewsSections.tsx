import React, { Component } from "react"
import { Col, Row } from "react-styled-flexboxgrid"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { NewsByline } from "../Byline/NewsByline"
import { ImageCollection } from "../Sections/ImageCollection"
import { SocialEmbed } from "../Sections/SocialEmbed"
import { Text } from "../Sections/Text"
import { ArticleData } from "../Typings"

interface Props {
  article: ArticleData
  isTruncated: boolean
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
      social_embed: <SocialEmbed section={section} />,
      text: <Text html={section.body} layout={this.props.article.layout} />,
      default: false,
    }

    const sectionComponent = sections[section.type] || sections.default
    return sectionComponent
  }

  renderSections() {
    const { article: { sections }, isTruncated } = this.props

    let limit
    if (isTruncated) {
      limit = sections[0].type === "image_collection" ? 2 : 1
    } else {
      limit = sections.length
    }

    const renderedSections = sections.slice(0, limit).map((section, index) => {
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
      return (
        <BylineContainer>
          <NewsByline article={this.props.article} />
        </BylineContainer>
      )
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
  if (type === "image_collection") {
    return ""
  } else {
    return "max-width: 660px;"
  }
}

export const NewsSectionContainer = styled(Row)`
  ${(props: ContainerProp) => getMaxWidth(props.type)};
  margin-bottom: 20px;

  ${pMedia.sm`
    margin: 0 20px 15px;
    padding: 0px;
  `};
`

const BylineContainer = styled(Row)`
  max-width: 780px;
  margin-top: 30px;
  ${pMedia.sm`
    margin: 30px 20px 0;
    padding: 0px;
  `};
`
