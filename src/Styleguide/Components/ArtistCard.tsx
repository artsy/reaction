import React from "react"
import styled from "styled-components"
import { Flex } from "../Elements/Flex"
import { Avatar, Button } from "../Elements"
import { Serif, Sans } from "@artsy/palette"
import { themeGet } from "styled-system"
import { Responsive } from "../Utils/Responsive"

const Container = styled(Flex)`
  border: 1px solid ${themeGet("colors.black10")};
  border-radius: 2px;

  &:hover {
    border-color: ${themeGet("colors.black60")};
  }
`

interface ArtistCardProps {
  src: string
  headline: string
  subHeadline: string
}

export class ArtistCard extends React.Component<ArtistCardProps> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <SmallArtistCard {...this.props} />
          else return <LargeArtistCard {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargeArtistCard = props => (
  <Container flexDirection="column" height="254px" p={4}>
    <Flex flexDirection="column" flexGrow="1" alignItems="center">
      <Avatar src={props.src} mb={3} />
      <Serif size="3t">{props.headline}</Serif>
      <Sans size="1">{props.subHeadline}</Sans>
    </Flex>
    <Flex flexDirection="column" alignItems="center">
      <Button size="small" variant="secondaryOutline" width="90px">
        Follow
      </Button>
    </Flex>
  </Container>
)

export const SmallArtistCard = props => (
  <Container p={4}>
    <Flex flexDirection="column" justifyContent="center">
      <Sans weight="medium" size="2">
        {props.badge}
      </Sans>
      <Serif size="3t">{props.headline}</Serif>
      <Sans size="1">{props.subHeadline}</Sans>
      <Button size="small" variant="secondaryOutline" width="70px" mt={3}>
        Follow
      </Button>
    </Flex>
    <Avatar size="small" src={props.src} ml={4} />
  </Container>
)
