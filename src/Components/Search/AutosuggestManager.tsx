import { Box } from "@artsy/palette"
import { SearchBarState } from "Components/Search/state"
import React from "react"
import styled from "styled-components"
import { Subscribe } from "unstated"
import { get } from "Utils/get"

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

export const shouldNavigateToPreview = searchState => {
  const { state } = searchState
  const previewItem = state.previewItems[state.selectedPreviewIndex]
  const href = get(previewItem, item => item.href)
  return state.hasEnteredPreviews && href
}

export const handlePreviewSelection = searchState => {
  const { state } = searchState
  if (shouldNavigateToPreview(searchState)) {
    window.location.assign(state.previewItems[state.selectedPreviewIndex].href)
    return
  }
}

const handleKeyboardNavigation = (
  keyCode: number,
  searchState: SearchBarState
) => {
  const { state } = searchState
  if (keyCode === keyCodes.RIGHT) {
    if (state.hasEnteredPreviews) {
      searchState.incrementSelectedPreviewIndex()
    } else {
      searchState.enterPreview()
    }
  } else if (keyCode === keyCodes.LEFT && state.hasEnteredPreviews) {
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
    <Subscribe to={[SearchBarState]}>
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
    </Subscribe>
  )
})
