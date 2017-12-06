import React, { Component } from "react"
import { Col, Grid, Row } from 'react-styled-flexboxgrid'
import styled from "styled-components"
import { getEditorialHref } from "../Constants"
import { Fonts } from "../Fonts"
import { Nav } from "../Nav/Nav"
import { ArticleCard, ArticleCardContainer } from "../Series/ArticleCard"
import { SeriesAbout } from "../Series/SeriesAbout"
import { VideoPlayer } from "../VideoPlayer/VideoPlayer"
import { VideoAbout } from "./VideoAbout"

interface Props {
  article?: any
  seriesArticle?: any
  relatedArticles?: any
}

export class VideoLayout extends Component<Props, null> {
  render() {
    const {
      article,
      seriesArticle,
      relatedArticles
    } = this.props
    const { media } = article

    return(
      <VideoLayoutContainer>
        <Nav
          transparent
          sponsor={article.sponsor}
        />
        <VideoPlayerContainer>
          <VideoPlayer
            url={media.url}
            title={media.title}
          />
        </VideoPlayerContainer>
        <Grid>
          <Col>
            <VideoAbout
              media={article.media}
            />
            {relatedArticles &&
              <Row>
                <RelatedArticlesTitle>
                  {"More in "}
                  {seriesArticle ?
                    <Link
                      href={getEditorialHref('series', seriesArticle.slug)}
                      color="white"
                    >
                      {seriesArticle.title}
                  </Link>
                    :
                    <span>{article.vertical.name}</span>
                  }
                </RelatedArticlesTitle>
              </Row>
            }
            {relatedArticles &&
              relatedArticles.map((relatedArticle) => {
                return (
                  <Row>
                    <ArticleCard
                      article={relatedArticle}
                      color="white"
                      series={seriesArticle}
                      // NOT SURE ABOUT NAMING ABOVE
                    />
                  </Row>
                )
              })
            }
            <Row>
              {seriesArticle &&
                <SeriesAbout
                  article={seriesArticle}
                  color="white"
                />
              }
            </Row>
          </Col>
        </Grid>
      </VideoLayoutContainer>
    )
  }
}

const VideoLayoutContainer = styled.div`
  background: black;
  color: white;
  margin: auto;
  ${Nav} {
    position: absolute;
    top: 0;
  }
  ${ArticleCardContainer} {
    margin-bottom: 60px;
  }
`
const VideoPlayerContainer = styled.div`
  width: 100%;
  height: 100vh;
`
const RelatedArticlesTitle = styled.div`
  ${Fonts.unica("s32")}
  margin-bottom: 40px;
`
const Link = styled.a`
  text-decoration: none;
  color: white;
`
