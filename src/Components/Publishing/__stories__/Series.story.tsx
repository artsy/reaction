import { storiesOf } from "@storybook/react"
import React from "react"
import { SeriesAbout } from "../Series/SeriesAbout"
import { SeriesTitle } from "../Series/SeriesTitle"

import {
  SeriesArticle,
  SeriesArticleSponsored,
  SeriesArticleCustomSubTitle,
} from "../Fixtures/Articles"
import { EditableChild } from "../Fixtures/Helpers"

storiesOf("Publishing/Series", module)
  .add("Series Title", () => {
    return (
      <div>
        <SeriesTitle article={SeriesArticle} />
      </div>
    )
  })
  .add("Series Title: Sponsored", () => {
    return (
      <div>
        <SeriesTitle article={SeriesArticleSponsored} />
      </div>
    )
  })
  .add("Series Title with Children", () => {
    return (
      <div>
        <SeriesTitle
          article={SeriesArticle}
          editTitle={EditableChild("title")}
        />
      </div>
    )
  })
  .add("Series About", () => {
    return (
      <div>
        <SeriesAbout article={SeriesArticle} />
      </div>
    )
  })
  .add("Series About: Sponsored", () => {
    return (
      <div>
        <SeriesAbout article={SeriesArticleSponsored} />
      </div>
    )
  })
  .add("Series About with editable children", () => {
    return (
      <div>
        <SeriesAbout
          article={SeriesArticle}
          editDescription={EditableChild("description")}
          editSubTitle={EditableChild("sub_title")}
        />
      </div>
    )
  })
  .add("Series About with custom sub_title", () => {
    return (
      <div>
        <SeriesAbout article={SeriesArticleCustomSubTitle} />
      </div>
    )
  })
