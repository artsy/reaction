import { Link, TextArea, TextAreaChange } from "@artsy/palette"
import { ContextProvider } from "Artsy"
import React from "react"

export const OfferNote: React.SFC<{
  onChange(change: TextAreaChange): void
  artworkId: string
}> = ({ onChange, artworkId }) => (
  <ContextProvider>
    {({ mediator }) => (
      <TextArea
        title="Note (optional)"
        characterLimit={200}
        description={
          <>
            Use this note to add any additional context about your
            offer/counteroffer. Please do not share personal information in this
            field. For any questions about the work,{" "}
            <Link
              onClick={() =>
                mediator.trigger("openOrdersContactArtsyModal", {
                  artworkId: this.props.artworkId,
                })
              }
            >
              ask our specialists
            </Link>.
          </>
        }
        placeholder="Add a note"
        onChange={onChange}
      />
    )}
  </ContextProvider>
)
