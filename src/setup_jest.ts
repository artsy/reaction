import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import "regenerator-runtime/runtime"

jest.mock("react-tracking")
import _track from "react-tracking"
const track = _track as jest.Mock<typeof _track>
track.mockImplementation(y => x => x)

Enzyme.configure({ adapter: new Adapter() })

if (typeof window !== "undefined") {
  window.matchMedia =
    window.matchMedia ||
    (() => {
      return {
        media: "",
        matches: false,
        addListener: () => null,
        removeListener: () => null,
      }
    })

  HTMLMediaElement.prototype.pause = jest.fn()
  HTMLMediaElement.prototype.play = jest.fn()

  window.open = jest.fn()
}
