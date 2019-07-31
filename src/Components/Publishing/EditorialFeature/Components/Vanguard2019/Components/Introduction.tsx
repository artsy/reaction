import { Box, Flex, Sans, Serif } from "@artsy/palette"
import { Byline } from "Components/Publishing/Byline/Byline"
import { Text } from "Components/Publishing/Sections/Text"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"

export const VanguardIntroduction: React.SFC<{
  article: ArticleData
}> = props => {
  const { description } = props.article.series
  return (
    <Box pb={4} pt={70}>
      <Flex
        justifyContent="space-between"
        flexDirection="column"
        alignItems="center"
        height="90vh"
      >
        <HeaderText size="8">The Artsy</HeaderText>
        <Box pb={4}>
          <Serif size="8">The Artists To Know Right Now</Serif>
          <Byline article={props.article} />
        </Box>
      </Flex>
      <Box pb={4} mx="auto" maxWidth={800}>
        <Text layout="standard" html={description} />
      </Box>
    </Box>
  )
}

const HeaderText = styled(Sans)`
  font-size: 100px;
`
