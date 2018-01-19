import { storiesOf } from "@storybook/react"
import React from "react"
import { VideoArticle } from "../Fixtures/Articles"
import { Media } from "../Fixtures/Components"
import { EditableChild } from "../Fixtures/Helpers"
import { VideoPlayer } from "../Video/Player/VideoPlayer"
import { VideoAbout } from "../Video/VideoAbout"
import { VideoCover } from "../Video/VideoCover"

storiesOf("Publishing/Video", module)
  .add("Video Player", () => {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <VideoPlayer {...Media[0]} />
      </div>
    )
  })
  .add("Video Cover", () => {
    return <VideoCover article={VideoArticle} media={Media[0]} />
  })
  .add("Video Cover in Series", () => {
    return (
      <VideoCover
        article={VideoArticle}
        media={Media[0]}
        seriesTitle="The Future of Art"
      />
    )
  })
  .add("Video Cover with edit props", () => {
    return (
      <VideoCover
        article={VideoArticle}
        media={Media[0]}
        seriesTitle="The Future of Art"
        editDescription={EditableChild("description")}
        editTitle={EditableChild("media.title")}
      />
    )
  })
  .add("Video About", () => {
    return <VideoAbout article={VideoArticle} />
  })
  .add("Video About with edit props", () => {
    return (
      <VideoAbout
        article={VideoArticle}
        editDescription={EditableChild("media.description")}
        editCredits={EditableChild("media.credits")}
      />
    )
  })
