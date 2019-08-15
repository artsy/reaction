import { Box, Flex, Sans, Serif } from "@artsy/palette"
import { Byline, BylineContainer } from "Components/Publishing/Byline/Byline"
import { Text } from "Components/Publishing/Sections/Text"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"
import { VanguardVideoBackground } from "./VideoBackground"

export const VanguardIntroduction: React.SFC<{
  article: ArticleData
}> = props => {
  const { description } = props.article.series

  return (
    <IntroContainer>
      <Box minHeight="calc(100vh - 50px)" mb={150} pt={50}>
        <VanguardVideoBackground {...props} />
        <HeaderText pt={70} size="8" textAlign="center">
          The Artsy
        </HeaderText>
      </Box>

      <Box mx="auto" maxWidth={980} px={4}>
        <Flex flexDirection="column" alignItems="center" pb={50}>
          <Title size="12" element="h1" textAlign="center" pb={1}>
            The Artists To Know Right Now
          </Title>
          <Byline {...props} />

          <Box textAlign="center" pt={50}>
            <Sans size="3t" weight="medium">
              Video Headers by Alex John Beck
            </Sans>
            <Sans size="3t" weight="medium">
              Video Editing by Nate DeYoung
            </Sans>
            <Sans size="3t" weight="medium">
              Interaction Design by Wax Studios
            </Sans>
          </Box>
        </Flex>

        <Box pb={12}>
          <Text layout="standard" html={description} width="800px" />
        </Box>
      </Box>
    </IntroContainer>
  )
}

const HeaderText = styled(Sans)`
  font-size: 100px;
`

const IntroContainer = styled(Box)`
  ${BylineContainer} {
    div::before {
      display: none;
    }
  }
`

const Title = styled(Serif)`
  text-transform: uppercase;
  font-size: 90px;
  line-height: 1em;
`
