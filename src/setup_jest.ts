import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter() })

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
