import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import "regenerator-runtime/runtime"

jest.mock("react-tracking")
import _track from "react-tracking"
const track = _track as jest.Mock<typeof _track>
track.mockImplementation(y => x => x)

jest.mock("react-sizeme", () => jest.fn(c => d => d))

/**
 * We want each test to have assertions, otherwise it’s too easy to write async
 * tests that never end up making any, leading to false positives.
 */
beforeEach(() => expect.hasAssertions())

import "DevTools/renderUntil"
Enzyme.configure({ adapter: new Adapter() })

import "jsdom"
if (typeof window !== "undefined") {
  window.open = jest.fn()
  window.matchMedia = undefined
  window.scrollTo = jest.fn()
  HTMLMediaElement.prototype.pause = jest.fn()
  HTMLMediaElement.prototype.play = jest.fn()
}

/**
 * Fail tests that log errors or warnings, because these can point to actual
 * bugs and once there are already a few of these the person writing new code
 * will start ignoring them.
 *
 * If a test is expected to log an error or a warning, mock it so the output
 * doesn’t actually show up.
 */
const logAndThrow = loggerFn => {
  // tslint:disable-next-line:only-arrow-functions
  const imp = function(message) {
    // Dont log warnings from RelayStubProvier
    if (
      typeof message === "string" &&
      message.includes("Warning: RelayModernSelector")
    ) {
      return false
    }

    // Keep default logging behaviour
    loggerFn.apply(console, arguments)
    if (message instanceof Error) {
      throw message
    } else {
      const err = new Error(message)
      // Skip this frame in the stack to point to the actual log call-site
      Error.captureStackTrace(err, imp)
      throw err
    }
  }
  return imp
}
const originalConsoleError = console.error
const originalWarnError = console.warn
console.error = logAndThrow(originalConsoleError)
console.warn = logAndThrow(originalWarnError)
