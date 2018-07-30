import { color, Sans, space } from "@artsy/palette"
import React from "react"
import styled, { css } from "styled-components"
import { Arrow } from "Styleguide/Elements/Arrow"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Separator } from "Styleguide/Elements/Separator"
import { ScrollIntoView } from "Styleguide/Utils/ScrollIntoView"
import { Responsive } from "Utils/Responsive"

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

const renderPage = (
  pageCursor,
  onClick: (cursor: string, page: number) => void
) => {
  const { cursor, isCurrent, page } = pageCursor
  return (
    <Page
      onClick={() => onClick(cursor, page)}
      num={page}
      active={isCurrent}
      key={cursor + page}
    />
  )
}

export const LargePagination = (props: Props) => {
  const {
    pageCursors: { around, first, last, previous },
    onClick,
    onNext,
    hasNextPage,
  } = props

  return (
    <React.Fragment>
      <Separator mb={3} pr={2} />
      <Flex flexDirection="row" justifyContent="flex-end" mr={-1}>
        {first && (
          <div>
            {renderPage(first, onClick)}
            <PageSpan mx={0.5} />
          </div>
        )}

        {around.map(pageInfo => renderPage(pageInfo, onClick))}

        {last && (
          <div>
            <PageSpan mx={0.5} />
            {renderPage(last, onClick)}
          </div>
        )}

        <Box ml={4}>
          <PrevButton
            disabled={!previous}
            onClick={() => {
              if (previous) {
                props.onClick(previous.cursor, previous.page)
              }
            }}
          />
          <NextButton disabled={!hasNextPage} onClick={() => onNext()} />
        </Box>
      </Flex>
    </React.Fragment>
  )
}

export const SmallPagination = (props: Props) => {
  const {
    pageCursors: { previous },
    onClick,
    onNext,
    hasNextPage,
  } = props

  return (
    <Flex flexDirection="row" width="100%">
      <PrevNextFlex
        className={!previous ? "disabled" : null}
        width="50%"
        pr={0.5}
      >
        <ButtonWithBorder
          alignItems="center"
          justifyContent="flex-start"
          pl={1}
          onClick={() => {
            if (previous) {
              onClick(previous.cursor, previous.page)
            }
          }}
        >
          <Arrow direction="left" />
        </ButtonWithBorder>
      </PrevNextFlex>
      <PrevNextFlex
        className={!hasNextPage ? "disabled" : null}
        width="50%"
        pl={0.5}
      >
        <ButtonWithBorder
          onClick={() => onNext()}
          alignItems="center"
          justifyContent="flex-end"
          pr={1}
        >
          <Arrow direction="right" />
        </ButtonWithBorder>
      </PrevNextFlex>
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

const PrevNextContainer = styled.span`
  &.disabled {
    opacity: 0.1;
  }
`

const PrevNextFlex = styled(Flex)`
  &.disabled {
    opacity: 0.1;
  }
`

const PrevButton = ({ onClick, disabled }) => {
  return (
    <PrevNextContainer className={disabled ? "disabled" : null}>
      <Sans size="3" weight="medium" display="inline" mx={0.5}>
        <a onClick={() => onClick()} className="noUnderline">
          <Arrow direction="left" /> Prev
        </a>
      </Sans>
    </PrevNextContainer>
  )
}

const NextButton = ({ onClick, disabled }) => {
  return (
    <PrevNextContainer className={disabled ? "disabled" : null}>
      <Sans size="3" weight="medium" display="inline" mx={0.5}>
        <a onClick={() => onClick()} className="noUnderline">
          Next <Arrow direction="right" />
        </a>
      </Sans>
    </PrevNextContainer>
  )
}

const activeButton = css`
  background: ${color("black5")};
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
  border-color: ${color("black10")};
  border-radius: 3px;
  width: 100%;
  height: ${space(4)}px;
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
        page
      }
    }
  `
)
