import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import * as FullscreenHelpers from "../FullscreenHelpers"
import { VideoPlayer } from "../VideoPlayer"

describe("VideoPlayer", () => {
  beforeEach(() => {
    FullscreenHelpers.addFSEventListener = jest.fn()
    FullscreenHelpers.requestFullscreen = jest.fn()
    FullscreenHelpers.exitFullscreen = jest.fn()
    // event = new Event("fullscreenchange")
    // Object.defineProperty(document, 'fullscreenElement', {
    //   configurable: true,
    //   enumerable: true,
    //   value: true,
    //   writable: true
    // })
    // Object.defineProperty(document, 'fullscreenEnabled', {
    //   configurable: true,
    //   enumerable: true,
    //   value: true,
    //   writable: true
    // })
    // document.exitFullscreen = null
    // document.webkitExitFullscreen = null
    // document.mozCancelFullScreen = null
    // document.msExitFullscreen = null
    document.fullscreenEnabled = true
  })

  it("matches the snapshot", () => {
    const videoPlayer = renderer.create(
      <VideoPlayer
        url="http://files.artsy.net/videos/placeholder.mp4"
        title="The Video Title"
      />
    ).toJSON()
    expect(videoPlayer).toMatchSnapshot()
  })

  it("#setDuration", () => {
    const videoPlayer = mount(
      <VideoPlayer
        url="http://files.artsy.net/videos/placeholder.mp4"
      />
    )
    videoPlayer.instance().setDuration({
      target: {
        duration: 10000
      }
    })
    expect(videoPlayer.state("duration")).toBe(10000)
  })

  it("#updateTime", () => {
    const videoPlayer = mount(
      <VideoPlayer
        url="http://files.artsy.net/videos/placeholder.mp4"
      />
    )
    videoPlayer.instance().updateTime({
      target: {
        currentTime: 20000
      }
    })
    expect(videoPlayer.state("currentTime")).toBe(20000)
  })

  it("#togglePlay - pauses video if its playing", () => {
    const videoPlayer = mount(
      <VideoPlayer
        url="http://files.artsy.net/videos/placeholder.mp4"
      />
    )
    videoPlayer.setState({ isPlaying: true })
    videoPlayer.instance().togglePlay()
    expect(videoPlayer.state("isPlaying")).toBe(false)
  })

  it("#togglePlay - plays video if its paused", () => {
    const videoPlayer = mount(
      <VideoPlayer
        url="http://files.artsy.net/videos/placeholder.mp4"
      />
    )
    videoPlayer.setState({ isPlaying: false })
    videoPlayer.instance().togglePlay()
    expect(videoPlayer.state("isPlaying")).toBe(true)
  })

  it("#toggleMute - mutes video if its unmuted", () => {
    const videoPlayer = mount(
      <VideoPlayer
        url="http://files.artsy.net/videos/placeholder.mp4"
      />
    )
    videoPlayer.setState({ isMuted: false })
    videoPlayer.instance().toggleMute()
    expect(videoPlayer.state("isMuted")).toBe(true)
  })

  it("#toggleMute - mutes video if its unmuted", () => {
    const videoPlayer = mount(
      <VideoPlayer
        url="http://files.artsy.net/videos/placeholder.mp4"
      />
    )
    videoPlayer.setState({ isMuted: true })
    videoPlayer.instance().toggleMute()
    expect(videoPlayer.state("isMuted")).toBe(false)
  })

  it("#toggleFullscreen - enters fullscreen", () => {
    const videoPlayer = mount(
      <VideoPlayer
        url="http://files.artsy.net/videos/placeholder.mp4"
      />
    )
    videoPlayer.instance().toggleFullscreen()
    expect(FullscreenHelpers.requestFullscreen).toBeCalled()
  })

  it("#toggleFullscreen - exits fullscreen", () => {
    const videoPlayer = mount(
      <VideoPlayer
        url="http://files.artsy.net/videos/placeholder.mp4"
      />
    )
    FullscreenHelpers.isFullscreen = () => true
    videoPlayer.instance().toggleFullscreen()
    expect(FullscreenHelpers.exitFullscreen).toBeCalled()
  })

  it("#seekTo", () => {
    const videoPlayer = mount(
      <VideoPlayer
        url="http://files.artsy.net/videos/placeholder.mp4"
      />
    )
    videoPlayer.instance().seekTo(5000)
    expect(videoPlayer.state("currentTime")).toBe(5000)
    expect(videoPlayer.instance().video.currentTime).toBe(5000)
  })

  it("#pause", () => {
    const videoPlayer = mount(
      <VideoPlayer
        url="http://files.artsy.net/videos/placeholder.mp4"
      />
    )
    jest.spyOn(videoPlayer.instance().video, 'pause')
    videoPlayer.instance().pause()
    expect(videoPlayer.state("isPlaying")).toBe(false)
    expect(videoPlayer.instance().video.pause).toBeCalled()
  })

  it("#play", () => {
    const videoPlayer = mount(
      <VideoPlayer
        url="http://files.artsy.net/videos/placeholder.mp4"
      />
    )
    jest.spyOn(videoPlayer.instance().video, 'play')
    videoPlayer.instance().play()
    expect(videoPlayer.state("isPlaying")).toBe(true)
    expect(videoPlayer.instance().video.play).toBeCalled()
  })
})
