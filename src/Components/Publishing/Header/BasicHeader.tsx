import React from "react"
import { Col, Grid, Row } from 'react-styled-flexboxgrid'
import styled, { css } from 'styled-components'
import { Responsive } from '../../../Utils/Responsive'
import { track } from "../../../Utils/track"
import { pMedia as breakpoint } from "../../Helpers"
import { Share } from "../Byline/Share"
import { articleHref, getAuthorByline, getDate } from "../Constants"
import { Fonts } from "../Fonts"

import {
  CoverImage,
  IFrame,
  isValidVideoUrl,
  Video,
  VIDEO_RATIO,
} from '../Sections/Video'

interface Props {
  article: any
  isMobile?: any
  leadParagraph?: any
  layout?: any
  title: any
  vertical?: any
}

interface State {
  isPlaying: boolean
}

export class BasicHeader extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.trackVideoPlay = this.trackVideoPlay.bind(this)
  }

  // TODO: Waiting for final values
  @track(props => ({
    action: "Click",
    label: "Track Basic feature video click ",
    impression_type: "sa_basic_feature_video",
    destination_path: "NEED PATH", // props.article.super_article.partner_logo_link,
    context_type: "article_fixed"
  }))
  trackVideoPlay() {
    // noop
  }

  render() {
    const {
      article: {
        contributing_authors,
        // authors, TODO: update when time
        hero_section,
        lead_paragraph,
        published_at,
        slug,
      },
      isMobile: passedIsMobile,
      title,
      vertical
    } = this.props

    const { url } = hero_section
    const hasVideo = url && isValidVideoUrl(url)

    return (
      <Responsive initialState={{ isMobile: passedIsMobile }}>
        {({ isMobile }) => (
          <Container>
            <Grid fluid>
              {hasVideo &&
                <Row onClick={this.trackVideoPlay}>
                  <Col xs sm md lg className='BasicHeader__video'>
                    <Video
                      section={hero_section}
                      layout="feature"
                    />
                  </Col>
                </Row>
              }
              <Row>
                <Col xs sm md lg>
                  <Vertical>
                    {vertical}
                  </Vertical>
                </Col>
              </Row>
              <Row>
                <Col xs sm md lg>
                  <Title>
                    {title}
                  </Title>
                </Col>
              </Row>
              <Description>
                <Row around='xs' center='xs'>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Row>
                      <Col xs sm md lg>
                        <LeadParagraph dangerouslySetInnerHTML={{
                          __html: lead_paragraph
                        }} />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className='Byline__Container'>
                        <Author>
                          By {getAuthorByline(contributing_authors)}
                        </Author>
                        <Date>
                          {getDate(published_at, isMobile ? 'condensed' : 'basic')}
                        </Date>
                        <Share
                          title={title}
                          url={articleHref(slug)}
                          className='share'
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Description>
            </Grid>
          </Container>
        )}
      </Responsive>
    )
  }
}

const Description = styled.div`
  max-width: 680px;
  margin: auto;
`

const defaults = css`
  ${Fonts.unica("s16", "medium")}
  line-height: 1.1em;
  margin-bottom: 10px;
`

const Container = styled.div`
  text-align: center;

  ${CoverImage}, ${IFrame} {
    width: 100%;

    @media screen and (min-width: 1250px) {
      height: ${1100 * VIDEO_RATIO};
    }

    ${breakpoint.xl`
      height: ${1100 * VIDEO_RATIO}px;
    `}

    ${breakpoint.lg`
      height: ${950 * VIDEO_RATIO}px;
    `}

    ${breakpoint.md`
      height: ${800 * VIDEO_RATIO}px;
    `}

    ${breakpoint.sm`
      height: ${620 * VIDEO_RATIO}px;
    `}

    ${breakpoint.xs`
      height: ${520 * VIDEO_RATIO}px;
    `}
  }

  .BasicHeader__video {
    margin-top: 40px;
  }

  .Byline__Container {
    display: inherit;
    justify-content: center;

    div {
      padding-right: 30px;
    }

    ${breakpoint.xs`
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;

      div:last-child {
        padding-right: 0;
        margin-bottom: 10px;
      }
    `}
  }
`

const Vertical = styled.div`
  ${defaults}

  ${breakpoint.xs`
    ${Fonts.unica("s14", "medium")}
  `}
`

const Title = styled.div`
  ${Fonts.unica("s80", "regular")}
  line-height: 1.1em;
  letter-spacing: -0.035em;
  margin-bottom: 27px;

  ${breakpoint.md`
    font-size: 60px;
  `}

  ${breakpoint.xs`
    font-size: 40px;
    margin-bottom: 15px;
  `}
`

const LeadParagraph = styled.div`
  ${defaults}

  ${breakpoint.xs`
    ${Fonts.unica("s14", "medium")}
  `}
`

const Author = styled.div`
  ${defaults}

   &:before {
    content: "";
    display: inline-block;
    min-width: 10px;
    min-height: 10px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: black;
  }

  ${breakpoint.xs`
    ${Fonts.unica("s14", "medium")}
  `}
`

const Date = styled.div`
  ${defaults}
  white-space: nowrap;

  ${breakpoint.xs`
    ${Fonts.unica("s14", "medium")}
  `}
`
