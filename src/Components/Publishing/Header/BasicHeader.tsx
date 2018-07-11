import { Sans } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import React from "react"
import { Col, Grid, Row } from "react-styled-flexboxgrid"
import track from "react-tracking"
import styled from "styled-components"
import { ResponsiveDeprecated } from "../../../Utils/ResponsiveDeprecated"
import { pMedia } from "../../Helpers"
import { Byline, BylineContainer } from "../Byline/Byline"
import { ShareContainer as ShareContainerStyles } from "../Byline/Share"
import { VerticalOrSeriesTitle } from "../Sections/VerticalOrSeriesTitle"

import {
  CoverImage,
  IFrame,
  isValidVideoUrl,
  Video,
  VIDEO_RATIO,
} from "../Sections/Video"

interface Props {
  article: any
  isMobile?: any
  date?: string
  deck?: any
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
  @track(() => ({
    action: "Click",
    label: "Track Basic feature video click ",
    impression_type: "sa_basic_feature_video",
    destination_path: "NEED PATH", // props.article.super_article.partner_logo_link,
    context_type: "article_fixed",
  }))
  trackVideoPlay() {
    // noop
  }

  render() {
    const {
      article,
      date,
      isMobile: passedIsMobile,
      title,
      vertical,
      deck,
    } = this.props
    const { hero_section, published_at } = article
    const { url } = hero_section
    const hasVideo = url && isValidVideoUrl(url)

    return (
      // FIXME: Replace with latest version of Responsive
      <ResponsiveDeprecated initialState={{ isMobile: passedIsMobile }}>
        {({ isMobile }) => (
          <Container hasVideo={hasVideo} data-type="basic">
            <Grid fluid>
              {hasVideo && (
                <Row onClick={this.trackVideoPlay}>
                  <Col xs sm md lg className="BasicHeader__video">
                    <Video section={hero_section} layout="feature" />
                  </Col>
                </Row>
              )}
              <Row>
                <Col xs sm md lg>
                  <VerticalOrSeriesTitle
                    article={article}
                    vertical={vertical}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs sm md lg>
                  <Title>{title}</Title>
                </Col>
              </Row>
              <Description>
                <Row around="xs" center="xs">
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Row>
                      <Col xs sm md lg>
                        <Deck size="3t" weight="medium">
                          {deck}
                        </Deck>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Byline article={article} date={date || published_at} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Description>
            </Grid>
          </Container>
        )}
      </ResponsiveDeprecated>
    )
  }
}

const Description = styled.div`
  max-width: 680px;
  margin: auto;
`

const Container = styled.div.attrs<{ hasVideo: boolean }>({})`
  text-align: center;
  margin-top: 70px;

  ${p =>
    p.hasVideo &&
    `
    margin-top: -40px;
  `}

  ${CoverImage}, ${IFrame} {
    width: 100%;

    @media screen and (min-width: 1250px) {
      height: ${1100 * VIDEO_RATIO}px;
    }
    ${pMedia.xl`
      height: ${1100 * VIDEO_RATIO}px;
    `}
    ${pMedia.lg`
      height: ${950 * VIDEO_RATIO}px;
    `}
    ${pMedia.md`
      height: ${800 * VIDEO_RATIO}px;
    `}
    ${pMedia.sm`
      height: ${620 * VIDEO_RATIO}px;
    `}
    ${pMedia.xs`
      height: ${340 * VIDEO_RATIO}px;
      margin-top: 25px;
      margin-bottom: -25px;
    `}
  }

  ${BylineContainer} {
    justify-content: center;

    div {
      padding-right: 30px;
    }

    ${pMedia.xs`
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

  ${ShareContainerStyles} {
    ${pMedia.xs`
      margin-top: 0;
    `}
  }
`

const Title = styled.div`
  line-height: 1.1em;
  letter-spacing: -0.035em;
  max-width: 1250px;
  margin: 0 auto 27px auto;
  ${unica("s80", "regular")}

  ${pMedia.md`
    font-size: 60px;
  `}
  ${pMedia.xs`
    font-size: 40px;
    margin-bottom: 15px;
  `}
`

const Deck = Sans.extend`
  margin-bottom: 10px;
`
