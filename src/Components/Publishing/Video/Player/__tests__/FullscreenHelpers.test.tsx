import {
  addFSEventListener,
  exitFullscreen,
  fullscreenEnabled,
  isFullscreen,
  removeFSEventListener,
  requestFullscreen,
} from "../FullscreenHelpers"

describe("Fullscreen helper methods", () => {
  let event

  beforeEach(() => {
    event = new Event("fullscreenchange")
    ;(document as any).fullscreenEnabled = false
    ;(document as any).fullscreenElement = false
    document.exitFullscreen = null
    document.webkitExitFullscreen = null
    document.mozCancelFullScreen = null
    document.msExitFullscreen = null
  })

  it("#addFSEventListener adds event listeners to handler", () => {
    const onFullscreen = jest.fn()
    addFSEventListener(onFullscreen)
    document.dispatchEvent(event)
    expect(onFullscreen).toHaveBeenCalledTimes(1)
  })

  it("#removeFSEventListener removes event listeners from handler", () => {
    const onFullscreen = jest.fn()
    removeFSEventListener(onFullscreen)
    document.dispatchEvent(event)
    expect(onFullscreen).toHaveBeenCalledTimes(0)
  })

  it("#isFullscreen returns true if the document is in fullscreen", () => {
    expect(isFullscreen()).toBeTruthy()
  })

  it("#isFullscreen returns false if the document is not in fullscreen", () => {
    ;(document as any).fullscreenEnabled = false
    expect(isFullscreen()).toBeFalsy()
  })

  it("#fullscreenEnabled returns true if the document has fullscreen enabled", () => {
    expect(fullscreenEnabled()).toBeTruthy()
  })

  it("#fullscreenEnabled returns false if the document does not have fullscreen enabled", () => {
    ;(document as any).fullscreenEnabled = false
    expect(fullscreenEnabled()).toBeFalsy()
  })

  it("#requestFullscreen opens an element in fullscreen", () => {
    const request = jest.fn()
    requestFullscreen({ requestFullscreen: request })
    expect(request).toHaveBeenCalled()
  })

  it("#requestFullscreen opens an element in fullscreen (webkit)", () => {
    const webkitRequestFullscreen = jest.fn()
    requestFullscreen({ webkitRequestFullscreen })
    expect(webkitRequestFullscreen).toHaveBeenCalled()
  })

  it("#requestFullscreen opens an element in fullscreen (mozilla)", () => {
    const mozRequestFullScreen = jest.fn()
    requestFullscreen({ mozRequestFullScreen })
    expect(mozRequestFullScreen).toHaveBeenCalled()
  })

  it("#requestFullscreen opens an element in fullscreen (ms)", () => {
    const msRequestFullscreen = jest.fn()
    requestFullscreen({ msRequestFullscreen })
    expect(msRequestFullscreen).toHaveBeenCalled()
  })

  it("#exitFullscreen escapes an element in fullscreen", () => {
    const exit = jest.fn()
    Object.defineProperty(document, "exitFullscreen", {
      configurable: true,
      enumerable: true,
      value: exit,
      writable: true,
    })
    exitFullscreen()
    expect(exit).toHaveBeenCalled()
  })

  it("#exitFullscreen escapes an element in fullscreen (webkit)", () => {
    const webkitExitFullscreen = jest.fn()
    Object.defineProperty(document, "webkitExitFullscreen", {
      configurable: true,
      enumerable: true,
      value: webkitExitFullscreen,
      writable: true,
    })
    exitFullscreen()
    expect(webkitExitFullscreen).toHaveBeenCalled()
  })

  it("#exitFullscreen escapes an element in fullscreen (mozilla)", () => {
    const mozCancelFullScreen = jest.fn()
    Object.defineProperty(document, "mozCancelFullScreen", {
      configurable: true,
      enumerable: true,
      value: mozCancelFullScreen,
      writable: true,
    })
    exitFullscreen()
    expect(mozCancelFullScreen).toHaveBeenCalled()
  })

  it("#exitFullscreen escapes an element in fullscreen (ms)", () => {
    const msExitFullscreen = jest.fn()
    Object.defineProperty(document, "msExitFullscreen", {
      configurable: true,
      enumerable: true,
      value: msExitFullscreen,
      writable: true,
    })
    exitFullscreen()
    expect(msExitFullscreen).toHaveBeenCalled()
  })
})
