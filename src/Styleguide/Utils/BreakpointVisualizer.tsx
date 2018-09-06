import { Display } from "@artsy/palette"
import { Box } from "@artsy/palette"
import { isEqual } from "lodash"
import React from "react"
import Transition from "react-transition-group/Transition"
import styled from "styled-components"
import { Responsive } from "Utils/Responsive"

const StyledBox = styled(Box)`
  position: fixed;
  background-color: black;
  color: white;
  border-bottom-right-radius: 5px;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
`

const BreakpointText = ({ xs, sm, md, lg }) => {
  return (
    <Display size="8">
      {xs ? "xs" : sm ? "sm" : md ? "md" : lg ? "lg" : "xl"}
    </Display>
  )
}

interface BreakpointVisualizerState {
  breakpoints: any
  changed: boolean
}

export class BreakpointVisualizer extends React.Component<
  {},
  BreakpointVisualizerState
> {
  constructor(props) {
    super(props)
    this.state = {
      breakpoints: {},
      changed: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState.breakpoints, this.state.breakpoints)) {
      this.setState({
        changed: true,
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        {typeof window !== "undefined" &&
          window.navigator &&
          !window.navigator.userAgent.match(/Chromatic/) && (
            <Responsive>
              {breakpoints => {
                if (!isEqual(breakpoints, this.state.breakpoints)) {
                  setImmediate(() => {
                    this.setState({ breakpoints })
                  })
                }
                return (
                  <Transition
                    in={this.state.changed}
                    onEntered={() => this.setState({ changed: false })}
                    mountOnEnter
                    unmountOnExit
                    timeout={2500}
                  >
                    {state => {
                      return (
                        <StyledBox
                          top={0}
                          left={0}
                          py={1}
                          px={2}
                          style={{ opacity: state === "exiting" ? 0 : 1 }}
                        >
                          <BreakpointText {...breakpoints} />
                        </StyledBox>
                      )
                    }}
                  </Transition>
                )
              }}
            </Responsive>
          )}
      </React.Fragment>
    )
  }
}
