import * as PropTypes from "prop-types"
import * as React from "react"
import Header from "./header/header"
import FeatureLayout from "./layouts/feature_layout"
import StandardLayout from "./layouts/standard_layout"
import FullscreenViewer from "./sections/fullscreen_viewer/fullscreen_viewer"
import Sections from "./sections/sections"

interface ArticleProps {
  article: any
}
interface ArticleState {
  isViewerOpen: boolean
}

class Article extends React.Component<ArticleProps, ArticleState> {
  static childContextTypes = {
    onViewFullscreen: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { isViewerOpen: false }
    this.openViewer = this.openViewer.bind(this)
    this.closeViewer = this.closeViewer.bind(this)
  }

  getChildContext() {
    return { onViewFullscreen: this.openViewer }
  }

  openViewer() {
    this.setState({ isViewerOpen: true })
  }

  closeViewer() {
    this.setState({ isViewerOpen: false })
  }

  render() {
    const { article } = this.props
    if (article.layout === "feature") {
      return (
        <div>
          <Header article={article} />
          <FeatureLayout>
            <Sections article={article} />
          </FeatureLayout>
          <FullscreenViewer onClose={this.closeViewer} show={this.state.isViewerOpen} sections={article.sections} />
        </div>
      )
    } else {
      return (
        <div>
          <Header article={article} />
          <StandardLayout>
            <Sections article={article} />
          </StandardLayout>
          <FullscreenViewer onClose={this.closeViewer} show={this.state.isViewerOpen} sections={article.sections} />
        </div>
      )
    }
  }
}

export default Article
