import React from "react"

export class StaticCollapse extends React.Component<{ open: boolean }> {
  wrapperModifyTimeout: ReturnType<typeof setTimeout>
  wrapperRef: HTMLDivElement | null = null

  state = {
    firstRender: true,
  }

  onTransitionEnd = (ev: TransitionEvent) => {
    if (!this.wrapperRef) {
      return
    }
    if (ev.propertyName === "height") {
      this.wrapperRef.style.height = this.props.open ? "auto" : "0px"
    }
  }

  componentWillReceiveProps() {
    // this is only called after the first mount if the props change
    if (this.state.firstRender) {
      this.setState({ firstRender: false })
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.open !== this.props.open
  }

  componentDidMount() {
    if (!this.wrapperRef) {
      return
    }

    this.wrapperRef.addEventListener("transitionend", this.onTransitionEnd)
    this.wrapperRef.style.height = this.props.open ? "auto" : "0px"
  }

  componentDidUpdate() {
    if (!this.wrapperRef) {
      return
    }
    if (this.props.open && this.wrapperRef.style.height !== "auto") {
      // open
      const prevHeight = this.wrapperRef.style.height || "0px"
      this.wrapperRef.style.height = "auto"
      const actualHeight = this.wrapperRef.offsetHeight
      this.wrapperRef.style.height = prevHeight
      this.wrapperModifyTimeout = setTimeout(() => {
        this.wrapperRef.style.height = actualHeight + "px"
      }, 10)
    } else if (!this.props.open && this.wrapperRef.style.height !== "0px") {
      // close
      const actualHeight = this.wrapperRef.offsetHeight
      this.wrapperRef.style.height = actualHeight + "px"
      this.wrapperModifyTimeout = setTimeout(() => {
        this.wrapperRef.style.height = 0 + "px"
      }, 10)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.wrapperModifyTimeout)
  }

  render() {
    const { children, open } = this.props
    // render explicit height only on first render, to let us render closed
    // elements on the server
    const heightProps = this.state.firstRender
      ? {
          height: open ? "auto" : "0px",
        }
      : {}
    return (
      <div
        ref={ref => (this.wrapperRef = ref)}
        style={{
          transition: "height 0.3s ease",
          overflow: "hidden",
          ...heightProps,
        }}
      >
        {children}
      </div>
    )
  }
}
