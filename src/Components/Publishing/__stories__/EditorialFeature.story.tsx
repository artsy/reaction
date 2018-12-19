import { storiesOf } from "@storybook/react"
import { Eoy2018Artists } from "Components/Publishing/EditorialFeature/Fixtures/Eoy2018Artists"
import { Eoy2018Culture } from "Components/Publishing/EditorialFeature/Fixtures/Eoy2018Culture"

import React from "react"
import { Article } from "../Article"
import { ArticleData } from "../Typings"

storiesOf("Publishing/Articles/EditorialFeatures", module)
  .add("2018 Influential Artists", () => {
    return (
      <Article
        article={Eoy2018Artists as ArticleData}
        customEditorial="EOY_2018_ARTISTS"
      />
    )
  })
  .add("2018 Year in Culture", () => {
    return (
      <Article
        article={Eoy2018Culture as ArticleData}
        customEditorial="EOY_2018_CULTURE"
      />
    )
  })
