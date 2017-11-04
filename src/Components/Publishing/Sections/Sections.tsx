import { clone, once } from 'lodash'
import React from "react"
import ReactDOM from 'react-dom/server'
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../Helpers"
import { Layout } from "../Typings"
import { Authors } from "./Authors"
import { Embed } from "./Embed"
import { ImageCollection } from "./ImageCollection"
import { ImageSetPreview } from "./ImageSetPreview"
import { SectionContainer } from "./SectionContainer"
import { Text } from "./Text"
import { Video } from "./Video"

interface SectionsProps {
  DisplayPanel?: any
  article: {
    layout: Layout
    authors?: any
    postscript?: string
    sections?: any
  }
  isMobile?: boolean
}

interface StyledSectionsProps {
  layout: string
}

/**
 * When isMobile, hide sidebar and inject DisplayAd into the body of the
 * article at a specific paragraph index.
 */
const MOBILE_DISPLAY_PANEL_INJECT_INDEX = 2

export class Sections extends React.Component<SectionsProps, any> {

  injectDisplayPanelIntoText = once((body) => {
    const displayPanelMarkup = ReactDOM.renderToString(<this.props.DisplayPanel />)

    // Inject DisplayAd after a specific paragraph index
    const tag = '</p>'
    const updatedBody = body
      .split(tag)
      .map(p => p + tag)
      .reduce((arr, block, paragraphIndex) => {
        if (paragraphIndex === MOBILE_DISPLAY_PANEL_INJECT_INDEX) {
          return arr.concat([block, displayPanelMarkup])
        } else {
          return arr.concat([block])
        }
      }, [])
      .join('')

    return updatedBody
  })

  getSection(section, layout) {
    const sections = {
      image_collection: (
        <ImageCollection
          sectionLayout={section.layout}
          images={section.images}
          targetHeight={500}
          gutter={10}
        />
      ),
      image_set: (
        <ImageSetPreview
          section={section}
        />
      ),
      video: (
        <Video
          section={section}
        />
      ),
      embed: (
        <Embed
          section={section}
        />
      ),
      text: (
        <Text
          html={section.body}
          layout={layout}
        />
      ),
      default: false,
    }

    const sectionComponent = sections[section.type] || sections.default
    return sectionComponent
  }

  renderSections() {
    const { article, isMobile } = this.props
    let displayAdInjected = false

    const renderedSections = article.sections.map((sectionItem, index) => {
      const shouldInject = !displayAdInjected && isMobile && sectionItem.type === 'text'
      let section = sectionItem

      if (shouldInject) {
        try {
          displayAdInjected = true
          section = clone(sectionItem)
          section.body = this.injectDisplayPanelIntoText(section.body)
        // tslint:disable-next-line:no-empty
        } catch (e) {}
      }

      const child = this.getSection(section, article.layout)

      if (child) {
        return (
          <SectionContainer
            key={index}
            layout={section.layout}
            articleLayout={article.layout}
          >
            {child}
          </SectionContainer>
        )
      }
    })

    return renderedSections
  }

  renderAuthors() {
    const {
      article: {
        authors
      }
    } = this.props

    if (authors) {
      return (
        <SectionContainer>
          <Authors authors={authors} />
        </SectionContainer>
      )
    }
  }

  renderPostScript() {
    const { article } = this.props
    const { layout, postscript } = article

    if (postscript) {
      return (
        <SectionContainer>
          <Text
            html={postscript}
            layout={layout}
            postscript={Boolean(postscript)}
          />
        </SectionContainer>
      )
    }
  }

  render() {
    const { article } = this.props

    return (
      <StyledSections layout={article.layout}>
        {this.renderSections()}
        {this.renderAuthors()}
        {this.renderPostScript()}
      </StyledSections>
    )
  }
}

const chooseMargin = layout => {
  if (layout === "standard") {
    return "0;"
  } else if (layout === "feature") {
    return "80px auto 0 auto;"
  }
}

const Div: StyledFunction<StyledSectionsProps> = styled.div

const StyledSections = Div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: ${props => chooseMargin(props.layout)}
  max-width: ${props => (props.layout === "standard" ? "780px" : "auto")};

  ${props => pMedia.xl`
    max-width: ${props.layout === "standard" ? "680px" : "auto"};
    ${props.layout === 'feature' ? "margin: 80px auto 0 auto" : ""}
  `}

  ${props => pMedia.md`
    max-width: ${props.layout === "standard" ? "780px" : "auto"};
  `}
  ${props => pMedia.xs`
    max-width: ${props.layout === "standard" ? "780px" : "auto"};
    ${props.layout === 'feature' ? "margin: 40px auto 0 auto" : ""}
  `}
`
