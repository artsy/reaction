import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { AuctionRegistrationModal } from "../AuctionRegistrationModal"

const submitHandler = p => {
  setTimeout(() => {
    p.setSubmitting(false)
    alert("Your Submission Callback Here")
  }, 1000)
}
storiesOf("Components/Auction/AuctionRegistrationModal", module).add(
  "Default",
  () => {
    return (
      <>
        <AuctionRegistrationModal
          onSubmit={submitHandler}
          onClose={() => null}
          auction={{ name: "Big Time Sale" }}
        />
      </>
    )
  }
)
