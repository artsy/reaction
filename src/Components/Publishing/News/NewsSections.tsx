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
      return (
        <BylineContainer>
          <NewsByline article={this.props.article} />
        </BylineContainer>
      )
    }
  }

  render() {
    return (
      <NewsArticleContainer>
        {this.renderSections()}
        {this.renderByline()}
      </NewsArticleContainer>
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

const NewsSectionContainer = styled(Row)`
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

const NewsArticleContainer = styled(Col)`
  margin-bottom: 80px;
`
