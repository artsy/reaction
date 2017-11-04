import { clone, compact } from 'lodash'
import React from "react"
import ReactDOM from 'react-dom'
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
const MOBILE_DISPLAY_INJECT_INDEX = 1
const MOBILE_DISPLAY_INJECT_ID = '__mobile_display_inject__'

export class Sections extends React.Component<SectionsProps, any> {

  state = {
    shouldInjectMobileDisplay: false
  }

  componentWillMount() {
    this.setState({
      shouldInjectMobileDisplay: this.props.isMobile
    })
  }

  componentDidMount() {
    if (this.state.shouldInjectMobileDisplay) {
      this.mountDisplayToMarker()
    }
  }

  /**
   * Inject DisplayAd after a specific paragraph index
   */
  injectDisplayPanelMarker(body) {
    const tag = '</p>'
    const updatedBody = compact(body.split(tag))
      .map(p => p + tag)
      .reduce((arr, block, paragraphIndex) => {
        if (paragraphIndex === MOBILE_DISPLAY_INJECT_INDEX) {
          return arr.concat([block, `<div id="${MOBILE_DISPLAY_INJECT_ID}"></div>`])
        } else {
          return arr.concat([block])
        }
      }, [])
      .join('')

    return updatedBody
  }

  mountDisplayToMarker() {
    const displayMountPoint = document.getElementById(`#${MOBILE_DISPLAY_INJECT_ID}`)

    if (displayMountPoint) {
      ReactDOM.render(<this.props.DisplayPanel />, displayMountPoint)
    } else {
      console.error(
        '(reaction/Sections.tsx) Error mounting Display: DOM node ',
        'not found', displayMountPoint
      )
    }
  }

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
    const { article } = this.props
    let displayMarkerInjected = false

    const renderedSections = article.sections.map((sectionItem, index) => {
      const shouldInject = !displayMarkerInjected && this.state.shouldInjectMobileDisplay
      let section = sectionItem

      if (shouldInject) {
        try {
          section = clone(sectionItem)
          section.body = this.injectDisplayPanelMarker(section.body)
          displayMarkerInjected = true
        } catch (error) {
          console.error('(reaction/Sections.jsx) Error injecting Display:', error)
        }
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
`
