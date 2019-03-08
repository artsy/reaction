import React, { useContext, useState } from "react"

interface PreviewItem {
  href: string
}
export interface SearchBarState {
  previewItems: PreviewItem[]
  hasEnteredPreviews: boolean
  selectedPreviewIndex: number | null
  registerPreviewItems: (items: PreviewItem[]) => void
  enterPreview: () => void
  enterPreviewWithoutSelection: () => void
  incrementSelectedPreviewIndex: () => void
  leavePreviewIfNoSelection: () => void
  decrementOrLeavePreview: () => void
  clearPreviewItems: () => void
  reset: () => void
}

export const SearchBarContext = React.createContext<SearchBarState>(
  {} as SearchBarState
)

export const SearchBarProvider: React.SFC<any> = ({ children }) => {
  const [previewItems, setPreviewItems] = useState<PreviewItem[]>([])
  const [hasEnteredPreviews, setHasEnteredPreviews] = useState<boolean>(false)
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState<
    number | null
  >(null)

  const incrementSelectedPreviewIndex = () => {
    let newPreviewIndex = selectedPreviewIndex + 1
    if (selectedPreviewIndex === previewItems.length - 1) {
      newPreviewIndex = 0
    }
    setSelectedPreviewIndex(newPreviewIndex)
  }

  const reset = () => {
    setHasEnteredPreviews(false)
    setSelectedPreviewIndex(null)
    registerPreviewItems([] as PreviewItem[])
  }

  const enterPreview = () => {
    setHasEnteredPreviews(true)
    setSelectedPreviewIndex(0)
  }

  const enterPreviewWithoutSelection = () => {
    setHasEnteredPreviews(true)
    setSelectedPreviewIndex(null)
  }

  const leavePreviewIfNoSelection = () => {
    if (selectedPreviewIndex != null) return
    setHasEnteredPreviews(false)
  }

  const decrementOrLeavePreview = () => {
    let newIndex = selectedPreviewIndex - 1
    setHasEnteredPreviews(newIndex >= 0)

    newIndex = hasEnteredPreviews ? newIndex : null
    setSelectedPreviewIndex(newIndex)
  }

  const registerPreviewItems = (items: PreviewItem[]) => {
    setPreviewItems(items)
  }

  const clearPreviewItems = () => {
    setPreviewItems([])
  }

  const value = {
    previewItems,
    registerPreviewItems,
    hasEnteredPreviews,
    selectedPreviewIndex,
    incrementSelectedPreviewIndex,
    reset,
    enterPreview,
    enterPreviewWithoutSelection,
    leavePreviewIfNoSelection,
    decrementOrLeavePreview,
    clearPreviewItems,
  }

  return (
    <SearchBarContext.Provider value={value}>
      {children}
    </SearchBarContext.Provider>
  )
}

export const SearchBarConsumer: React.FC<{
  children: (searchBarState: SearchBarState) => JSX.Element
}> = ({ children }) => {
  const searchBarState = useContext(SearchBarContext)

  const rendered = children(searchBarState)

  return rendered
}
