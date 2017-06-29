import { times } from "lodash"
import PropTypes from "prop-types"
import * as React from "react"

interface Props extends React.HTMLProps<MasonryGrid> {
  columnCount?: number
  columnMargin?: number
  getDisplayComponent: (artwork: object) => any
  getAspectRatio: (artwork: object) => number
  items: Array<object>
  rowMargin?: number
}

export default class MasonryGrid extends React.Component<Props, void> {
  static propTypes = {
    columnCount: PropTypes.number,
    columnMargin: PropTypes.number,
    getDisplayComponent: PropTypes.func.isRequired,
    getAspectRatio: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    rowMargin: PropTypes.number,
  }

  static defaultProps = {
    columnCount: 3,
    columnMargin: 20,
    rowMargin: 20,
  }

  createGrid() {
    const { items, columnCount, getAspectRatio } = this.props
    const grid = []
    const gridRatioSums = []

    times(columnCount, () => {
      grid.push([])
      gridRatioSums.push(0)
    })

    items.forEach(artwork => {
      // Find section with lowest *inverted* aspect ratio sum, which is the
      // shortest column.
      let lowestRatioSum = Number.MAX_VALUE
      let sectionIndex = null

      gridRatioSums.forEach((ratioSum, ratioIndex) => {
        if (ratioSum < lowestRatioSum) {
          sectionIndex = ratioIndex
          lowestRatioSum = ratioSum
        }
      })

      if (sectionIndex != null) {
        const section = grid[sectionIndex]
        section.push(artwork)

        // Keep track of total section aspect ratio
        const aspectRatio = getAspectRatio(artwork) || 1 // Ensure we never divide by null/0

        // Invert the aspect ratio so that a lower value means a shorter section.
        gridRatioSums[sectionIndex] += 1 / aspectRatio
      }
    })

    return grid
  }

  renderItems() {
    const { columnCount, columnMargin, getDisplayComponent, rowMargin } = this.props

    const grid = this.createGrid()
    const sections = []

    times(columnCount, columnIndex => {
      const displayComponents = []
      const rows = grid[columnIndex]

      rows.forEach((row, rowIndex) => {
        const artwork = grid[columnIndex][rowIndex]

        displayComponents.push(
          <div key={`column-${columnIndex}-row-${rowIndex}`}>
            {getDisplayComponent(artwork)}
          </div>
        )

        // Setting a marginBottom on the artwork component didn’t work, so using
        // a spacer view instead.
        const addSpacer = rowIndex < rows.length - 1

        if (addSpacer) {
          displayComponents.push(
            <div
              className="grid-item"
              style={{
                height: columnMargin,
              }}
              key={`column-${columnIndex}-spacer-${rowIndex}`}
            />
          )
        }
      })

      const isLastColumn = columnIndex === columnCount - 1
      const marginRight = isLastColumn ? 0 : rowMargin

      sections.push(
        <div
          style={{
            flex: 1,
            minWidth: 0,
            marginRight,
          }}
          key={columnIndex}
        >
          {displayComponents}
        </div>
      )
    })

    return sections
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {this.renderItems()}
      </div>
    )
  }
}
