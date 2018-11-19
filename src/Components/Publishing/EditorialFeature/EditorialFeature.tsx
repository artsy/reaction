import {
  ArticleProps,
  FeatureLayout,
} from "Components/Publishing/Layouts/FeatureLayout"
import React from "react"
import { Eoy2018Artists } from "./Components/Eoy2018Artists"
import { Eoy2018Culture } from "./Components/Eoy2018Culture"

export const EditorialFeature: React.SFC<ArticleProps> = props => {
  switch (props.customEditorial) {
    case "EOY_2018_1": {
      return <Eoy2018Artists {...props} />
    }
    case "EOY_2018_2": {
      return <Eoy2018Culture {...props} />
    }
    default: {
      return <FeatureLayout {...props} />
    }
  }
}
