import { Box, color, Flex, Sans } from "@artsy/palette"
import { StyledText } from "Components/Publishing/Sections/StyledText"
import { Text } from "Components/Publishing/Sections/Text"
import React, { Component } from "react"
import styled from "styled-components"
import { Media } from "Utils/Responsive"
import { ShareDate } from "../Byline/ShareDate"

export interface VideoAboutProps {
  article: any
  color?: string
  editDescription?: any
  editCredits?: any
}

export class VideoAbout extends Component<VideoAboutProps, null> {
  static defaultProps = {
    color: color("black100"),
  }

  render() {
    const { article, editCredits, editDescription } = this.props
    const {
      media: { credits, description },
    } = article

    return (
      <VideoAboutContainer
        maxWidth={1200}
        mx="auto"
        flexDirection={["column-reverse", "column-reverse", "row", "row"]}
      >
        <Credits
          width={[1, 1, 1 / 3, 1 / 3]}
          flexDirection="column"
          pt={["80px", "80px", 0, 0]}
        >
          <Sans size="8" color={this.props.color} pb={10}>
            Credits
          </Sans>

          {editCredits ? (
            <Text layout="standard">{editCredits}</Text>
          ) : (
            <Text layout="standard" html={credits} />
          )}

          <Media greaterThanOrEqual="md">
            <Box mt={40}>
              <ShareDate color={this.props.color} article={article} />
            </Box>
          </Media>
        </Credits>

        <Box width={[1, 1, 2 / 3, 2 / 3]}>
          <Sans size="8" color={this.props.color} pb={10}>
            About the Film
          </Sans>

          {editDescription ? (
            <Text color={this.props.color} layout="standard">
              {editDescription}
            </Text>
          ) : (
            <Text
              color={this.props.color}
              layout="standard"
              html={description}
            />
          )}

          <Media lessThan="md">
            <Box mt={40}>
              <ShareDate color={this.props.color} article={article} />
            </Box>
          </Media>
        </Box>
      </VideoAboutContainer>
    )
  }
}

export const Credits = styled(Flex)`
  ${StyledText} {
    p {
      padding: 0;
    }
  }
`

export const VideoAboutContainer = styled(Flex)``
