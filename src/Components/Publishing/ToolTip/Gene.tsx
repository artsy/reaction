import styled from "styled-components"
import React from "react"
import { garamond } from "Assets/Fonts"
import Markdown from "react-markdown"
import { Truncator } from "../Sections/Truncator"
import { FollowButton } from "./Components/FollowButton"
import { NewFeature, NewFeatureContainer } from "./Components/NewFeature"

export interface GeneProps {
  description?: string
  href?: string
  image?: {
    cropped: {
      url: string
    }
  }
  name?: string
}

export const GeneToolTip: React.SFC<GeneProps> = props => {
  const { description, href, image, name } = props
  const {
    cropped: { url },
  } = image

  return (
    <div>
      <GeneContainer href={href}>
        {url && <Image src={url} />}
        <Title>{name}</Title>

        {description && (
          <Description>
            <Truncator maxLineCount={3}>
              <Markdown source={description} containerTagName="span" />
            </Truncator>
          </Description>
        )}
      </GeneContainer>

      <ToolTipFooter>
        <FollowButton /> {/* TODO: Replace with relay follow */}
        <NewFeature />
      </ToolTipFooter>
    </div>
  )
}

export const GeneContainer = styled.a`
  position: relative;
  text-decoration: none;
  color: black;
`

const Title = styled.div`
  ${garamond("s18")};
  font-weight: 600;
`

const Description = styled.div`
  ${garamond("s15")};
`

const Image = styled.img`
  width: 100%;
  margin-bottom: 10px;
`

export const ToolTipFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${NewFeatureContainer} {
    display: flex;
    flex-direction: column;
  }
`
