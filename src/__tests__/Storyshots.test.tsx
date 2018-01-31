import initStoryshots from "@storybook/addon-storyshots"
import { mount } from "enzyme"
import * as React from "react"

class ErrorBoundary extends React.Component<{ onError: (error) => void }> {
  state = {
    errorOccurred: false,
  }

  componentDidCatch(error, info) {
    this.setState({ errorOccurred: true }, () => {
      this.props.onError(error)
    })
  }

  render() {
    if (this.state.errorOccurred) {
      return null
    }
    return this.props.children
  }
}

initStoryshots({
  storyNameRegex: /Gene Follow/,
  /**
   * TODO:
   *
   * - API:
   *   - Let story specify a sentinel selector to look for to exist.
   *   - Let story specify a sentinel selector to look for to NOT exist.
   *   - Maybe make it
   *
   * - Need to call tree.unmount() after run, but consider case where test times
   *   out as well, so this should really run in `afterEach`. However, the
   *   current option to specify before/after filters through storyshots is that
   *   they are global, so no good way to scope e.g. `tree` to specific tests.
   *
   * - I saw some ‘snapshot filename’ support in storyshot, so we should respect
   *   that and call `toMatchSnapshot` with the explicit filename.
   */
  test: ({ story, context }) => {
    return new Promise((resolve, reject) => {
      /**
       * In case of an uncaught error, be sure to reject the promise ASAP and
       * with a helpful error.
       */
      const tree = mount(
        <ErrorBoundary onError={reject}>{story.render()}</ErrorBoundary>
      )
      /**
       * Continuously lets JS/React continue doing its async work and then check
       * if the sentinel selector matches any elements, in which case the tree
       * is ready to be recorded.
       */
      const wait = () => {
        if (tree.find("SuggestedGenesContent").length > 0) {
          /**
           * Rather than creating the snapshot here, we do it in a subsequent
           * `then` so that any errors automatically lead to a rejection of the
           * promise.
           */
          resolve(tree)
        } else {
          setImmediate(() => {
            /**
             * Except for after the initial render, we need to make sure the
             * tree gets re-rendered to reflect any changes caused by props or
             * state changes.
             */
            tree.update()
            wait()
          })
        }
      }
      /**
       * Start recursive waiting process.
       */
      wait()
    }).then(tree => {
      /**
       * Finally make the actual snapshot.
       */
      expect(tree).toMatchSnapshot()
    })
  },
})
