import React from "react"

export class StaticCollapse extends React.Component<
  { open: boolean },
  {
    open: boolean
    hasChanged: boolean
    firstRender: boolean
    initialState: boolean
  }
> {
  wrapperModifyTimeout: ReturnType<typeof setTimeout>
  wrapperRef: HTMLDivElement | null = null

  onTransitionEnd = (ev: TransitionEvent) => {
    if (!this.wrapperRef) {
      return
    }
    if (ev.propertyName === "height") {
      this.wrapperRef.style.height = this.props.open ? "auto" : "0px"
    }
  }

  state = {
    open: this.props.open,
    hasChanged: false,
    firstRender: true,
    // ititialState is only true up until the first getDerivedStateFromProps is called
    // *before* the first render then firstRender is true during the first render
    // but not afterwards
    initialState: true,
  }

  static getDerivedStateFromProps(props, prevState) {
    return {
      open: props.open,
      hasChanged: !prevState.initialState && prevState.open !== props.open,
      firstRender: prevState.initialState,
      initialState: false,
    }
  }

  componentDidMount() {
    if (!this.wrapperRef) {
      return
    }

    this.wrapperRef.addEventListener("transitionend", this.onTransitionEnd)
  }

  componentDidUpdate() {
    if (!this.wrapperRef) {
      return
    }
    if (!this.state.hasChanged) {
      console.log("the state didn't change")
      if (this.wrapperRef.style.height === "") {
        // second render, no update to state, but the style.height value was
        // unset (See render method) so we need to make sure it's set.
        // For the remainder of this component's life we control it's
        // style.height outside of the render cycle
        this.wrapperRef.style.height = this.props.open ? "auto" : "0px"
      }
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
