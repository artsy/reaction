import { LargePagination, Separator, SmallPagination } from "@artsy/palette"
import React from "react"
import { Media } from "Utils/Responsive"
import { ScrollIntoView } from "Utils/ScrollIntoView"

import { Pagination_pageCursors } from "__generated__/Pagination_pageCursors.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  onClick?: (cursor: string, page: number) => void
  onNext?: () => void
  pageCursors: Pagination_pageCursors
  hasNextPage: boolean
  scrollTo?: string
}

export class Pagination extends React.Component<Props> {
  static defaultProps = {
    onClick: _cursor => ({}),
    onNext: () => ({}),
    scrollTo: null,
  }

  render() {
    if (this.props.pageCursors.around.length === 1) {
      return null
    }

    return (
      <ScrollIntoView selector={this.props.scrollTo}>
        <Media at="xs">
          <SmallPagination {...this.props} />
        </Media>
        <Media greaterThan="xs">
          <div>
            <Separator mb={3} pr={2} />
            <LargePagination {...this.props} />
          </div>
        </Media>
      </ScrollIntoView>
    )
  }
}

export const PaginationFragmentContainer = createFragmentContainer(
  Pagination,
  graphql`
    fragment Pagination_pageCursors on PageCursors {
      around {
        cursor
        page
        isCurrent
      }
      first {
        cursor
        page
        isCurrent
      }
      last {
        cursor
        page
        isCurrent
      }
      previous {
        cursor
        page
      }
    }
  `
)
