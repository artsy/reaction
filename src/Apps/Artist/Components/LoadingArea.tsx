import Spinner from "Components/Spinner"
import React from "react"
import { PreloadLinkState } from "Router/state"
import styled from "styled-components"
import { Subscribe } from "unstated"

export const LoadingArea = props => {
  return (
    <Subscribe to={[PreloadLinkState]}>
      {({ state: { isFetching } }: PreloadLinkState) => {
        const loaderClass = isFetching ? "loading" : ""

        return (
          <OuterContainer>
            <SpinnerContainer>
              <SpinnerToggle className={loaderClass} />
            </SpinnerContainer>

            <Container className={loaderClass}>{props.children}</Container>
          </OuterContainer>
        )
      }}
    </Subscribe>
  )
}

const OuterContainer = styled.div`
  position: relative;
`

const SpinnerContainer = styled.div`
  position: absolute;
  top: 100px;
  width: 100%;
  z-index: 1;
`

const Container = styled.div`
  opacity: 1;
  position: relative;

  transition: opacity 0.25s;

  &.loading {
    opacity: 0.1;
  }
`

const SpinnerToggle = styled(Spinner)`
  position: absolute;

  opacity: 0;
  transition: opacity 0.2s;

  &.loading {
    opacity: 1;
  }
`
