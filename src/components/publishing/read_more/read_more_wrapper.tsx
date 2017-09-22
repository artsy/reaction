import { find } from "lodash"
import React from "react"
import * as ReactDOM from "react-dom"

interface ReadMoreWrapperProps {
  isTruncated: boolean
  hideButton: () => void
}

interface ReadMoreWrapperState {
  truncationHeight: number | string
}

class ReadMoreWrapper extends React.Component<ReadMoreWrapperProps, ReadMoreWrapperState> {
  constructor(props) {
    super(props)
    this.state = {
      truncationHeight: "100%",
    }
  }

  componentDidMount() {
    this.truncateArticle()
    window.addEventListener("resize", this.truncateArticle)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.truncateArticle)
  }

  truncateArticle = () => {
    if (this.props.isTruncated) {
      this.setState({ truncationHeight: this.calculateTruncationHeight() })
    }
  }

  calculateTruncationHeight = () => {
    if (this.props.isTruncated) {
      let height = 0
      let charCount = 0
      const thisNode = ReactDOM.findDOMNode(this)

      // Iterate over text sections
      find(thisNode.getElementsByClassName("article__text-section"), section => {
        let sectionCharCount = 0

        // Iterate over paragraph tags
        const foundTag = find(section.getElementsByTagName("p"), tag => {
          const textContent = tag.textContent
          const textLength = textContent.length

          // Update counts
          sectionCharCount = sectionCharCount + textLength
          charCount = charCount + textLength

          // Check if we've exceeded limits
          if (textContent && sectionCharCount > 150 && charCount > 2000) {
            height = tag.getBoundingClientRect().bottom - thisNode.getBoundingClientRect().top
            return true
          }
          return false
        })
        return foundTag ? true : false
      })

      // Return found height or remove truncation if article is too short
      if (height) {
        return height
      } else {
        this.props.hideButton()
        return "100%"
      }
    } else {
      return "100%"
    }
  }

  getTruncationHeight = () => {
    return this.props.isTruncated ? this.state.truncationHeight : "100%"
  }

  getOverflow = () => {
    return this.props.isTruncated ? "hidden" : "unset"
  }

  render() {
    return (
      <div
        style={{
          height: this.getTruncationHeight(),
          overflow: this.getOverflow(),
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default ReadMoreWrapper
