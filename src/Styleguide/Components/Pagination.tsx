import React from "react"
import styled, { css } from "styled-components"
import { themeGet } from "styled-system"
import { Sans } from "@artsy/palette"
import { Responsive } from "Styleguide/Utils/Responsive"
import { Arrow } from "Styleguide/Elements/Arrow"
import { Flex } from "Styleguide/Elements/Flex"

interface PageCursor {
  page: number
  cursor: string
  isCurrent: boolean
}

interface PaginationProps {
  first: PageCursor
  last: PageCursor
  around: ReadOnlyArray<PageCursor>
  onClick?: (cursor: string) => void
  onNext?: () => void
  onPrev?: () => void
}

export class Pagination extends React.Component<PaginationProps> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          // if (xs) return <SmallPagination />
          return <LargePagination {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargePagination = (props: PaginationProps) => {
  return (
    <Flex flexDirection="row">
      {props.first ? (
        <div>
          <Page
            onClick={() => props.onClick(props.first.cursor)}
            num={props.first.page}
            active={props.first.isCurrent}
          />
          <PageSpan mx={0.5} />
        </div>
      ) : null}

      {props.around.map(pageInfo => (
        <Page
          onClick={() => props.onClick(pageInfo.cursor)}
          num={pageInfo.page}
          active={pageInfo.isCurrent}
        />
      ))}

      {props.last ? (
        <div>
          <PageSpan mx={0.5} />
          <Page
            onClick={() => props.onClick(props.last.cursor)}
            num={props.last.page}
            active={props.last.isCurrent}
          />
        </div>
      ) : null}

      <PrevButton onClick={() => props.onPrev()} />
      <NextButton onClick={() => props.onNext()} />
    </Flex>
  )
}

export const SmallPagination = () => {
  return (
    <Flex flexDirection="row" width="100%">
      <Flex width="50%" pr={0.5}>
        <ButtonWithBorder
          alignItems="center"
          justifyContent="flex-start"
          pl={1}
        >
          <Arrow direction="left" />
        </ButtonWithBorder>
      </Flex>
      <Flex width="50%" pl={0.5}>
        <ButtonWithBorder alignItems="center" justifyContent="flex-end" pr={1}>
          <Arrow direction="right" />
        </ButtonWithBorder>
      </Flex>
    </Flex>
  )
}

const Page = ({ num, ...props }) => {
  return (
    <Button {...props}>
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
`
