import { Box, Serif } from "@artsy/palette"
import { Byline } from "Components/Publishing/Byline/Byline"
import { Text } from "Components/Publishing/Sections/Text"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"

export const VanguardIntroduction: React.SFC<{
  article: ArticleData
}> = props => {
  const { description } = props.article.series
  return (
    <Box>
      <Serif size="8">The Artists To Know Right Now</Serif>
      <Byline article={props.article} />
      <Text layout="standard" html={description} />
    </Box>
  )
}
