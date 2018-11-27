import React from "react"

export class WebCollapse extends React.Component<{ open: boolean }> {
  wrapperRef: HTMLDivElement | null = null
  onTransitionEnd = () => {
    if (!this.wrapperRef) {
      return
    }
    this.wrapperRef.style.height = this.props.open ? "auto" : "0px"
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
    if (this.props.open && this.wrapperRef.style.height === "0px") {
      // open
      this.wrapperRef.style.height = "auto"
      const actualHeight = this.wrapperRef.offsetHeight
      this.wrapperRef.style.height = "0px"
      setTimeout(() => {
        this.wrapperRef.style.height = actualHeight + "px"
      }, 10)
    } else if (!this.props.open && this.wrapperRef.style.height !== "0px") {
      // close
      const actualHeight = this.wrapperRef.offsetHeight
      this.wrapperRef.style.height = actualHeight + "px"
      setTimeout(() => {
        this.wrapperRef.style.height = 0 + "px"
      }, 10)
    }
  }

  render() {
    const { children } = this.props
    return (
      <div
        ref={ref => (this.wrapperRef = ref)}
        style={{ transition: "height 0.3s ease", overflow: "hidden" }}
      >
        {children}
      </div>
    )
  }
}
