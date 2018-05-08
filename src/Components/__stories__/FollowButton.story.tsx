import { storiesOf } from "@storybook/react"
import React from "react"
import { FollowArtistButton } from "../FollowButton/FollowArtistButton"

storiesOf("Components/Follow Button", module).add("Artist", () => {
  return (
    <div>
      <FollowArtistButton
        artist={{
          id: "damon-zucconi",
          __id: "1234",
          is_followed: false,
        }}
      />
    </div>
  )
})
