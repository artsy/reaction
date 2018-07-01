import Spinner from "Components/Spinner"
import React, { SFC } from "react"
import styled from "styled-components"

interface Props {
  children: any
  isLoading?: boolean
}

const TRANSITION_TIME = "0.0s"

export const LoadingArea: SFC<Props> = props => {
  const loaderClass = props.isLoading ? "loading" : ""

  return (
    <OuterContainer>
      <SpinnerContainer>
        <SpinnerToggle className={loaderClass} />
      </SpinnerContainer>

      <Container className={loaderClass}>{props.children}</Container>
    </OuterContainer>
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

  transition: opacity ${TRANSITION_TIME};

  &.loading {
    opacity: 0.1;
  }
`

const SpinnerToggle = styled(Spinner)`
  position: absolute;

  opacity: 0;
  transition: opacity ${TRANSITION_TIME};

  &.loading {
    opacity: 1;
  }
`
