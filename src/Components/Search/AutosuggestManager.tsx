import { Box } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { get } from "Utils/get"
import { SearchBarConsumer, SearchBarState } from "./SearchBarContext"

const keyCodes = {
  RIGHT: 39,
  DOWN: 40,
  LEFT: 37,
  UP: 38,
  ENTER: 13,
}

const AutosuggestContainer = styled(Box)`
  div[role="combobox"] {
    div[role="listbox"] {
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
    }
  }
`

export const shouldNavigateToPreview = (state: SearchBarState) => {
  const previewItem = state.previewItems[state.selectedPreviewIndex]
  const href = get(previewItem, item => item.href)
  return state.hasEnteredPreviews && href
}

export const handlePreviewSelection = (state: SearchBarState) => {
  if (shouldNavigateToPreview(state)) {
    window.location.assign(state.previewItems[state.selectedPreviewIndex].href)
    return
  }
}

const handleKeyboardNavigation = (
  keyCode: number,
  searchState: SearchBarState
) => {
  if (keyCode === keyCodes.RIGHT) {
    if (searchState.hasEnteredPreviews) {
      searchState.incrementSelectedPreviewIndex()
    } else {
      searchState.enterPreview()
    }
  } else if (keyCode === keyCodes.LEFT && searchState.hasEnteredPreviews) {
    searchState.decrementOrLeavePreview()
  } else if (keyCode === keyCodes.UP || keyCode === keyCodes.DOWN) {
    searchState.reset()
  } else if (keyCode === keyCodes.ENTER) {
    handlePreviewSelection(searchState)
  }
}

export const AutosuggestManager: React.ExoticComponent<
  React.HTMLProps<HTMLDivElement>
> = React.forwardRef(({ children }, ref: React.RefObject<any>) => {
  return (
    <SearchBarConsumer>
      {(searchState: SearchBarState) => {
        return (
          <AutosuggestContainer
            ref={ref}
            onKeyDown={e => {
              handleKeyboardNavigation(e.keyCode, searchState)
            }}
          >
            {children}
          </AutosuggestContainer>
        )
      }}
    </SearchBarConsumer>
  )
})
