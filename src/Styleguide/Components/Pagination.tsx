import { Sans } from "@artsy/palette"
import React from "react"
import styled, { css } from "styled-components"
import { themeGet } from "styled-system"
import { Arrow } from "Styleguide/Elements/Arrow"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { ScrollIntoView } from "Styleguide/Utils/ScrollIntoView"
import { Responsive } from "Utils/Responsive"

import { Pagination_pageCursors } from "__generated__/Pagination_pageCursors.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  onClick?: (cursor: string) => void
  onNext?: () => void
  pageCursors: Pagination_pageCursors
  scrollTo?: string
}

export class Pagination extends React.Component<Props> {
  static defaultProps = {
    onClick: _cursor => ({}),
    onNext: () => ({}),
    scrollTo: null,
  }

  render() {
    return (
      <ScrollIntoView selector={this.props.scrollTo}>
        <Responsive>
          {({ xs }) => {
            if (xs) return <SmallPagination {...this.props} />
            return <LargePagination {...this.props} />
          }}
        </Responsive>
      </ScrollIntoView>
    )
  }
}

const renderPage = (pageCursor, onClick: (cursor: string) => void) => {
  const { cursor, isCurrent, page } = pageCursor
  return (
    <Page
      onClick={() => onClick(cursor)}
      num={page}
      active={isCurrent}
      key={cursor}
    />
  )
}

export const LargePagination = (props: Props) => {
  const { previous } = props.pageCursors
  return (
    <Flex flexDirection="row">
      {props.pageCursors.first && (
        <div>
          {renderPage(props.pageCursors.first, props.onClick)}
          <PageSpan mx={0.5} />
        </div>
      )}

      {props.pageCursors.around.map(pageInfo =>
        renderPage(pageInfo, props.onClick)
      )}

      {props.pageCursors.last && (
        <div>
          <PageSpan mx={0.5} />
          {renderPage(props.pageCursors.last, props.onClick)}
        </div>
      )}

      <Box ml={4}>
        <PrevButton
          onClick={() => {
            if (previous) {
              props.onClick(previous.cursor)
            }
          }}
        />
        <NextButton onClick={() => props.onNext()} />
      </Box>
    </Flex>
  )
}

export const SmallPagination = (props: Props) => {
  const { previous } = props.pageCursors
  return (
    <Flex flexDirection="row" width="100%">
      <Flex width="50%" pr={0.5}>
        <ButtonWithBorder
          alignItems="center"
          justifyContent="flex-start"
          pl={1}
          onClick={() => {
            if (previous) {
              props.onClick(previous.cursor)
            }
          }}
        >
          <Arrow direction="left" />
        </ButtonWithBorder>
      </Flex>
      <Flex width="50%" pl={0.5}>
        <ButtonWithBorder
          onClick={() => props.onNext()}
          alignItems="center"
          justifyContent="flex-end"
          pr={1}
        >
          <Arrow direction="right" />
        </ButtonWithBorder>
      </Flex>
    </Flex>
  )
}

const Page = ({ num, onClick, ...props }) => {
  return (
    <Button {...props} onClick={() => onClick()}>
      <Sans size="3" weight="medium" display="inline">
        {num}
      </Sans>
    </Button>
  )
}

const PageSpan = ({ mx }) => {
  return (
    <Sans size="3" display="inline" mx={mx} color="black30">
      ...
    </Sans>
  )
}

const PrevButton = props => {
  return (
    <Sans size="3" weight="medium" display="inline" mx={0.5}>
      <a onClick={() => props.onClick()} className="noUnderline">
        <Arrow direction="left" /> Prev
      </a>
    </Sans>
  )
}

const NextButton = props => {
  return (
    <Sans size="3" weight="medium" display="inline" mx={0.5}>
      <a onClick={() => props.onClick()} className="noUnderline">
        Next <Arrow direction="right" />
      </a>
    </Sans>
  )
}

const activeButton = css`
  background: ${themeGet("colors.black5")};
  border-radius: 2px;
  border: 0;
`

const Button = styled.button.attrs<{ active?: boolean }>({})`
  cursor: pointer;
  width: 23px;
  height: 25px;
  background: transparent;
  border: 0;

  outline: 0;

  ${p => p.active && activeButton};

  &:hover {
    ${activeButton};
  }
`

const ButtonWithBorder = styled(Flex)`
  border: ${props => props.theme.borders[1]};
  border-color: ${themeGet("colors.black10")};
  border-radius: 3px;
  width: 100%;
  height: ${props => props.theme.space[4]}px;
  cursor: pointer;
`

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
      }
    }
  `
)
